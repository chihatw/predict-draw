import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const RecordVoiceAssetSelectTarget = ({
  isTarget,
  selectTarget,
}: {
  isTarget: boolean;
  selectTarget: () => void;
}) => {
  return (
    <Button
      size="icon"
      variant={"ghost"}
      style={{ color: isTarget ? "#52a2aa" : "grey" }}
      onClick={selectTarget}
    >
      <Check />
    </Button>
  );
};

export default RecordVoiceAssetSelectTarget;
