import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

const NextButton = ({ handleClickNext }: { handleClickNext: () => void }) => {
  return (
    <div className="flex justify-center">
      <Button
        size="icon"
        variant="ghost"
        className="h-[96px] w-[96px] "
        onClick={handleClickNext}
      >
        <RefreshCcw color="#52a2aa" size={96} />
      </Button>
    </div>
  );
};

export default NextButton;
