import { RootState } from "@/main";
import { useSelector } from "react-redux";

const BPMCulcLabel = () => {
  const { selectedId } = useSelector(
    (state: RootState) => state.speedWorkoutParams,
  );
  const speedWorkout = useSelector(
    (state: RootState) => state.speedWorkouts.entities[selectedId],
  );

  if (!speedWorkout) return <></>;

  return (
    <div className="flex justify-center">
      <div className="font-mPlusRounded space-x-2 text-2xl font-light text-gray-700">
        <span>{speedWorkout.label}</span>
        <span className="pl-2 text-lg">
          {`(${speedWorkout.beatCount} beats)`}
        </span>
      </div>
    </div>
  );
};

export default BPMCulcLabel;
