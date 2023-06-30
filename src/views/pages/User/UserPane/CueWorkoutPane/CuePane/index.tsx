import React from 'react';
import { CueWorkoutState, TARGET } from '../../../../../../Model';

import CueCard from './CueCard';

const CuePane = React.memo(
  ({ cueWorkout }: { cueWorkout: CueWorkoutState }) => {
    return (
      <div style={{ height: 200 }}>
        <div style={{ display: 'grid', rowGap: 16, flexGrow: 1 }}>
          {cueWorkout.cue.pattern.topic !== TARGET.none && (
            <CueCard
              label={cueWorkout.cue.header.label}
              pitchStr={cueWorkout.cue.header.pitchStr}
            />
          )}
          {cueWorkout.cue.nouns.map((cueCard, index) => (
            <CueCard
              key={index}
              label={cueCard.label}
              pitchStr={cueCard.pitchStr}
            />
          ))}
          <CueCard
            label={cueWorkout.cue.verb.label}
            pitchStr={cueWorkout.cue.verb.pitchStr}
          />
        </div>
      </div>
    );
  }
);

export default CuePane;
