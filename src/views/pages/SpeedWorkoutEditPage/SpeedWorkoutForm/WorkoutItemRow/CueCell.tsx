import { ISpeedWorkoutItem } from "@/application/speedWorkoutItems/core/0-interface";
import { CUE_TYPES } from "@/application/speedWorkouts/core/1-constants";
import SentencePitchLine from "@/views/components/SentencePitchLine";

const CueCell = ({
  workoutItem,
  cueType,
}: {
  cueType: string;
  workoutItem: ISpeedWorkoutItem;
}) => {
  switch (cueType) {
    case CUE_TYPES.STRING:
      return (
        <div className="flex items-center justify-center text-xs text-[#52a2aa]">
          {workoutItem.chinese}
        </div>
      );
    case CUE_TYPES.PITCH:
      return (
        <div className="flex items-center justify-center overflow-x-scroll">
          <SentencePitchLine pitchStr={workoutItem.cuePitchStr} />
        </div>
      );
    default:
      return <div></div>;
  }
};

export default CueCell;
