import ta_pitches_120 from '../../../../assets/audios/ta_pitches_120.mp3';
import * as R from 'ramda';
import React, { useContext, useEffect, useReducer } from 'react';
import { AppContext } from '../../../../App';
import { State } from '../../../../Model';
import { getBlobFromAssets } from '../../../../services/utils';
import { ActionTypes } from '../../../../Update';
import TouchMe from '../RandomWorkoutPane/RecordingPane/TouchMe';
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
      let blob: Blob | null = null;
      if (state.blobs[ta_pitches_120]) {
        blob = state.blobs[ta_pitches_120];
      } else {
        const { blob: tmp } = await getBlobFromAssets(ta_pitches_120);
        if (tmp) {
          blob = tmp;
        }
      }

      const updatedState = R.assocPath<Blob | null, State>(
        ['blobs', ta_pitches_120],
        blob
      )(state);
      dispatch({ type: ActionTypes.setState, payload: updatedState });
    };

    fetchData();
  }, []);

  useEffect(() => {
    const formState = {
      blob: state.blobs[ta_pitches_120],
      mora: state.pitchWorkout.mora,
      cueIds: state.pitchWorkout.cueIds,
      answerIds: [],
      currentIndex: 0,
      audioContext: state.audioContext,
    };
    pitchWorkoutFormDispatch(formState);
  }, [state.pitchWorkout.cueIds, state.audioContext, state.blobs]);

  if (!state.audioContext) return <TouchMe />;
  return (
    <PitchWorkoutForm
      state={pitchWorkoutFormState}
      dispatch={pitchWorkoutFormDispatch}
    />
  );
};

export default PitchWorkoutPane;
