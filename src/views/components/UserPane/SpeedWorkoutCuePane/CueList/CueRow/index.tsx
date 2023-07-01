import { Check } from '@mui/icons-material';
import { Button, Collapse } from '@mui/material';
import { RootState } from 'main';
import { useSelector } from 'react-redux';
import CueCell from './CueCell';

const CueRow = ({
  index,
  isActive,
  handleClick,
  itemTempId,
}: {
  index: number;
  isActive: boolean;
  handleClick: () => void;
  itemTempId: string;
}) => {
  const { selectedId, checkedIndexes } = useSelector(
    (state: RootState) => state.speedWorkoutParams
  );
  const speedWorkout = useSelector(
    (state: RootState) => state.speedWorkouts.entities[selectedId]
  );

  const isChecked = checkedIndexes.includes(index);

  if (!speedWorkout) return <></>;

  return (
    <Collapse in={!isChecked || isActive}>
      <Button
        fullWidth
        sx={{
          color: '#555',
          padding: '8px 16px',
          textAlign: 'left',
          margin: '8px 0',
        }}
        disabled={isChecked}
        onClick={handleClick}
      >
        <div
          style={{
            display: 'grid',
            rowGap: 4,
            flexGrow: 1,
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <CueCell itemTempId={itemTempId} isActive={isActive} />
            <Check sx={{ color: isChecked ? '#52a2aa' : '#eee' }} />
          </div>
        </div>
      </Button>
    </Collapse>
  );
};

export default CueRow;
