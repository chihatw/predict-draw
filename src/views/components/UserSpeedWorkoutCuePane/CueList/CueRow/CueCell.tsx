import { CUE_TYPES } from 'application/speedWorkouts/core/1-constants';
import { RootState } from 'main';
import { useSelector } from 'react-redux';
import SentencePitchLine from 'views/components/SentencePitchLine';

const CueCell = ({
  isActive,
  itemTempId,
}: {
  isActive: boolean;
  itemTempId: string;
}) => {
  const { selectedId } = useSelector(
    (state: RootState) => state.speedWorkoutParams
  );
  const speedWorkout = useSelector(
    (state: RootState) => state.speedWorkouts.entities[selectedId]
  );

  const speedWorkoutItem = useSelector(
    (state: RootState) => state.speedWorkoutItems.entities[itemTempId]
  );

  if (!speedWorkout || !speedWorkoutItem) return <></>;

  if (speedWorkout.cueType === CUE_TYPES.STRING) {
    return (
      <div
        style={{
          flexGrow: 1,
          fontSize: 16,
          color: '#52a2aa',
          background: isActive ? 'lightyellow' : 'transparent',
          padding: 4,
          borderRadius: 4,
          marginRight: 16,
        }}
      >
        {speedWorkoutItem.chinese}
      </div>
    );
  }

  if (speedWorkout.cueType === CUE_TYPES.PITCH) {
    return (
      <div
        style={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: isActive ? 'lightyellow' : 'transparent',
        }}
      >
        <SentencePitchLine pitchStr={speedWorkoutItem.pitchStr} />
      </div>
    );
  }

  return <></>;
};

export default CueCell;
