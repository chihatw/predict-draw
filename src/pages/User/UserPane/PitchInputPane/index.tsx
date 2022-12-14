import pitch_input_100 from '../../../../assets/audios/pitch_input_100.mp3';
import React, { useContext, useEffect, useReducer } from 'react';
import { AppContext } from '../../../../App';
import { INITIAL_PITCH_INPUT_FORM_STATE, PitchInputFormState } from './Model';
import { getUpdatedStateWithAssetPath } from '../../../../services/utils';
import { ActionTypes } from '../../../../Update';
import PitchInputForm from './PitchInputForm';
import TouchMe from '../RandomWorkoutPane/RecordingPane/TouchMe';

const reducer = (state: PitchInputFormState, action: PitchInputFormState) =>
  action;

const PitchInputPane = () => {
  const { state, dispatch } = useContext(AppContext);
  const [formState, formDispatch] = useReducer(
    reducer,
    INITIAL_PITCH_INPUT_FORM_STATE
  );

  useEffect(() => {
    const fetchData = async () => {
      const updatedState = await getUpdatedStateWithAssetPath(
        state,
        pitch_input_100
      );
      dispatch({ type: ActionTypes.setState, payload: updatedState });
    };

    fetchData();
  }, [state.audioContext]);

  useEffect(() => {
    const formState: PitchInputFormState = {
      audioBuffer: state.audioBuffers[pitch_input_100],
      mora: state.pitchInput.mora,
      cueIds: state.pitchInput.cueIds,
      answerIds: [],
      currentIndex: 0,
      audioContext: state.audioContext,
      hasA: state.pitchInput.hasA,
      hasN: state.pitchInput.hasN,
      hasX: state.pitchInput.hasX,
    };
    console.log({ formState });
    formDispatch(formState);
  }, [
    state.audioBuffers,
    state.audioContext,
    state.pitchInput.mora,
    state.pitchInput.cueIds,
  ]);

  if (!state.audioContext) return <TouchMe />;

  return <PitchInputForm state={formState} dispatch={formDispatch} />;
};

export default PitchInputPane;
