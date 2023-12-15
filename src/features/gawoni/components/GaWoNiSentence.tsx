import { Button } from "@/components/ui/button";

import SentencePitchLine from "@/views/components/SentencePitchLine";
import { RefreshCw, X } from "lucide-react";
import { GaWoNiProps } from "../schema";
import { updateGaWoNiProps } from "../services/firebase";
import { buildSentence } from "../services/utils";

const GaWoNiSentence = ({ props }: { props: GaWoNiProps }) => {
  const _buildSentence = () => {
    const cloned = { ...props };
    cloned.sentence = buildSentence(props);
    updateGaWoNiProps(cloned);
  };
  const clearSentence = () => {
    const cloned = { ...props };
    cloned.sentence = "";
    updateGaWoNiProps(cloned);
  };
  return (
    <div className="flex items-center gap-1">
      <div className="basis-[320px]">
        <SentencePitchLine pitchStr={props.sentence} />
      </div>
      <Button size="icon" variant={"ghost"} onClick={_buildSentence}>
        <RefreshCw color="gray" />
      </Button>
      <Button size="icon" variant={"ghost"} onClick={clearSentence}>
        <X color="red" />
      </Button>
    </div>
  );
};

export default GaWoNiSentence;
