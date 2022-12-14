import downpitch_120 from '../../../../assets/audios/downpitch_120.mp3';
import * as R from 'ramda';
import React, { useContext, useEffect, useReducer } from 'react';
import { AppContext } from '../../../../App';
import { State } from '../../../../Model';
import { buildFormState } from '../../../../services/rhythmWorkout';
import { getBlobFromAssets } from '../../../../services/utils';
import { ActionTypes } from '../../../../Update';
import TouchMe from '../RandomWorkoutPane/RecordingPane/TouchMe';

import {
  RhythmWorkoutFormState,
  INITIAL_RHYTHM_WORKOUT_FORM_STATE,
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
      let _blob: Blob | null = null;
      if (state.blobs[downpitch_120]) {
        _blob = state.blobs[downpitch_120];
      } else {
        const { blob: tmp } = await getBlobFromAssets(downpitch_120);
        if (tmp) {
          _blob = tmp;
        }
      }
      const updatedState = R.assocPath<Blob | null, State>(
        ['blobs', downpitch_120],
        _blob
      )(state);
      dispatch({ type: ActionTypes.setState, payload: updatedState });
    };

    fetchData();
  }, []);

  useEffect(() => {
    const formState = buildFormState(state);
    rhythmWorkoutFormDispatch(formState);
  }, [state.rhythmWorkout.cueIds, state.audioContext, state.blobs]);

  if (!state.audioContext) return <TouchMe />;
  return (
    <RhythmWorkoutForm
      state={rhythmWorkoutFormState}
      dispatch={rhythmWorkoutFormDispatch}
    />
  );
};

export default RhythmWorkoutPane;
