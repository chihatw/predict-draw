import {
  CueWorkoutCue,
  CueWorkoutParams,
  INITIAL_CUE_WORKOUT_CUE,
} from '../../../Model';
import { shuffle } from '../../utils';
import buildCueWorkoutCue from './buildCueWorkoutCue';
import getIsNegative from './getIsNegative';
import getNounIds from './getNounIds';
import getVerbId from './getVerbId';

const createCueFromParams = (params: CueWorkoutParams): CueWorkoutCue => {
  if (
    !params.colors.length ||
    !params.verbs.length ||
    !params.joshiPatterns.length
  )
    return INITIAL_CUE_WORKOUT_CUE;

  const isNegative = getIsNegative(params.negativeSentence);
  const verbId = getVerbId(params.verbs);
  const nounIds = getNounIds(verbId, params.colors);
  const joshiPattern = shuffle(params.joshiPatterns)[0];

  const cue = buildCueWorkoutCue({
    verbId,
    nounIds,
    hasHeader: params.hasHeader,
    isNegative,
    joshiPattern,
  });
  return cue;
};

export default createCueFromParams;
