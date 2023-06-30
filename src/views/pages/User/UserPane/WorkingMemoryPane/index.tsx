import { useContext, useEffect, useReducer, useState } from 'react';
import { AppContext } from '../../../../../App';
import { ActionTypes } from '../../../../../Update';
import { getUpdatedStateWithAssetPath } from '../../../../../services/utils';
import { buildWorkingMemoryFormState } from '../../../../../services/workingMemoryWorkout';
import downpitch_120 from '../../../../assets/audios/downpitch_120.mp3';
import { INITIAL_WORKING_MEMORY_FORM_STATE } from './Model';
import { workingMemoryReducer } from './Update';
import WorkingMemoryForm from './WorkingMemoryForm';

const WorkingMemoryPane = () => {
  const { state, dispatch } = useContext(AppContext);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    if (!initializing) return;
    const fetchData = async () => {
      const updatedState = await getUpdatedStateWithAssetPath(
        state,
        downpitch_120
      );
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
