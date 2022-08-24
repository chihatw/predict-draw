import { Button } from '@mui/material';
import React from 'react';
import { WorkingMemoryFormState } from '../Model';

const NextButton = ({
  state,
  dispatch,
}: {
  state: WorkingMemoryFormState;
  dispatch: React.Dispatch<WorkingMemoryFormState>;
}) => {
  const handleClick = () => {
    const updatedState: WorkingMemoryFormState = {
      ...state,
      currentIndex: state.currentIndex + 1,
    };
    dispatch(updatedState);
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 80 }}>
      <Button
        sx={{ color: 'white', width: 240 }}
        variant='contained'
        onClick={handleClick}
      >
        記住了
      </Button>
    </div>
  );
};

export default NextButton;
