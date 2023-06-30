import { useContext, useEffect, useReducer } from 'react';
import { AppContext } from '../../../../../App';
import { ActionTypes } from '../../../../../Update';
import { getUpdatedStateWithAssetPath } from '../../../../../services/utils';
import ta_pitches_120 from '../../../../assets/audios/ta_pitches_120.mp3';

import TouchMe from 'views/components/TouchMe';
import {
  INITIAL_PITCH_WORKOUT_FORM_STATE,
  PitchWorkoutFormState,
} from './Model';
import PitchWorkoutForm from './PitchWorkoutForm';

const reducer = (state: PitchWorkoutFormState, action: PitchWorkoutFormState) =>
  action;

const PitchWorkoutPane = () => {
  const { state, dispatch } = useContext(AppContext);
  const [pitchWorkoutFormState, pitchWorkoutFormDispatch] = useReducer(
    reducer,
    INITIAL_PITCH_WORKOUT_FORM_STATE
  );

  useEffect(() => {
    const fetchData = async () => {
      const updatedState = await getUpdatedStateWithAssetPath(
        state,
        ta_pitches_120
      );

      dispatch({ type: ActionTypes.setState, payload: updatedState });
    };

    fetchData();
  }, []);

  useEffect(() => {
    const formState: PitchWorkoutFormState = {
      audioBuffer: state.audioBuffers[ta_pitches_120],
      mora: state.pitchWorkout.mora,
      cueIds: state.pitchWorkout.cueIds,
      answerIds: [],
      currentIndex: 0,
      audioContext: state.audioContext,
    };
    pitchWorkoutFormDispatch(formState);
  }, [state.pitchWorkout.cueIds, state.audioContext, state.audioBuffers]);

  if (!state.audioContext) return <TouchMe />;
  return (
    <PitchWorkoutForm
      state={pitchWorkoutFormState}
      dispatch={pitchWorkoutFormDispatch}
    />
  );
};

export default PitchWorkoutPane;
