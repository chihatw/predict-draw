import {
  CueWorkoutCue,
  CueWorkoutParams,
  INITIAL_CUE_WORKOUT_CUE,
} from '../../../Model';
import buildCueWorkoutCue from './buildCueWorkoutCue';
import getIsGroupingWithHa from './getIsGroupingWithHa';
import getIsInverb from './getIsInverb';
import getIsNegative from './getIsNegative';
import getNounIds from './getNounIds';
import getVerbId from './getVerbId';

/**
 * hands, position は無視
 *
 */
const createCueFromParams = (params: CueWorkoutParams): CueWorkoutCue => {
  if (!params.colors.length || !params.verbs.length)
    return INITIAL_CUE_WORKOUT_CUE;

  const isNegative = getIsNegative(params.negativeSentence);
  const isGroupingWithHa = getIsGroupingWithHa(params.groupingWithHa);

  const verbId = getVerbId(params.verbs);
  const isInverse = getIsInverb(verbId, params.joshiOrder);
  const nounIds = getNounIds(verbId, params.colors);

  const cue = buildCueWorkoutCue({
    verbId,
    nounIds,
    firstNounAlwaysHasHa: params.firstNounAlwaysHasHa,
    hasHeader: params.hasHeader,
    isInverse,
    isNegative,
    isPoliteType: params.isPoliteType,
    isGroupingWithHa,
  });
  return cue;
};

export default createCueFromParams;
