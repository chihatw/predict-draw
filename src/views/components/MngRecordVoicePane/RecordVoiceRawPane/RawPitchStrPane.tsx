import { TextField } from '@mui/material';
import { useContext } from 'react';
import { AppContext } from '../../..';

import { updateRowPitchStr } from '../../../../services/recordVoice';

const RawPitchStrPane = ({
  rawPitchStr,
  setRawPitchStr,
}: {
  rawPitchStr: string;
  setRawPitchStr: (input: string) => void;
}) => {
  const { state } = useContext(AppContext);

  const handleChangeRawPitchStr = (pitchStr: string) => {
    setRawPitchStr(pitchStr);
    updateRowPitchStr(pitchStr);
  };
  return (
    <TextField
      sx={{ flexGrow: 1 }}
      size='small'
      value={rawPitchStr}
      label='rawPitchStr'
      onChange={(e) => handleChangeRawPitchStr(e.target.value)}
      autoComplete='off'
    />
  );
};

export default RawPitchStrPane;