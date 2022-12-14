import * as R from 'ramda';
import downpitch_120 from '../../../../assets/audios/downpitch_120.mp3';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { AppContext } from '../../../../App';
import { State } from '../../../../Model';
import { getBlob, getBlobFromAssets } from '../../../../services/utils';
import { buildWorkingMemoryFormState } from '../../../../services/workingMemoryWorkout';
import { ActionTypes } from '../../../../Update';
import { INITIAL_WORKING_MEMORY_FORM_STATE } from './Model';
import { workingMemoryReducer } from './Update';
import WorkingMemoryForm from './WorkingMemoryForm';

const WorkingMemoryPane = () => {
  const { state, dispatch } = useContext(AppContext);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    if (!initializing) return;
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

      setInitializing(false);
    };
    fetchData();
  }, [initializing]);

  const [workingMemoryFormState, workingMemoryFormDispatch] = useReducer(
    workingMemoryReducer,
    INITIAL_WORKING_MEMORY_FORM_STATE
  );

  useEffect(() => {
    const workingMemoryFormState = buildWorkingMemoryFormState(state);
    workingMemoryFormDispatch(workingMemoryFormState);
  }, [state.audioContext, state.workingMemory]);

  return (
    <WorkingMemoryForm
      state={workingMemoryFormState}
      dispatch={workingMemoryFormDispatch}
    />
  );
};

export default WorkingMemoryPane;
