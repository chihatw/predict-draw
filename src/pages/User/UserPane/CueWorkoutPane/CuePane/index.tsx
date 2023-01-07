import React from 'react';
import { CueCardProps, CueWorkoutState, SHOW_VERB } from '../../../../../Model';

import CueCard from './CueCard';

const CuePane = React.memo(
  ({ cueWorkout }: { cueWorkout: CueWorkoutState }) => {
    return (
      <div style={{ height: 200 }}>
        <div style={{ display: 'grid', rowGap: 16, flexGrow: 1 }}>
          {cueWorkout.params.hasHeader && (
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
          <VerbCueCardSwitch
            verb={cueWorkout.cue.verb}
            showVerb={cueWorkout.params.showVerb}
          />
        </div>
      </div>
    );
  }
);

export default CuePane;

const VerbCueCardSwitch = ({
  verb,
  showVerb,
}: {
  verb: CueCardProps;
  showVerb: string;
}) => {
  switch (showVerb) {
    case SHOW_VERB.show:
      return <CueCard label={verb.label} pitchStr={verb.pitchStr} />;
    case SHOW_VERB.hide:
      return <></>;
    case SHOW_VERB.showBoth:
      if (!['入れる', '入れない'].includes(verb.label)) return <></>;
      return (
        <>
          <CueCard label='入れる' pitchStr='いれる' />
          <CueCard label='入れない' pitchStr='いれない' />
        </>
      );
    default:
      console.error(`incorrect showVerb: ${showVerb}`);
      return <></>;
  }
};
