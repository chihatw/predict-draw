import React, { useContext, useEffect, useReducer } from 'react';
import AppContext from '../../../../services/context';
import { buildWorkingMemoryFormState } from '../../../../services/workingMemoryWorkout';
import { INITIAL_WORKING_MEMORY_FORM_STATE } from './Model';
import { workingMemoryReducer } from './Update';
import WorkingMemoryForm from './WorkingMemoryForm';

const WorkingMemoryPane = () => {
  const { state } = useContext(AppContext);

  const [workingMemoryFormState, workingMemoryFormDispatch] = useReducer(
    workingMemoryReducer,
    INITIAL_WORKING_MEMORY_FORM_STATE
  );

  useEffect(() => {
    const workingMemoryFormState = buildWorkingMemoryFormState(state);
    console.log({ workingMemoryFormState });
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
