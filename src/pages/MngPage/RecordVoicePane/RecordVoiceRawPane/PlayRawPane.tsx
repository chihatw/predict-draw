import * as R from 'ramda';
import { PlayArrow } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../../../App';
import { State } from '../../../../Model';
import {
  createSourceNode,
  getAudioBufferFromStorage,
} from '../../../../services/utils';
import { ActionTypes } from '../../../../Update';

const PlayRawPane = () => {
  const { state, dispatch } = useContext(AppContext);
  const rawStoragePath = state.recordVoice.raw.storagePath;
  const audioBuffer = state.audioBuffers[rawStoragePath];

  /**
   * recordVoiceRaw を見て、state.audioBuffer を更新する
   */
  useEffect(() => {
    const fetchData = async () => {
      if (!state.audioContext) return;

      if (!rawStoragePath) return;
      let recordVoiceRawAudioBuffer: AudioBuffer | null = null;
      recordVoiceRawAudioBuffer = await getAudioBufferFromStorage(
        rawStoragePath,
        state.audioContext
      );
      if (!!recordVoiceRawAudioBuffer) {
        const updatedState = R.assocPath<AudioBuffer, State>(
          ['audioBuffers', rawStoragePath],
          recordVoiceRawAudioBuffer
        )(state);
        dispatch({ type: ActionTypes.setState, payload: updatedState });
      }
    };
    fetchData();
  }, [rawStoragePath, state.audioContext]);

  const play = () => {
    if (!state.audioContext) return;
    const sourceNode = createSourceNode(audioBuffer, state.audioContext);
    sourceNode.start();
  };
  if (!audioBuffer) return <></>;
  return (
    <IconButton size='small' onClick={play}>
      <PlayArrow />
    </IconButton>
  );
};

export default PlayRawPane;
