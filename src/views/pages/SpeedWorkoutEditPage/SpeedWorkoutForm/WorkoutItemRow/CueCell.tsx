import { ISpeedWorkoutItem } from 'application/speedWorkoutItems/core/0-interface';
import { CUE_TYPES } from 'application/speedWorkouts/core/1-constants';
import SentencePitchLine from 'views/components/SentencePitchLine';

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
        <div
          style={{
            fontSize: 12,
            display: 'flex',
            alignItems: 'center',
            color: '#52a2aa',
            justifyContent: 'center',
          }}
        >
          {workoutItem.chinese}
        </div>
      );
    case CUE_TYPES.PITCH:
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflowX: 'scroll',
          }}
        >
          <SentencePitchLine pitchStr={workoutItem.cuePitchStr} />
        </div>
      );
    default:
      return <div></div>;
  }
};

export default CueCell;
