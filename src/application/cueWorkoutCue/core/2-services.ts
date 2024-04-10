import { ICuePatternParams } from "@/application/cuePatternParams/core/0-interface";
import * as _ from "lodash";

import { ICuePattern } from "@/application/cuePattern/core/0-interface";
import {
  PATTERNS,
  TARGET,
  initialState as cuePatternInitialState,
} from "@/application/cuePattern/core/1-constants";
import { buildCurrentPatterns } from "@/application/cuePattern/core/2-services";
import { CUE_CARDS } from "@/application/cueWorkoutCards/core/1-constants";
import {
  ICueCard,
  ICueWorkoutCue,
} from "@/application/cueWorkoutCue/core/0-interface";
import { initialState as cueWorkoutCueInitialState } from "@/application/cueWorkoutCue/core/1-constants";
import { shuffle } from "@/application/utils/utils";

export const updateCue = (
  colors: string[],
  cuePatternParams: ICuePatternParams,
  currentCuePattern: ICuePattern,
  currentCueWorkoutCue: ICueWorkoutCue,
): {
  cuePattern: ICuePattern;
  cueWorkoutCue: ICueWorkoutCue;
} => {
  let updatedCue = {
    cuePattern: currentCuePattern,
    cueWorkoutCue: currentCueWorkoutCue,
  };
  let i = 0;
  while (_.isEqual(currentCuePattern, updatedCue.cuePattern) && i < 10) {
    const { cuePattern: _cuePattern, cueWorkoutCue: _cueWorkoutCue } =
      createCueFromParams(colors, cuePatternParams);
    updatedCue = { cuePattern: _cuePattern, cueWorkoutCue: _cueWorkoutCue };
    i++;
  }
  return updatedCue;
};

const createCueFromParams = (
  colors: string[],
  patternParams: ICuePatternParams,
): { cuePattern: ICuePattern; cueWorkoutCue: ICueWorkoutCue } => {
  const patterns = PATTERNS;
  const currentPatterns = buildCurrentPatterns(patterns, patternParams);

  if (colors.length < 2 || !currentPatterns.length)
    return {
      cuePattern: cuePatternInitialState,
      cueWorkoutCue: cueWorkoutCueInitialState,
    };

  // 確率の調整
  let pumpedCurrentPatterns: ICuePattern[] = [];
  let extra = 0;
  const topicOrder = [TARGET.ni, TARGET.wo, TARGET.none];
  const groupingOrder = [TARGET.none, TARGET.ni, TARGET.wo];
  const sortedCurrentPatterns = currentPatterns.sort(
    (a, b) =>
      topicOrder.indexOf(a.topic) * 10 +
      groupingOrder.indexOf(a.grouping) -
      (topicOrder.indexOf(b.topic) * 10 + groupingOrder.indexOf(b.grouping)),
  );
  for (const currentPattern of sortedCurrentPatterns) {
    pumpedCurrentPatterns.push(currentPattern);

    /**
     * 主題有りの場合
     */
    if (currentPattern.topic !== TARGET.none) {
      // 分類無しは＋0
      if (currentPattern.grouping === TARGET.none) {
        for (let i = 0; i < 0; i++) {
          pumpedCurrentPatterns.push(currentPattern);
          extra++;
        }
      }
    }
    // 主題無しの場合
    else {
      switch (currentPattern.grouping) {
        // ニ格分類は＋0
        case TARGET.ni:
          for (let i = 0; i < 0; i++) {
            pumpedCurrentPatterns.push(currentPattern);
            extra++;
          }
          break;
        // ヲ格分類は+0
        case TARGET.wo:
          // const max = Math.floor((sortedCurrentPatterns.length + extra) * 0.5);
          for (let i = 0; i < 0; i++) {
            pumpedCurrentPatterns.push(currentPattern);
          }
          break;
        default:
      }
    }
  }

  const { cuePattern, cueWorkoutCue } = buildCueWorkoutCueAndPattern(
    colors,
    pumpedCurrentPatterns,
  );
  return { cuePattern, cueWorkoutCue };
};

const buildCueWorkoutCueAndPattern = (
  colors: string[],
  currentPatterns: ICuePattern[],
): { cuePattern: ICuePattern; cueWorkoutCue: ICueWorkoutCue } => {
  // パターン抽選
  const currentPattern: ICuePattern = shuffle(currentPatterns)[0];

  // 色抽選
  const shuffledColors = shuffle(colors);

  // 色から項と前置きを作成
  const { nouns, header } = buildNouns(shuffledColors, currentPattern);

  // 動詞を作成
  const verb = currentPattern.isNegative
    ? {
        label: "入れない",
        pitchStr: "いれない",
      }
    : {
        label: "入れる",
        pitchStr: "いれる",
      };

  const text = [header, nouns[0], nouns[1], verb]
    .map((item) => item.label)
    .join("");

  const cuePattern: ICuePattern = currentPattern;
  const cueWorkoutCue: ICueWorkoutCue = { text, verb, nouns, header };

  return { cuePattern, cueWorkoutCue };
};

const buildNouns = (colors: string[], pattern: ICuePattern) => {
  const nouns: ICueCard[] = [];

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
            "わたしは",
            `${CUE_CARDS[nounId1].pitchStr}が`,
            "すき＼です",
          ].join(" "),
        }
      : { label: "", pitchStr: "" };

  return { nouns, header };
};

const buildNounCueCardProps = (nounId: string, joshi: string) => {
  const noun = CUE_CARDS[nounId];
  const label = noun.label + joshi;

  // 助詞が「には」で、名詞にアクセントがない場合は、「に＼は」になる
  if (
    joshi === "には" &&
    !noun.pitchStr.includes("＼") &&
    !noun.hasTailAccent
  ) {
    joshi = "に＼は";
  }

  const pitchStr = noun.pitchStr + (noun.hasTailAccent ? "＼" : "") + joshi;
  return { label, pitchStr };
};
