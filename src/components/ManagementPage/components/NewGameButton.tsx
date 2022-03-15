import { Button } from '@mui/material';
import { useContext } from 'react';
import AppContext from '../../../services/context';

const NewGameButton = () => {
  const { updatePredict, updateNewGameAt } = useContext(AppContext);
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
