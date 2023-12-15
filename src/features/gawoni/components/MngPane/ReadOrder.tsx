import { Button } from "@/components/ui/button";
import _, { shuffle } from "lodash";
import { RefreshCw, X } from "lucide-react";
import { GAWONI_ORDER } from "../../constants";
import { GaWoNiProps } from "../../schema";
import { updateGaWoNiProps } from "../../services/firebase";

const ReadOrder = ({ props }: { props: GaWoNiProps }) => {
  const buildReadOrder = () => {
    const cloned = { ...props };
    if (!props.isRandomReadOrder) {
      cloned.readOrder = GAWONI_ORDER;
    } else {
      let temp = shuffle(GAWONI_ORDER);
      while (_.isEqual(temp, props.readOrder)) {
        temp = shuffle(GAWONI_ORDER);
      }
      cloned.readOrder = temp;
    }
    updateGaWoNiProps(cloned);
  };
  const clearReadOrder = () => {
    const cloned = { ...props };
    cloned.readOrder = [];
    updateGaWoNiProps(cloned);
  };
  return (
    <div className="flex items-center gap-1">
      <div className="flex basis-[320px] items-center gap-2">
        {props.readOrder.map((item) => (
          <div
            key={item}
            className="basis-10 rounded-lg border p-2 text-center"
          >
            {item}
          </div>
        ))}
      </div>
      <Button size="icon" variant={"ghost"} onClick={buildReadOrder}>
        <RefreshCw color="gray" />
      </Button>
      <Button size="icon" variant={"ghost"} onClick={clearReadOrder}>
        <X color="red" />
      </Button>
    </div>
  );
};

export default ReadOrder;
