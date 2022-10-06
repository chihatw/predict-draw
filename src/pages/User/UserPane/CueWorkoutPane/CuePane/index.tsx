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
  right: '一番右の',
  left: '一番左の',
};

const VERB_LABELS: { [key: string]: string } = {
  motsu: '持つ',
  yubisasu: '指差す',
  hikkurikaesu: 'ひっくり返す',
  ireru: '入れる',
  noseru: 'のせる',
  kabuseru: 'かぶせる',
};

const NEGATIVE_VERB_LABELS: { [key: string]: string } = {
  motsu: '持たない',
  yubisasu: '指差さない',
  hikkurikaesu: 'ひっくり返さない',
  ireru: '入れない',
  noseru: 'のせない',
  kabuseru: 'かぶせない',
};

const NEGATIVE_VERB_PITCH_STR: { [key: string]: string } = {
  motsu: 'もた＼ない',
  yubisasu: 'ゆびささ＼ない',
  hikkurikaesu: 'ひっくりかえさ＼ない',
  ireru: 'いれない',
  noseru: 'のせない',
  kabuseru: 'かぶせ＼ない',
};

const CuePane = React.memo(
  ({ cueWorkout }: { cueWorkout: CueWorkoutState }) => {
    const { cards, cue } = cueWorkout;
    const verbCard = cards[cue.verb] || INITIAL_CUE_WORKOUT_CARD;

    const verbLabel = cue.isNegative
      ? NEGATIVE_VERB_LABELS[verbCard.id]
      : VERB_LABELS[verbCard.id];

    const verbPitchStr = cue.isNegative
      ? NEGATIVE_VERB_PITCH_STR[verbCard.id]
      : verbCard.pitchStr;

    let cueCards = cue.nouns.map((noun) => cards[noun]);
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
                if (cue.hasTopic) {
                  label = NOUN_LABELS[cueCard.id] + 'は';
                  pitchStr =
                    cueCard.pitchStr +
                    (cueCard.hasTailAccent ? '＼' : '') +
                    'は';
                  break;
                }
                if (cue.isInverse) {
                  label = NOUN_LABELS[cueCard.id] + 'に';
                  pitchStr =
                    cueCard.pitchStr +
                    (cueCard.hasTailAccent ? '＼' : '') +
                    'に';
                  break;
                }

                label = NOUN_LABELS[cueCard.id] + 'を';
                pitchStr =
                  cueCard.pitchStr + (cueCard.hasTailAccent ? '＼' : '') + 'を';

                break;
              case 1:
                if (cue.isInverse) {
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
            return (
              <div style={{ display: 'grid', rowGap: 16 }}>
                <CueCard key={index} label={label} pitchStr={pitchStr} />
                {cueCards.length > 1 && index === 0 && (
                  <div style={{ height: 4, borderTop: '8px hotpink dashed' }} />
                )}
              </div>
            );
          })}
          <CueCard label={verbLabel} pitchStr={verbPitchStr} />
        </div>
      </div>
    );
  }
);

export default CuePane;
