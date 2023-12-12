import { speedWorkoutParamsActions } from "@/application/speedWorkoutParams/framework/0-reducer";
import { Button } from "@/components/ui/button";
import { RootState } from "@/main";
import { PlayCircle, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import WorkoutLabel from "../WorkoutLabel";
import WorkoutStatus from "../WorkoutStatus";

const SokudokuRenshuPane = () => {
  const dispatch = useDispatch();

  const { selectedId, isRunning, checkedIndexes } = useSelector(
    (state: RootState) => state.speedWorkoutParams,
  );
  const speedWorkout = useSelector(
    (state: RootState) => state.speedWorkouts.entities[selectedId],
  );

  const handleStart = () => {
    dispatch(speedWorkoutParamsActions.startWorkout());
  };
  const handleReset = () => {
    dispatch(speedWorkoutParamsActions.reset());
  };

  if (!speedWorkout) return <></>;
  return (
    <div className="mx-auto mt-6 max-w-xl">
      <div className="grid gap-8 space-y-20">
        <div>
          <WorkoutLabel
            label={speedWorkout.label}
            beatCount={speedWorkout.beatCount}
          />

          <div className="flex justify-center">
            <WorkoutStatus />
          </div>
        </div>
        <div className="flex justify-center">
          {!isRunning && !checkedIndexes.length ? (
            <Button
              size="icon"
              variant="ghost"
              onClick={handleStart}
              className="h-[120px] w-[120px]"
            >
              <PlayCircle size={120} color="#52a2aa" />
            </Button>
          ) : (
            <Button
              size="icon"
              variant="ghost"
              className="h-[120px] w-[120px]"
              onClick={handleReset}
            >
              <X size={120} color="#52a2aa" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SokudokuRenshuPane;
