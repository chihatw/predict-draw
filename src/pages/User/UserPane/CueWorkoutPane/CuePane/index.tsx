import React, { useContext } from 'react';
import { INITIAL_CUE_WORKOUT_CARD } from '../../../../../Model';
import AppContext from '../../../../../services/context';
import CueCard from './CueCard';

const COLOR_LABELS: { [key: string]: string } = {
  red: 'あか',
  blue: 'あお',
  yellow: 'きいろ',
  green: 'みどり',
  pink: 'ピンク',
  orange: 'オレンジ',
};

const VERB_LABELS: { [key: string]: string } = {
  motsu: 'もつ',
  yubisasu: 'ゆびさす',
  hikkurikaesu: 'ひっくりかえす',
  ireru: 'いれる',
  noseru: 'のせる',
  kabuseru: 'かぶせる',
};

const CuePane = () => {
  const { state } = useContext(AppContext);
  const { cueWorkout } = state;
  const { cue, cards } = cueWorkout;
  const { colors, verb, isInverse } = cue;
  const verbCard = cards[verb] || INITIAL_CUE_WORKOUT_CARD;
  const colorCards = colors.map((color) => cards[color]);

  return (
    <div style={{ height: 200 }}>
      <div style={{ display: 'grid', rowGap: 16, flexGrow: 1 }}>
        {colorCards.map((colorCard, index) => {
          const { id, pitchStr: _pitchStr } = colorCard;
          let label = '';
          let pitchStr = '';
          switch (index) {
            case 0:
              if (isInverse) {
                label = COLOR_LABELS[id] + 'に';
                pitchStr = _pitchStr + 'に';
              } else {
                label = COLOR_LABELS[id] + 'を';
                pitchStr = _pitchStr + 'を';
              }
              break;
            case 1:
              if (isInverse) {
                label = COLOR_LABELS[id] + 'を';
                pitchStr = _pitchStr + 'を';
              } else {
                label = COLOR_LABELS[id] + 'に';
                pitchStr = _pitchStr + 'に';
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
};

export default CuePane;
