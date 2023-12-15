import { Button } from "@/components/ui/button";
import { db } from "@/infrastructure/firebase";
import { doc, onSnapshot } from "@firebase/firestore";
import _, { shuffle } from "lodash";
import { RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import {
  GAWONI_COLLECTION,
  GAWONI_DOC_ID,
  GAWONI_ORDER,
  INITIAL_GAWONI_PROPS,
} from "../../constants";
import { buildGawoniProps, updateGaWoNiProps } from "../../services/firebase";

const GaWoNiOrderPane = () => {
  const [value, setValue] = useState(INITIAL_GAWONI_PROPS);
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, GAWONI_COLLECTION, GAWONI_DOC_ID),
      (snapshot) => {
        const props = buildGawoniProps(snapshot);
        setValue(props);
      },
    );
    return () => unsub();
  }, []);

  const handleClick = () => {
    const cloned = { ...value };
    if (!cloned.isRandomReadOrder) {
      cloned.readOrder = GAWONI_ORDER;
    } else {
      let temp = shuffle(GAWONI_ORDER);
      while (_.isEqual(temp, cloned.readOrder)) {
        temp = shuffle(GAWONI_ORDER);
      }
      cloned.readOrder = temp;
    }
    updateGaWoNiProps(cloned);
  };

  return (
    <div className="mx-auto max-w-sm space-y-20 pt-20">
      <div className="grid h-80 gap-4 ">
        {value.readOrder.filter(Boolean).map((item, index) => (
          <div
            key={index}
            className="flex h-24 items-center justify-center rounded-lg border-2 border-[#52a2aa] text-4xl font-extrabold text-gray-500"
          >
            {item}
          </div>
        ))}
      </div>
      {value.isRandomReadOrder ? (
        <div className="flex items-center justify-center">
          <Button
            size="icon"
            variant={"ghost"}
            className="h-32 w-32"
            onClick={handleClick}
            disabled={!value.isRandomReadOrder}
          >
            <RefreshCw size={80} color="#52a2aa" />
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default GaWoNiOrderPane;
