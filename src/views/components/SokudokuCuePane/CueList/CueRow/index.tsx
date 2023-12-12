import { Button } from "@/components/ui/button";
import { RootState } from "@/main";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useSelector } from "react-redux";
import CueCell from "./CueCell";

const CueRow = ({
  index,
  isActive,
  handleClick,
  itemTempId,
}: {
  index: number;
  isActive: boolean;
  handleClick: () => void;
  itemTempId: string;
}) => {
  const { selectedId, checkedIndexes } = useSelector(
    (state: RootState) => state.speedWorkoutParams,
  );
  const speedWorkout = useSelector(
    (state: RootState) => state.speedWorkouts.entities[selectedId],
  );

  const isChecked = checkedIndexes.includes(index);

  if (!speedWorkout) return <></>;

  return (
    <div
      className={cn(isChecked && !isActive ? "bg-black/10" : "", "rounded-lg")}
    >
      <Button
        variant="ghost"
        className="w-full px-4 text-left text-gray-700"
        disabled={isChecked}
        onClick={handleClick}
      >
        <div className="grid flex-1 items-center gap-1">
          <div style={{ display: "flex", alignItems: "center" }}>
            <CueCell itemTempId={itemTempId} isActive={isActive} />
            <Check color={isChecked ? "#52a2aa" : "#eee"} />
          </div>
        </div>
      </Button>
    </div>
  );
};

export default CueRow;
