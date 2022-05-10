import { SentencePitchLine } from '@chihatw/pitch-line.sentence-pitch-line';
import React from 'react';
import string2PitchesArray from 'string2pitches-array';
import { WorkoutItem } from 'workout-items';
import { CUE_TYPES } from '../../../../services/useWorkouts';
import WorkoutItemRow from '../../components/WorkoutItemRow';

const WorkoutItemList = ({
  workoutItems,
  cues,
  cueType,
}: {
  workoutItems: WorkoutItem[];
  cues: string[];
  cueType: string;
}) => {
  return (
    <div style={{ display: 'grid', rowGap: 16 }}>
      {workoutItems.map((workoutItem, index) => (
        <div
          key={index}
          style={{ display: 'grid', gridTemplateColumns: '20px 1fr 4fr' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', fontSize: 12 }}>
            {index + 1}
          </div>
          <CueCell cue={cues[index]} cueType={cueType} />
          <WorkoutItemRow workoutItem={workoutItem} />
        </div>
      ))}
    </div>
  );
};

export default WorkoutItemList;

const CueCell = ({ cue, cueType }: { cue: string; cueType: string }) => {
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
          {cue}
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
          <SentencePitchLine pitchesArray={string2PitchesArray(cue)} />
        </div>
      );
    default:
      return <div></div>;
  }
};
