import Check from '@mui/icons-material/Check';
import { IconButton } from '@mui/material';
import React from 'react';

const RecordVoiceAssetSelectButton = ({
  index,
  handleClick,
}: {
  index: number;
  handleClick: () => void;
}) => {
  return (
    <IconButton
      size='small'
      sx={{
        width: 32,
        color: index > -1 ? '#52a2aa' : 'gray',
      }}
      onClick={handleClick}
    >
      {index > -1 ? index + 1 : '-'}
    </IconButton>
  );
};

export default RecordVoiceAssetSelectButton;
