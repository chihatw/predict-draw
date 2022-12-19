import * as R from 'ramda';
import { PlayArrow } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../App';
import {
  INITIAL_VOICE_PROPS,
  RecordVoiceParams,
  State,
  VoiceProps,
} from '../../../Model';
import {
  createSourceNode,
  getAudioBufferFromStorage,
} from '../../../services/utils';
import { ActionTypes } from '../../../Update';
import {
  setRecordVoiceParams,
  setRecordVoiceRaw,
} from '../../../services/recordVoice';
import Delete from '@mui/icons-material/Delete';
import { deleteStorage } from '../../../repositories/storage';

const RecordVoiceRawPane = () => {
  const { state, dispatch } = useContext(AppContext);
  const recordVoiceRaw = state.recordVoice.raw;
  const recordVoiceParams = state.recordVoice.params;
  const recordVoiceLogs = state.recordVoice.logs;
  const [targetPitchStr, setTargetPitchStr] = useState(
    recordVoiceParams.targetPitchStr
  );

  const [input, setInput] = useState(recordVoiceRaw.pitchStr);
  const audioBuffer = state.audioBuffers[recordVoiceRaw.storagePath];
  /**
   * recordVoiceRaw を見て、state.audioBuffer を更新する
   */
  useEffect(() => {
    const fetchData = async () => {
      if (!state.audioContext) return;
      const storagePath = state.recordVoice.raw.storagePath;
      if (!storagePath) return;
      let recordVoiceRawAudioBuffer: AudioBuffer | null = null;
      recordVoiceRawAudioBuffer = await getAudioBufferFromStorage(
        storagePath,
        state.audioContext
      );
      if (!!recordVoiceRawAudioBuffer) {
        const updatedState = R.assocPath<AudioBuffer, State>(
          ['audioBuffers', storagePath],
          recordVoiceRawAudioBuffer
        )(state);
        dispatch({ type: ActionTypes.setState, payload: updatedState });
      }
    };
    fetchData();
  }, [state.recordVoice.raw, state.audioContext]);

  const handleChangeTargetPitchStr = (pitchStr: string) => {
    setTargetPitchStr(pitchStr);
    const updatedRecordVoiceParams = R.assocPath<string, RecordVoiceParams>(
      ['targetPitchStr'],
      pitchStr
    )(recordVoiceParams);
    setRecordVoiceParams(updatedRecordVoiceParams);
    const updatedState = R.assocPath<RecordVoiceParams, State>(
      ['recordVoice', 'params'],
      updatedRecordVoiceParams
    )(state);
    dispatch({ type: ActionTypes.setState, payload: updatedState });
  };

  const handleChangePitchStr = (pitchStr: string) => {
    setInput(pitchStr);
    const updatedRecordVoiceRaw = R.assocPath<string, VoiceProps>(
      ['pitchStr'],
      pitchStr
    )(recordVoiceRaw);
    setRecordVoiceRaw(updatedRecordVoiceRaw);
    const updatedState = R.assocPath<VoiceProps, State>(
      ['recordVoice', 'raw'],
      updatedRecordVoiceRaw
    )(state);
    dispatch({ type: ActionTypes.setState, payload: updatedState });
  };

  const play = () => {
    if (!state.audioContext) return;
    const sourceNode = createSourceNode(audioBuffer, state.audioContext);
    sourceNode.start();
  };

  const deleteRecordVoiceRaw = () => {
    setInput('');
    deleteStorage(recordVoiceRaw.storagePath);
    const initialRecordVoiceRaw = {
      ...INITIAL_VOICE_PROPS,
      id: 'raw',
    };
    setRecordVoiceRaw(initialRecordVoiceRaw);
    const updatedState = R.assocPath<VoiceProps, State>(
      ['recordVoice', 'raw'],
      initialRecordVoiceRaw
    )(state);
    dispatch({ type: ActionTypes.setState, payload: updatedState });
  };

  const date = new Date(Number(recordVoiceLogs.selected));
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const dateStr = `${minute}:${second}`;

  return (
    <div style={{ display: 'grid', rowGap: 8 }}>
      <TextField
        size='small'
        value={targetPitchStr}
        label='targetPitchStr'
        onChange={(e) => handleChangeTargetPitchStr(e.target.value)}
        autoComplete='off'
      />
      <div style={{ display: 'flex', alignItems: 'center', columnGap: 8 }}>
        {audioBuffer && (
          <IconButton size='small' onClick={play}>
            <PlayArrow />
          </IconButton>
        )}
        <TextField
          sx={{ flexGrow: 1 }}
          size='small'
          autoComplete='off'
          label='pitchStr'
          value={input}
          onChange={(e) => handleChangePitchStr(e.target.value)}
        />
        <IconButton size='small' onClick={deleteRecordVoiceRaw}>
          <Delete />
        </IconButton>
      </div>
      <div>{`touchedAt: ${dateStr}`}</div>
    </div>
  );
};

export default RecordVoiceRawPane;
