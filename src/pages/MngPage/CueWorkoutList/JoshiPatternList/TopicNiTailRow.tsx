import { Checkbox } from '@mui/material';
import { useContext } from 'react';
import { AppContext } from '../../../../App';

const TopicNiTailRow = ({
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
      <span>赤を</span>
      <span style={{ background: 'yellow' }}>青</span>
      <span>に</span>
      <span style={{ color: 'red' }}>は</span>
      <span>入れる／入れない</span>
    </>
  );
};

export default TopicNiTailRow;
