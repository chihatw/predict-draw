import { RootState } from "@/main";
import { useTheme } from "@mui/system";
import { useSelector } from "react-redux";

const WorkoutStatus = () => {
  const theme = useTheme();

  const { selectedId, checkedIndexes, totalRounds, currentRound } = useSelector(
    (state: RootState) => state.speedWorkoutParams,
  );
  const speedWorkout = useSelector(
    (state: RootState) => state.speedWorkouts.entities[selectedId],
  );

  if (!speedWorkout) return <></>;

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div>
        <span
          style={{
            ...(theme.typography as any).lato900,
            fontSize: 90,
          }}
        >
          {checkedIndexes.length +
            speedWorkout.itemTempIds.length * (currentRound - 1)}
        </span>
        <span
          style={{
            ...(theme.typography as any).lato900,
            fontSize: 48,
          }}
        >{`/${speedWorkout.itemTempIds.length * totalRounds}`}</span>
      </div>
    </div>
  );
};

export default WorkoutStatus;
