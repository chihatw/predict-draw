import { RootState } from "@/main";
import SentencePitchLine from "@/views/components/SentencePitchLine";
import { useSelector } from "react-redux";
import CueCell from "./CueCell";

function WorkoutItemRow({ index }: { index: number }) {
  const { cueType } = useSelector(
    (state: RootState) => state.speedWorkoutEditPage,
  );
  const workoutItem = useSelector(
    (state: RootState) => state.speedWorkoutEditPage.workoutItems[index],
  );

  if (!workoutItem) return <></>;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "20px 1fr 4fr" }}>
      <div style={{ display: "flex", alignItems: "center", fontSize: 12 }}>
        {index + 1}
      </div>
      <CueCell workoutItem={workoutItem} cueType={cueType} />
      <div style={{ display: "grid", rowGap: 4 }}>
        <div style={{ fontSize: 14 }}>{workoutItem.text}</div>
        <div style={{ fontSize: 12, color: "#555" }}>{workoutItem.chinese}</div>
        <SentencePitchLine pitchStr={workoutItem.pitchStr} />
      </div>
    </div>
  );
}

export default WorkoutItemRow;
