import downpitch_120 from '../../../../assets/audios/downpitch_120.mp3';
import * as R from 'ramda';
import React, { useContext, useEffect, useReducer } from 'react';
import { AppContext } from '../../../../App';
import { State } from '../../../../Model';
import { buildFormState } from '../../../../services/rhythmListening';
import { getBlobFromAssets } from '../../../../services/utils';
import { ActionTypes } from '../../../../Update';
import TouchMe from '../RandomWorkoutPane/RecordingPane/TouchMe';

import {
  INITIAL_RHYTHM_LISTENING_FORM_STATE,
  RhythmListeningFormState,
} from './Model';
import RhythmListeningForm from './RhythmListeningForm';

const reducer = (
  state: RhythmListeningFormState,
  action: RhythmListeningFormState
) => {
  return action;
};

const RhythmListeningPane = () => {
  const { state, dispatch } = useContext(AppContext);
  const [rhythmListeningFormState, rhythmListeningFormDispatch] = useReducer(
    reducer,
    INITIAL_RHYTHM_LISTENING_FORM_STATE
  );

  useEffect(() => {
    const fetchData = async () => {
      let _blob: Blob | null = state.blobs[downpitch_120]
        ? state.blobs[downpitch_120]
        : await getBlobFromAssets(downpitch_120);
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
    rhythmListeningFormDispatch(formState);
  }, [state.rhythmListening.cueIds, state.audioContext, state.blobs]);

  if (!state.audioContext) return <TouchMe />;
  return (
    <RhythmListeningForm
      state={rhythmListeningFormState}
      dispatch={rhythmListeningFormDispatch}
    />
  );
};

export default RhythmListeningPane;
