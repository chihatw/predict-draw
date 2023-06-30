import { useContext, useEffect, useReducer } from 'react';
import { AppContext } from '../../../../../App';
import { ActionTypes } from '../../../../../Update';
import { buildFormState } from '../../../../../services/rhythmWorkout';
import { getUpdatedStateWithAssetPath } from '../../../../../services/utils';
import downpitch_120 from '../../../../assets/audios/downpitch_120.mp3';
import TouchMe from '../RandomWorkoutPane/RecordingPane/TouchMe';

import {
  INITIAL_RHYTHM_WORKOUT_FORM_STATE,
  RhythmWorkoutFormState,
} from './Model';
import RhythmWorkoutForm from './RhythmWorkoutForm';

const reducer = (
  state: RhythmWorkoutFormState,
  action: RhythmWorkoutFormState
) => action;

const RhythmWorkoutPane = () => {
  const { state, dispatch } = useContext(AppContext);
  const [rhythmWorkoutFormState, rhythmWorkoutFormDispatch] = useReducer(
    reducer,
    INITIAL_RHYTHM_WORKOUT_FORM_STATE
  );

  useEffect(() => {
    const fetchData = async () => {
      const updatedState = await getUpdatedStateWithAssetPath(
        state,
        downpitch_120
      );
      dispatch({ type: ActionTypes.setState, payload: updatedState });
    };

    fetchData();
  }, []);

  useEffect(() => {
    const formState = buildFormState(state);
    rhythmWorkoutFormDispatch(formState);
  }, [state.rhythmWorkout.cueIds, state.audioContext, state.audioBuffers]);

  if (!state.audioContext) return <TouchMe />;
  return (
    <RhythmWorkoutForm
      state={rhythmWorkoutFormState}
      dispatch={rhythmWorkoutFormDispatch}
    />
  );
};

export default RhythmWorkoutPane;
