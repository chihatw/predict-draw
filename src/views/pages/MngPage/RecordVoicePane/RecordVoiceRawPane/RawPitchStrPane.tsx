import { TextField } from '@mui/material';
import * as R from 'ramda';
import { useContext } from 'react';
import { AppContext } from '../../../../../App';
import { VoiceProps } from '../../../../../Model';

import { setRecordVoiceRaw } from '../../../../../services/recordVoice';

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
    const updatedRecordVoiceRaw = R.assocPath<string, VoiceProps>(
      ['pitchStr'],
      pitchStr
    )(state.recordVoice.raw);
    setRecordVoiceRaw(updatedRecordVoiceRaw);
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
