import React from 'react';
import { Button } from '@mui/material';

import usePredict from '../../../services/usePredict';

const NewGameButton = () => {
  const { updatePredict, updateNewGameAt } = usePredict();
  const handleNewGame = () => {
    updateNewGameAt();
    updatePredict('');
  };
  return (
    <Button variant='contained' color='secondary' onClick={handleNewGame}>
      new game
    </Button>
  );
};

export default NewGameButton;
