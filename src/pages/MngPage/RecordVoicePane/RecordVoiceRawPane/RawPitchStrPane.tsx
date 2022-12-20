import * as R from 'ramda';
import { TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../../App';
import { VoiceProps } from '../../../../Model';

import { setRecordVoiceRaw } from '../../../../services/recordVoice';

const RawPitchStrPane = () => {
  const { state } = useContext(AppContext);
  const [input, setInput] = useState('');
  /**
   * rawPitchStr の初期値設定
   */
  useEffect(() => {
    const remoteValue = state.recordVoice.raw.pitchStr;
    // リモートが空の場合
    if (!remoteValue) {
      setInput('');
      return;
    }
    // ローカルが空では無い場合、代入しない
    if (!!input) return;

    setInput(remoteValue);
  }, [state.recordVoice.raw.pitchStr]);

  const handleChangePitchStr = (pitchStr: string) => {
    setInput(pitchStr);
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
      value={input}
      label='rawPitchStr'
      onChange={(e) => handleChangePitchStr(e.target.value)}
      autoComplete='off'
    />
  );
};

export default RawPitchStrPane;
