import { PlayArrow } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import SentencePitchLine from 'views/components/SentencePitchLine';
import { Schedule } from '../../../../../../Model';
import { playScheduledItem } from '../../../../../../pitchInputItems';
import { PitchInputFormState } from '../../Model';

const PitchInputResultCell = ({
  isCorrect,
  cueId,
  state,
  schedules,
}: {
  isCorrect?: boolean;
  cueId: string;
  schedules: Schedule[];
  state: PitchInputFormState;
}) => {
  if (typeof isCorrect === 'undefined') {
    isCorrect = true;
  }
  const handleClickPlay = (schedules: Schedule[]) => {
    if (!state.audioBuffer || !state.audioContext) return;
    playScheduledItem(schedules, state.audioBuffer, state.audioContext);
  };
  return (
    <div
      style={{
        flexBasis: 100,
        display: 'flex',
        alignItems: 'center',
        borderRadius: 4,
        justifyContent: 'center',
        background: isCorrect ? 'transparent' : 'rgba(255,0,0,0.1)',
      }}
    >
      <SentencePitchLine pitchStr={cueId} />
      <IconButton
        sx={{ color: '#52a2aa' }}
        onClick={() => handleClickPlay(schedules)}
      >
        <PlayArrow />
      </IconButton>
    </div>
  );
};

export default PitchInputResultCell;
