import { RootState } from "@/main";
import { useTheme } from "@mui/material";
import { useSelector } from "react-redux";

const BPMCulcLabel = () => {
  const theme = useTheme();
  const { selectedId } = useSelector(
    (state: RootState) => state.speedWorkoutParams,
  );
  const speedWorkout = useSelector(
    (state: RootState) => state.speedWorkouts.entities[selectedId],
  );

  if (!speedWorkout) return <></>;

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          ...(theme.typography as any).mRounded300,
          fontSize: 24,
        }}
      >
        <span>{speedWorkout.label}</span>
        <span style={{ fontSize: 16, paddingLeft: 8 }}>
          {" "}
          {`(${speedWorkout.beatCount} beats)`}
        </span>
      </div>
    </div>
  );
};

export default BPMCulcLabel;
