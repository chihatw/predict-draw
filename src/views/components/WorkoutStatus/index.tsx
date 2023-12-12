import { RootState } from "@/main";
import { useSelector } from "react-redux";

const WorkoutStatus = () => {
  const { selectedId, checkedIndexes, totalRounds, currentRound } = useSelector(
    (state: RootState) => state.speedWorkoutParams,
  );
  const speedWorkout = useSelector(
    (state: RootState) => state.speedWorkouts.entities[selectedId],
  );

  if (!speedWorkout) return <></>;

  return (
    <div className="flex items-center">
      <div>
        <span className="font-lato text-[90px] font-[900] text-gray-700">
          {checkedIndexes.length +
            speedWorkout.itemTempIds.length * (currentRound - 1)}
        </span>
        <span className="font-lato text-[48px] font-[900] text-gray-700">{`/${
          speedWorkout.itemTempIds.length * totalRounds
        }`}</span>
      </div>
    </div>
  );
};

export default WorkoutStatus;
