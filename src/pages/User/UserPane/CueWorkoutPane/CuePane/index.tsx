// import * as R from 'ramda';
import React from 'react';
import {
  CueWorkoutState,
  // INITIAL_CUE_WORKOUT_CARD,
} from '../../../../../Model';
import { CUE_CARDS } from '../CUE_CARDS';

import CueCard from './CueCard';

// const NOUN_LABELS: { [key: string]: string } = {
//   red: '赤',
//   blue: '青',
//   yellow: '黄色',
//   green: '緑',
//   pink: 'ピンク',
//   orange: 'オレンジ',
//   mine: '私の手',
//   yours: '自分の手',
//   right: '一番右の',
//   left: '一番左の',
// };

const CuePane = React.memo(
  ({ cueWorkout }: { cueWorkout: CueWorkoutState }) => {
    /** cue.nouns から cueCards の作成 */
    // let cueCards = cueWorkout.cue.nouns.map((noun) => cueWorkout.cards[noun]);

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
