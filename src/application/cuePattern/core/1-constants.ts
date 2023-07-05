import { ICuePattern } from './0-interface';

export const TARGET = {
  none: 'none',
  wo: 'wo',
  ni: 'ni',
};

export const initialState: ICuePattern = {
  wo: 'を',
  ni: 'に',
  topic: TARGET.none,
  doushi: '入れる',
  sentence: '青を赤に入れる',
  grouping: TARGET.none,
  isWoFirst: true,
  isNegative: false,
};

export const PATTERNS: ICuePattern[] = [
  {
    wo: 'を',
    ni: 'に',
    topic: 'none',
    doushi: '入れる',
    sentence: '青を赤に入れる',
    grouping: 'none',
    isWoFirst: true,
    isNegative: false,
  },
  {
    wo: 'を',
    ni: 'に',
    topic: 'none',
    doushi: '入れない',
    sentence: '青を赤に入れない',
    grouping: 'none',
    isWoFirst: true,
    isNegative: true,
  },
  {
    wo: 'を',
    ni: 'に',
    topic: 'none',
    doushi: '入れる',
    sentence: '赤に青を入れる',
    grouping: 'none',
    isWoFirst: false,
    isNegative: false,
  },
  {
    wo: 'を',
    ni: 'に',
    topic: 'none',
    doushi: '入れない',
    sentence: '赤に青を入れない',
    grouping: 'none',
    isWoFirst: false,
    isNegative: true,
  },
  {
    wo: 'は',
    ni: 'に',
    topic: 'none',
    doushi: '入れない',
    sentence: '青は赤に入れない',
    grouping: 'wo',
    isWoFirst: true,
    isNegative: true,
  },
  {
    wo: 'は',
    ni: 'に',
    topic: 'none',
    doushi: '入れない',
    sentence: '赤に青は入れない',
    grouping: 'wo',
    isWoFirst: false,
    isNegative: true,
  },
  {
    wo: 'を',
    ni: 'には',
    topic: 'none',
    doushi: '入れない',
    sentence: '青を赤には入れない',
    grouping: 'ni',
    isWoFirst: true,
    isNegative: true,
  },
  {
    wo: 'を',
    ni: 'には',
    topic: 'none',
    doushi: '入れない',
    sentence: '赤には青を入れない',
    grouping: 'ni',
    isWoFirst: false,
    isNegative: true,
  },
  {
    wo: 'は',
    ni: 'に',
    topic: 'wo',
    doushi: '入れる',
    sentence: '青は赤に入れる',
    grouping: 'none',
    isWoFirst: true,
    isNegative: false,
  },
  {
    wo: 'は',
    ni: 'に',
    topic: 'wo',
    doushi: '入れない',
    sentence: '青は赤に入れない',
    grouping: 'none',
    isWoFirst: true,
    isNegative: true,
  },
  {
    wo: 'は、',
    ni: 'に',
    topic: 'wo',
    doushi: '入れない',
    sentence: '青は、赤に入れない',
    grouping: 'wo',
    isWoFirst: true,
    isNegative: true,
  },
  {
    wo: 'は',
    ni: 'には',
    topic: 'wo',
    doushi: '入れない',
    sentence: '青は赤には入れない',
    grouping: 'ni',
    isWoFirst: true,
    isNegative: true,
  },
  {
    wo: 'を',
    ni: 'には',
    topic: 'ni',
    doushi: '入れる',
    sentence: '青には赤を入れる',
    grouping: 'none',
    isWoFirst: false,
    isNegative: false,
  },
  {
    wo: 'を',
    ni: 'には',
    topic: 'ni',
    doushi: '入れない',
    sentence: '青には赤を入れない',
    grouping: 'none',
    isWoFirst: false,
    isNegative: true,
  },
  {
    wo: 'は',
    ni: 'には',
    topic: 'ni',
    doushi: '入れない',
    sentence: '青には赤は入れない',
    grouping: 'wo',
    isWoFirst: false,
    isNegative: true,
  },
  {
    wo: 'を',
    ni: 'には、',
    topic: 'ni',
    doushi: '入れない',
    sentence: '青には、赤を入れない',
    grouping: 'ni',
    isWoFirst: false,
    isNegative: true,
  },
];