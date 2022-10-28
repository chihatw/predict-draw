import React from 'react';
import { CueWorkoutState } from '../../../../../Model';

import CueCard from './CueCard';

const CuePane = React.memo(
  ({ cueWorkout }: { cueWorkout: CueWorkoutState }) => {
    return (
      <div style={{ height: 200 }}>
        <div style={{ display: 'grid', rowGap: 16, flexGrow: 1 }}>
          {cueWorkout.cue.nouns.map((cueCard, index) => {
            return (
              <div style={{ display: 'grid', rowGap: 16 }} key={index}>
                <CueCard label={cueCard.label} pitchStr={cueCard.pitchStr} />
                {cueCard.hasBorder && (
                  <div style={{ height: 4, borderTop: '8px hotpink dashed' }} />
                )}
              </div>
            );
          })}
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
