import { Button } from "@/components/ui/button";

const RecordVoiceAssetSelectButton = ({
  index,
  handleClick,
}: {
  index: number;
  handleClick: () => void;
}) => {
  return (
    <Button
      variant={"ghost"}
      className="w-8"
      style={{
        color: index > -1 ? "#52a2aa" : "gray",
      }}
      onClick={handleClick}
    >
      {index > -1 ? index + 1 : "-"}
    </Button>
  );
};

export default RecordVoiceAssetSelectButton;
