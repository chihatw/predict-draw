import Check from '@mui/icons-material/Check';
import { IconButton } from '@mui/material';

const RecordVoiceAssetSelectTarget = ({
  isTarget,
  selectTarget,
}: {
  isTarget: boolean;
  selectTarget: () => void;
}) => {
  return (
    <IconButton
      sx={{ color: isTarget ? '#52a2aa' : 'grey' }}
      onClick={selectTarget}
    >
      <Check />
    </IconButton>
  );
};

export default RecordVoiceAssetSelectTarget;
