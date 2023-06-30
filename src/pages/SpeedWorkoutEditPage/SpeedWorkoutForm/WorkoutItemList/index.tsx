import SentencePitchLine from 'views/components/SentencePitchLine';
import { SpeedWorkoutItem } from '../../../../Model';
import CueCell from './CueCell';

const WorkoutItemList = ({
  workoutItems,
  cues,
  cueType,
}: {
  workoutItems: SpeedWorkoutItem[];
  cues: string[];
  cueType: string;
}) => {
  return (
    <div style={{ display: 'grid', rowGap: 16 }}>
      {workoutItems.map((workoutItem, index) => {
        const { text, pitchesArray, chinese } = workoutItem;
        return (
          <div
            key={index}
            style={{ display: 'grid', gridTemplateColumns: '20px 1fr 4fr' }}
          >
            <div
              style={{ display: 'flex', alignItems: 'center', fontSize: 12 }}
            >
              {index + 1}
            </div>
            <CueCell cue={cues[index]} cueType={cueType} />
            <div style={{ display: 'grid', rowGap: 4 }}>
              <div style={{ fontSize: 14 }}>{text}</div>
              <div style={{ fontSize: 12, color: '#555' }}>{chinese}</div>
              <SentencePitchLine pitchStr={pitchesArray} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WorkoutItemList;
