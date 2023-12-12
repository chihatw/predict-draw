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
    <div className="grid grid-cols-[20px_2fr_4fr]">
      <div className="flex items-center text-sm">{index + 1}</div>
      <CueCell workoutItem={workoutItem} cueType={cueType} />
      <div className="grid gap-1">
        <div>{workoutItem.text}</div>
        <div className="text-xs text-gray-500">{workoutItem.chinese}</div>
        <SentencePitchLine pitchStr={workoutItem.pitchStr} />
      </div>
    </div>
  );
}

export default WorkoutItemRow;
