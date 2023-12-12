import { Button } from "@/components/ui/button";
import { RootState } from "@/main";
import { PlayCircleIcon, StopCircle } from "lucide-react";

import { useSelector } from "react-redux";

const TimerButton = ({ handleClick }: { handleClick: () => void }) => {
  const { isRunning } = useSelector(
    (state: RootState) => state.speedWorkoutParams,
  );
  return (
    <div className="flex justify-center">
      <Button
        size="icon"
        variant="ghost"
        onClick={handleClick}
        className="h-[120px] w-[120px] "
      >
        {isRunning ? (
          <StopCircle size={120} color="#52a2aa" />
        ) : (
          <PlayCircleIcon size={120} color="#52a2aa" />
        )}
      </Button>
    </div>
  );
};

export default TimerButton;
