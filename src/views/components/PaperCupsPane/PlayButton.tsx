import { Button } from "@/components/ui/button";
import { RootState } from "@/main";
import { PlayCircle, RefreshCcw } from "lucide-react";
import { useSelector } from "react-redux";

const PlayButton = ({ handleClick }: { handleClick: () => void }) => {
  const { isRunning, points } = useSelector(
    (state: RootState) => state.cueWorkoutParams,
  );

  return (
    <div className="flex justify-center">
      <Button
        size="icon"
        variant="ghost"
        onClick={handleClick}
        className="h-24 w-24"
      >
        {isRunning ? (
          <RefreshCcw size={96} color="#52a2aa" />
        ) : points ? (
          <></>
        ) : (
          <PlayCircle size={96} color="#52a2aa" />
        )}
      </Button>
    </div>
  );
};

export default PlayButton;
