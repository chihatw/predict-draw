import {
  CueCardProps,
  CueWorkoutCue,
  INITIAL_CUE_CARD_PROPS,
  INITIAL_CUE_WORKOUT_CUE,
  Pattern,
  PatternParams,
  TARGET,
} from '../../Model';
import { buildCurrentPatterns } from '../../pages/MngPage/CueWorkoutList/services/useCurrentPatterns';
import { PATTERNS } from '../../pages/MngPage/CueWorkoutList/services/usePatterns';
import { CUE_CARDS } from '../../pages/User/UserPane/CueWorkoutPane/CUE_CARDS';
import { shuffle } from '../utils';

const createCueFromParams = (
  colors: string[],
  patternParams: PatternParams
): CueWorkoutCue => {
  const patterns = PATTERNS;
  const currentPatterns = buildCurrentPatterns(patterns, patternParams);

  if (colors.length < 2 || !currentPatterns.length)
    return INITIAL_CUE_WORKOUT_CUE;

  // 「は」が含まれていれば、抽選確率を倍に
  let pumpedCurrentPatterns: Pattern[] = [];
  for (const currentPattern of currentPatterns) {
    pumpedCurrentPatterns.push(currentPattern);

    if (
      currentPattern.topic !== TARGET.none ||
      currentPattern.grouping !== TARGET.none
    ) {
      pumpedCurrentPatterns.push(currentPattern);
    }
  }

  const cue = buildCueWorkoutCue(colors, pumpedCurrentPatterns);
  return cue;
};

export default createCueFromParams;

const buildCueWorkoutCue = (colors: string[], currentPatterns: Pattern[]) => {
  // パターン抽選
  const currentPattern: Pattern = shuffle(currentPatterns)[0];

  // 色抽選
  const shuffledColors = shuffle(colors);

  // 色から項と前置きを作成
  const { nouns, header } = buildNouns(shuffledColors, currentPattern);

  // 動詞を作成
  const verb = currentPattern.isNegative
    ? {
        label: '入れない',
        pitchStr: 'いれない',
      }
    : {
        label: '入れる',
        pitchStr: 'いれる',
      };

  const text = [header, nouns[0], nouns[1], verb]
    .map((item) => item.label)
    .join('');

  return { text, verb, nouns, header };
};

const buildNouns = (colors: string[], pattern: Pattern) => {
  const nouns: CueCardProps[] = [];

  // 基本順は　ヲ格が先
  const [woNounId, niNounId] = colors.slice(0, 2);
  // 主題がニ格の時だけ、ニ格を先にする
  const nounId1 = pattern.topic !== TARGET.ni ? woNounId : niNounId;
  const nounId2 = pattern.topic !== TARGET.ni ? niNounId : woNounId;

  const joshi1 = pattern.isWoFirst ? pattern.wo : pattern.ni;
  const joshi2 = pattern.isWoFirst ? pattern.ni : pattern.wo;
  const noun1 = buildNounCueCardProps(nounId1, joshi1);
  const noun2 = buildNounCueCardProps(nounId2, joshi2);
  nouns.push(noun1);
  nouns.push(noun2);

  // 主題があれば、前置きを作成
  const header =
    pattern.topic !== TARGET.none
      ? {
          label: `私は${CUE_CARDS[nounId1].label}が好きです`,
          pitchStr: [
            'わたしは',
            `${CUE_CARDS[nounId1].pitchStr}が`,
            'すき＼です',
          ].join(' '),
        }
      : INITIAL_CUE_CARD_PROPS;

  return { nouns, header };
};

const buildNounCueCardProps = (nounId: string, joshi: string) => {
  const noun = CUE_CARDS[nounId];
  const label = noun.label + joshi;

  // 助詞が「には」で、名詞にアクセントがない場合は、「に＼は」になる
  if (
    joshi === 'には' &&
    !noun.pitchStr.includes('＼') &&
    !noun.hasTailAccent
  ) {
    joshi = 'に＼は';
  }

  const pitchStr = noun.pitchStr + (noun.hasTailAccent ? '＼' : '') + joshi;
  return { label, pitchStr };
};
