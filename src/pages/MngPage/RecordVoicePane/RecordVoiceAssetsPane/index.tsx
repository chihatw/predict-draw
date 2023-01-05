import { Button } from '@mui/material';
import * as R from 'ramda';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../../App';
import { PITCH_ORDERS } from '../../../../constants';
import { State, VoiceProps } from '../../../../Model';
import { setRecordVoiceParams } from '../../../../services/recordVoice';
import { getAudioBufferFromStorage } from '../../../../services/utils';
import { ActionTypes } from '../../../../Update';
import RecordVoiceAssetRow from './RecordVoiceAssetRow';

const RecordVoiceAssetsPane = () => {
  const { state, dispatch } = useContext(AppContext);
  const [activeIds, setActiveIds] = useState<string[]>([]);
  const [targetAssetId, setTargetAssetId] = useState('');
  const [assets, setAssets] = useState<VoiceProps[]>([]);

  useEffect(() => {
    console.log(state.recordVoice.assets);
    setAssets(
      Object.values(state.recordVoice.assets).sort(
        (a, b) =>
          PITCH_ORDERS.indexOf(a.pitchStr) - PITCH_ORDERS.indexOf(b.pitchStr)
      )
    );
  }, [state.recordVoice.assets]);

  /**
   * activeIds の取得
   */
  useEffect(() => {
    const remoteValues = state.recordVoice.params.activeIds;
    if (!remoteValues.length) {
      setActiveIds([]);
      return;
    }
    if (!!activeIds.length) return;

    setActiveIds(remoteValues);
  }, [state.recordVoice.params.activeIds]);

  /**
   * targetAssetId の取得
   */
  useEffect(() => {
    const remoteValue = state.recordVoice.params.targetAssetId;
    if (!remoteValue) {
      setTargetAssetId('');
      return;
    }
    if (!!targetAssetId) return;
    setTargetAssetId(remoteValue);
  }, [state.recordVoice.params.targetAssetId]);

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

  const selectTarget = (id: string) => {
    const updatedTargetAssetId = targetAssetId === id ? '' : id;
    setTargetAssetId(updatedTargetAssetId);
    const updatedParams = {
      ...state.recordVoice.params,
      targetAssetId: updatedTargetAssetId,
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
      {assets.map((asset, index) => (
        <RecordVoiceAssetRow
          key={index}
          asset={asset}
          isTarget={targetAssetId === asset.id}
          index={activeIds.indexOf(asset.id)}
          handleClick={() => selectAsset(asset.id)}
          selectTarget={() => selectTarget(asset.id)}
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
