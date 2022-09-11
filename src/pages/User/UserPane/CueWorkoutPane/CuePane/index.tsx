import * as R from 'ramda';
import React from 'react';
import {
  CueWorkoutState,
  INITIAL_CUE_WORKOUT_CARD,
} from '../../../../../Model';

import CueCard from './CueCard';

const NOUN_LABELS: { [key: string]: string } = {
  red: '赤',
  blue: '青',
  yellow: '黄色',
  green: '緑',
  pink: 'ピンク',
  orange: 'オレンジ',
  mine: '私の手',
  yours: '自分の手',
};

const VERB_LABELS: { [key: string]: string } = {
  motsu: '持つ',
  yubisasu: '指差す',
  hikkurikaesu: 'ひっくり返す',
  ireru: '入れる',
  noseru: 'のせる',
  kabuseru: 'かぶせる',
};

const CuePane = React.memo(
  ({ cueWorkout }: { cueWorkout: CueWorkoutState }) => {
    const { cards, cue } = cueWorkout;
    const { nouns, verb, isInverse } = cue;
    const verbCard = cards[verb] || INITIAL_CUE_WORKOUT_CARD;

    let cueCards = nouns.map((noun) => cards[noun]);
    if (cue.isInverse) {
      cueCards = R.reverse(cueCards);
    }
    return (
      <div style={{ height: 200 }}>
        <div style={{ display: 'grid', rowGap: 16, flexGrow: 1 }}>
          {cueCards.map((cueCard, index) => {
            let label = '';
            let pitchStr = '';
            switch (index) {
              case 0:
                if (isInverse) {
                  label = NOUN_LABELS[cueCard.id] + 'に';
                  pitchStr =
                    cueCard.pitchStr +
                    (cueCard.hasTailAccent ? '＼' : '') +
                    'に';
                } else {
                  label = NOUN_LABELS[cueCard.id] + 'を';
                  pitchStr =
                    cueCard.pitchStr +
                    (cueCard.hasTailAccent ? '＼' : '') +
                    'を';
                }
                break;
              case 1:
                if (isInverse) {
                  label = NOUN_LABELS[cueCard.id] + 'を';
                  pitchStr =
                    cueCard.pitchStr +
                    (cueCard.hasTailAccent ? '＼' : '') +
                    'を';
                } else {
                  label = NOUN_LABELS[cueCard.id] + 'に';
                  pitchStr =
                    cueCard.pitchStr +
                    (cueCard.hasTailAccent ? '＼' : '') +
                    'に';
                }
                break;
              default:
            }
            return <CueCard key={index} label={label} pitchStr={pitchStr} />;
          })}
          <CueCard
            label={VERB_LABELS[verbCard.id]}
            pitchStr={verbCard.pitchStr}
          />
        </div>
      </div>
    );
  }
);

export default CuePane;
