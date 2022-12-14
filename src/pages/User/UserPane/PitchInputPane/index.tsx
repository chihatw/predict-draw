import * as R from 'ramda';
import pitch_input_100 from '../../../../assets/audios/pitch_input_100.mp3';
import React, { useContext, useEffect, useReducer } from 'react';
import { AppContext } from '../../../../App';
import { INITIAL_PITCH_INPUT_FORM_STATE, PitchInputFormState } from './Model';
import { getBlobFromAssets } from '../../../../services/utils';
import { State } from '../../../../Model';
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
      let blob: Blob | null = null;
      if (state.blobs[pitch_input_100]) {
        blob = state.blobs[pitch_input_100];
      } else {
        const { blob: tmp } = await getBlobFromAssets(pitch_input_100);
        if (tmp) {
          blob = tmp;
        }
      }
      const updatedState = R.assocPath<Blob | null, State>(
        ['blobs', pitch_input_100],
        blob
      )(state);
      dispatch({ type: ActionTypes.setState, payload: updatedState });
    };

    fetchData();
  }, []);

  useEffect(() => {
    const formState: PitchInputFormState = {
      blob: state.blobs[pitch_input_100],
      mora: state.pitchInput.mora,
      cueIds: state.pitchInput.cueIds,
      answerIds: [],
      currentIndex: 0,
      audioContext: state.audioContext,
      hasA: state.pitchInput.hasA,
      hasN: state.pitchInput.hasN,
      hasX: state.pitchInput.hasX,
    };
    formDispatch(formState);
  }, [
    state.blobs,
    state.audioContext,
    state.pitchInput.mora,
    state.pitchInput.cueIds,
  ]);

  if (!state.audioContext) return <TouchMe />;

  return <PitchInputForm state={formState} dispatch={formDispatch} />;
};

export default PitchInputPane;
