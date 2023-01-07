import { Checkbox } from '@mui/material';
import { useContext } from 'react';
import { AppContext } from '../../../../App';

const TopicNiHeadRow = ({
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
      <span style={{ background: 'yellow' }}>青</span>
      <span>に</span>
      <span style={{ color: 'red' }}>は</span>
      <span>赤を</span>
      <span>入れる／入れない</span>
    </>
  );
};

export default TopicNiHeadRow;
