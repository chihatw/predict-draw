import { CueCardProps } from '../../../../Model';
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

const VERBS_NEGA_POLITE: {
  [key: string]: { label: string; pitchStr: string };
} = {
  motsu: {
    label: '持たないでください',
    pitchStr: 'もた＼ないで　くださ＼い',
  },
  yubisasu: {
    label: '指差さないでください',
    pitchStr: 'ゆびささ＼ないで　くださ＼い',
  },
  hikkurikaesu: {
    label: 'ひっくり返さないでください',
    pitchStr: 'ひっくりかえさ＼ないで　くださ＼い',
  },
  ireru: {
    label: '入れないでください',
    pitchStr: 'いれな＼いで　くださ＼い',
  },
  noseru: {
    label: 'のせないでください',
    pitchStr: 'のせな＼いで　くださ＼い',
  },
  kabuseru: {
    label: 'かぶせないでください',
    pitchStr: 'かぶせ＼ないで　くださ＼い',
  },
};

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

const buildVerbCardProps = (
  verbId: string,
  isNegative: boolean,
  isPoliteType: boolean
): CueCardProps => {
  if (isPoliteType && isNegative) {
    return VERBS_NEGA_POLITE[verbId];
  }
  if (isNegative) {
    return VERBS_NEGA[verbId];
  }

  return VERBS[verbId];
};

export default buildVerbCardProps;
