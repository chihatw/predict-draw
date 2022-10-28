import { CueCardProps } from '../../../../Model';

const buildVerbCardProps = (
  verbId: string,
  isNegative: boolean
): CueCardProps => {
  if (isNegative) {
    const VERBS_NEGA: { [key: string]: { label: string; pitchStr: string } } = {
      motsu: {
        label: '持たない',
        pitchStr: 'もた＼ない',
      },
      yubisasu: {
        label: '指差さない',
        pitchStr: 'ゆびささ＼ない',
      },
      hikkurikaesu: {
        label: 'ひっくり返さない',
        pitchStr: 'ひっくりかえさ＼ない',
      },
      ireru: {
        label: '入れない',
        pitchStr: 'いれない',
      },
      noseru: {
        label: 'のせない',
        pitchStr: 'のせない',
      },
      kabuseru: {
        label: 'かぶせない',
        pitchStr: 'かぶせ＼ない',
      },
    };
    return VERBS_NEGA[verbId];
  }
  const VERBS: { [key: string]: { label: string; pitchStr: string } } = {
    motsu: {
      label: '持つ',
      pitchStr: 'も＼つ',
    },
    yubisasu: {
      label: '指差さす',
      pitchStr: 'ゆびさ＼す',
    },
    hikkurikaesu: {
      label: 'ひっくり返す',
      pitchStr: 'ひっくりか＼えす',
    },
    ireru: {
      label: '入れる',
      pitchStr: 'いれる',
    },
    noseru: {
      label: 'のせる',
      pitchStr: 'のせる',
    },
    kabuseru: {
      label: 'かぶせる',
      pitchStr: 'かぶせ＼る',
    },
  };
  return VERBS[verbId];
};

export default buildVerbCardProps;
