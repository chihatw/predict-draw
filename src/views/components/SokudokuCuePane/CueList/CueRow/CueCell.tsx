import { CUE_TYPES } from "@/application/speedWorkouts/core/1-constants";
import { RootState } from "@/main";
import SentencePitchLine from "@/views/components/SentencePitchLine";

import { useSelector } from "react-redux";

const CueCell = ({
  isActive,
  itemTempId,
}: {
  isActive: boolean;
  itemTempId: string;
}) => {
  const { selectedId } = useSelector(
    (state: RootState) => state.speedWorkoutParams,
  );
  const speedWorkout = useSelector(
    (state: RootState) => state.speedWorkouts.entities[selectedId],
  );

  const speedWorkoutItem = useSelector(
    (state: RootState) => state.speedWorkoutItems.entities[itemTempId],
  );

  if (!speedWorkout || !speedWorkoutItem) return <></>;

  if (speedWorkout.cueType === CUE_TYPES.STRING) {
    return (
      <div
        className="mr-4 flex-1 rounded p-1 text-[16px] text-[#52a2aa]"
        style={{
          background: isActive ? "lightyellow" : "transparent",
        }}
      >
        {speedWorkoutItem.chinese}
      </div>
    );
  }

  if (speedWorkout.cueType === CUE_TYPES.PITCH) {
    return (
      <div
        className="flex flex-1 items-center justify-center"
        style={{ background: isActive ? "lightyellow" : "transparent" }}
      >
        <SentencePitchLine pitchStr={speedWorkoutItem.pitchStr} />
      </div>
    );
  }

  return <></>;
};

export default CueCell;
