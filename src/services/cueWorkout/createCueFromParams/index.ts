import {
  CueWorkoutCue,
  CueWorkoutParams,
  INITIAL_CUE_WORKOUT_CUE,
} from '../../../Model';
import buildCueWorkoutCue from './buildCueWorkoutCue';
import getHasTopic from './getHasTopic';
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

  const hasTopic = getHasTopic(params.topicMode);
  const isNegative = getIsNegative(params.negativeSentence);
  const verbId = getVerbId(params.verbs);
  const isInverse = getIsInverb(verbId, params.joshiOrder);
  const nounIds = getNounIds(verbId, params.colors);

  const cue = buildCueWorkoutCue({
    verbId,
    nounIds,
    hasTopic,
    isInverse,
    isNegative,
    isPoliteType: params.isPoliteType,
  });
  return cue;
};

export default createCueFromParams;
