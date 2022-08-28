import React, { useContext, useEffect, useReducer, useState } from 'react';
import { AppContext } from '../../../../App';
import { State } from '../../../../Model';
import { getBlob } from '../../../../services/utils';
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
      if (state.blobs[state.workingMemory.storagePath]) {
        _blob = state.blobs[state.workingMemory.storagePath];
      } else {
        _blob = await getBlob(state.workingMemory.storagePath);
      }
      const updatedBlobs = { ...state.blobs };
      if (_blob) {
        updatedBlobs[state.workingMemory.storagePath] = _blob;
      }
      const updatedState: State = { ...state, blobs: updatedBlobs };
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
