import { Button } from '@mui/material';
import * as R from 'ramda';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../../App';
import { State } from '../../../../Model';
import { setRecordVoiceParams } from '../../../../services/recordVoice';
import { getAudioBufferFromStorage } from '../../../../services/utils';
import { ActionTypes } from '../../../../Update';
import RecordVoiceAssetRow from './RecordVoiceAssetRow';

const RecordVoiceAssetsPane = () => {
  const { state, dispatch } = useContext(AppContext);
  const [activeIds, setActiveIds] = useState<string[]>([]);

  /**
   * activeIds の取得
   */
  useEffect(() => {
    const remoteValues = state.recordVoice.params.activeIds;
    if (!remoteValues.length) {
      setActiveIds([]);
    }
    if (!!activeIds.length) return;

    setActiveIds(remoteValues);
  }, [state.recordVoice.params.activeIds]);

  /** audioBuffers の取得 */
  useEffect(() => {
    const storagePaths: string[] = [];
    for (const asset of Object.values(state.recordVoice.assets)) {
      storagePaths.push(asset.storagePath);
    }
    const { audioBuffers, storagePathsToGetAudioBufferFromStorage } =
      checkAudioBuffer(storagePaths, state.audioBuffers);

    if (!storagePathsToGetAudioBufferFromStorage.length) {
      console.log('already has Assets AudioBuffers');
      return;
    }

    const fetchData = async () => {
      await Promise.all(
        storagePathsToGetAudioBufferFromStorage.map(async (storagePath) => {
          if (!state.audioContext) return;
          const audioBuffer = await getAudioBufferFromStorage(
            storagePath,
            state.audioContext
          );
          if (audioBuffer) {
            audioBuffers[storagePath] = audioBuffer;
          }
        })
      );

      const updatedState = R.assocPath<{ [id: string]: AudioBuffer }, State>(
        ['audioBuffers'],
        { ...state.audioBuffers, ...audioBuffers }
      )(state);
      dispatch({ type: ActionTypes.setState, payload: updatedState });
    };
    fetchData();
  }, [state.recordVoice.assets, state.audioContext]);

  const selectAsset = (id: string) => {
    let updatedActiveIds = [...activeIds];
    if (activeIds.includes(id)) {
      updatedActiveIds = updatedActiveIds.filter((item) => item !== id);
    } else {
      updatedActiveIds.push(id);
    }
    setActiveIds(updatedActiveIds);
    const updatedParams = {
      ...state.recordVoice.params,
      activeIds: updatedActiveIds,
    };
    setRecordVoiceParams(updatedParams);
  };

  const clearActiveIds = () => {
    setActiveIds([]);
    const updatedParams = {
      ...state.recordVoice.params,
      activeIds: [],
    };
    setRecordVoiceParams(updatedParams);
  };
  return (
    <div style={{ display: 'grid', rowGap: 8 }}>
      {Object.values(state.recordVoice.assets).map((asset, index) => (
        <RecordVoiceAssetRow
          key={index}
          asset={asset}
          index={activeIds.indexOf(asset.id)}
          handleClick={() => selectAsset(asset.id)}
        />
      ))}
      <Button
        variant='contained'
        sx={{ color: 'white' }}
        size='small'
        onClick={clearActiveIds}
      >
        Clear
      </Button>
    </div>
  );
};

export default RecordVoiceAssetsPane;

export const checkAudioBuffer = (
  storagePaths: string[],
  audioBuffers: { [id: string]: AudioBuffer }
) => {
  const _audioBuffers: { [path: string]: AudioBuffer } = {};
  const storagePathsToGetAudioBufferFromStorage: string[] = [];

  for (const storagePath of storagePaths) {
    const audioBuffer = audioBuffers[storagePath];
    if (audioBuffer) {
      _audioBuffers[storagePath] = audioBuffer;
    } else {
      storagePathsToGetAudioBufferFromStorage.push(storagePath);
    }
  }
  return {
    audioBuffers: _audioBuffers,
    storagePathsToGetAudioBufferFromStorage,
  };
};
