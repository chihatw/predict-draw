import { RootState } from "@/main";
import { useSelector } from "react-redux";
import WorkoutLabel from "../WorkoutLabel";
import WorkoutStatus from "../WorkoutStatus";
import CueList from "./CueList";
import ReadySign from "./ReadySign";

const SokudokuCuePane = () => {
  const { selectedId, isRunning, checkedIndexes } = useSelector(
    (state: RootState) => state.speedWorkoutParams,
  );
  const speedWorkout = useSelector(
    (state: RootState) => state.speedWorkouts.entities[selectedId],
  );

  if (!speedWorkout) return <></>;
  return (
    <div className="mx-auto max-w-lg pb-20 pt-6">
      <div className="grid gap-8">
        <WorkoutLabel
          label={speedWorkout.label}
          beatCount={speedWorkout.beatCount}
        />
        <div className="flex justify-center">
          <WorkoutStatus />
        </div>
        <CueList />
        {!isRunning && !checkedIndexes.length && <ReadySign />}
      </div>
    </div>
  );
};

export default SokudokuCuePane;
