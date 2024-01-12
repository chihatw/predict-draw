import { Button } from "@/components/ui/button";

import {
  GAWONI_COLLECTION,
  GAWONI_DOC_ID,
  INITIAL_GAWONI_PROPS,
  buildGawoniProps,
} from "@/features/gawoni";
import { db } from "@/infrastructure/firebase";
import { doc, onSnapshot } from "@firebase/firestore";
import { useEffect, useState } from "react";
import GaWoNiIsRaw from "./GaWoNiIsRaw";
import GaWoNiOrder from "./GaWoNiOrder";
import GaWoNiPools from "./GaWoNiPools";
import GaWoNiSentence from "./GaWoNiSentence";

const LOCAL_STATE = "ga_wo_ni";

const GaWoNiMngPane = () => {
  const [open, setOpen] = useState(false);
  const [props, setProps] = useState(INITIAL_GAWONI_PROPS);

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, GAWONI_COLLECTION, GAWONI_DOC_ID),
      (snapshot) => {
        console.log(`%cfetched ${GAWONI_COLLECTION}`, "color:red");
        const props = buildGawoniProps(snapshot);
        setProps(props);
      },
    );

    return () => {
      unsub();
    };
  }, []);

  const handleClickTitle = () => {
    const updatedOpen = !open;
    setOpen(updatedOpen);
    localStorage.setItem(LOCAL_STATE, String(updatedOpen));
  };

  return (
    <div>
      <Button
        variant="ghost"
        className="w-full justify-start"
        onClick={handleClickTitle}
      >
        <h3>がをに</h3>
      </Button>
      {open && (
        <div className="mb-10 grid gap-4 px-8">
          {/* isRaw */}
          <GaWoNiIsRaw isRaw={props.isRaw} />

          {/* 文 */}
          <GaWoNiSentence props={props} />

          {/* 助詞並び */}
          <GaWoNiOrder isRandomOrder={props.isRandomOrder} />

          {/* プール */}
          <GaWoNiPools props={props} />
        </div>
      )}
    </div>
  );
};

export default GaWoNiMngPane;
