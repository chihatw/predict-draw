import * as R from 'ramda';
import React, { useContext, useEffect, useReducer } from 'react';
import { AppContext } from '../../../../App';
import { State } from '../../../../Model';
import { buildFormState } from '../../../../services/rhythmListening';
import { getBlob } from '../../../../services/utils';
import { ActionTypes } from '../../../../Update';
import TouchMe from '../RandomWorkoutPane/RecordingPane/TouchMe';
import { AUDIO_PATH } from '../RhythmListPane';
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
      let _blob: Blob | null = state.blobs[AUDIO_PATH]
        ? state.blobs[AUDIO_PATH]
        : await getBlob(AUDIO_PATH);
      const updatedState = R.assocPath<Blob | null, State>(
        ['blobs', AUDIO_PATH],
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
