import * as R from 'ramda';

import { TextField } from '@mui/material';
import { IRecordVoiceParams } from 'application/recordVoiceParms/core/0-interface';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../..';
import { setRecordVoiceParams } from '../../../../services/recordVoice';

const TargetPitchPane = () => {
  const { state } = useContext(AppContext);
  const [input, setInput] = useState('');
  /**
   * targetPitchStr の初期値設定
   */
  useEffect(() => {
    const remoteValue = state.recordVoice.params.rawPitchStr;
    // リモートが空の場合
    if (!remoteValue) {
      setInput('');
      return;
    }
    // ローカルが空では無い場合、代入しない
    if (!!input) return;

    setInput(remoteValue);
  }, [state.recordVoice.params.rawPitchStr]);

  const handleChangeInput = (input: string) => {
    setInput(input);
    const updatedRecordVoiceParams = R.assocPath<string, IRecordVoiceParams>(
      ['targetPitchStr'],
      input
    )(state.recordVoice.params);
    setRecordVoiceParams(updatedRecordVoiceParams);
  };
  return (
    <TextField
      size='small'
      value={input}
      label='rawPitchStr'
      onChange={(e) => handleChangeInput(e.target.value)}
      autoComplete='off'
    />
  );
};

export default TargetPitchPane;
