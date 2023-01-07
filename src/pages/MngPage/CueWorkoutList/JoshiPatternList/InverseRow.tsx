import { Checkbox } from '@mui/material';
import { useContext } from 'react';
import { AppContext } from '../../../../App';

const InverseRow = ({
  value,
  handleClick,
}: {
  value: string;
  handleClick: () => void;
}) => {
  const { state } = useContext(AppContext);

  return (
    <>
      <Checkbox
        size='small'
        checked={state.cueWorkout.params.joshiPatterns.includes(value)}
        onChange={handleClick}
      />
      <span>赤に青を</span>
      <span>入れる／入れない</span>
    </>
  );
};

export default InverseRow;
