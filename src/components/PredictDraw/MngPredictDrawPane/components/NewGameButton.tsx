import React from 'react';
import { Button } from '@mui/material';

const NewGameButton = ({
  updatePredict,
  updateNewGameAt,
}: {
  updatePredict: (value: string) => void;
  updateNewGameAt: () => void;
}) => {
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
