import { ICueWorkoutCard } from './0-interface';

export const CUE_CARDS: { [key: string]: ICueWorkoutCard } = {
  red: {
    id: 'red',
    label: '赤',
    pitchStr: 'あ＼か',
    hasTailAccent: false,
  },
  blue: {
    id: 'blue',
    label: '青',
    pitchStr: 'あ＼お',
    hasTailAccent: false,
  },
  green: {
    id: 'green',
    label: '緑',
    pitchStr: 'み＼どり',
    hasTailAccent: false,
  },
  hikkurikaesu: {
    id: 'hikkurikaesu',
    label: 'ひっくりかえす',
    pitchStr: 'ひっくりか＼えす',
    hasTailAccent: false,
  },
  ireru: {
    id: 'ireru',
    label: '入れる',
    pitchStr: 'いれる',
    hasTailAccent: false,
  },
  kabuseru: {
    id: 'kabuseru',
    label: '被せる',
    pitchStr: 'かぶせ＼る',
    hasTailAccent: false,
  },
  motsu: {
    id: 'motsu',
    label: '持つ',
    pitchStr: 'も＼つ',
    hasTailAccent: false,
  },
  noseru: {
    id: 'noseru',
    label: 'のせる',
    pitchStr: 'のせる',
    hasTailAccent: false,
  },
  orange: {
    id: 'orange',
    label: 'オレンジ',
    pitchStr: 'オレ＼ンジ',
    hasTailAccent: false,
  },
  pink: {
    id: 'pink',
    label: 'ピンク',
    pitchStr: 'ピ＼ンク',
    hasTailAccent: false,
  },
  yellow: {
    id: 'yellow',
    label: '黄色',
    pitchStr: 'きいろ',
    hasTailAccent: false,
  },
  yubisasu: {
    id: 'yubisasu',
    label: 'ゆびさす',
    pitchStr: 'ゆびさ＼す',
    hasTailAccent: false,
  },
  mine: {
    id: 'mine',
    label: 'わたしのて',
    pitchStr: 'わたしのて',
    hasTailAccent: true,
  },
  yours: {
    id: 'yours',
    label: 'じぶんのて',
    pitchStr: 'じぶんのて',
    hasTailAccent: true,
  },
  right: {
    id: 'right',
    label: '一番右の',
    pitchStr: 'いちばん　みぎの',
    hasTailAccent: true,
  },
  left: {
    id: 'left',
    label: '一番左の',
    pitchStr: 'いちばん　ひだりの',
    hasTailAccent: true,
  },
};
