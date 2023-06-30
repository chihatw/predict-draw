import { Button } from '@mui/material';
import * as R from 'ramda';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../..';
import { State, VoiceProps } from '../../../../../Model';
import { ActionTypes } from '../../../../../Update';
import { PITCH_ORDERS } from '../../../../../constants';
import { setRecordVoiceParams } from '../../../../../services/recordVoice';
import { getAudioBufferFromStorage } from '../../../../../services/utils';
import RecordVoiceAssetRow from './RecordVoiceAssetRow';

const RecordVoiceAssetsPane = () => {
  const { state, dispatch } = useContext(AppContext);
  const [activeIds, setActiveIds] = useState<string[]>([]);
  const [targetAssetId, setTargetAssetId] = useState('');
  const [assets, setAssets] = useState<VoiceProps[]>([]);

  useEffect(() => {
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
    const paths: string[] = [];
    for (const asset of Object.values(state.recordVoice.assets)) {
      paths.push(asset.storagePath);
    }

    const filteredPaths = paths.filter((path) =>
      Object.keys(state.audioBuffers).includes(path)
    );
    console.log(state.recordVoice.assets);
    console.log(paths.length, filteredPaths.length);
    if (paths.length === filteredPaths.length) {
      console.log('already has Assets AudioBuffers');
      return;
    }

    const fetchData = async () => {
      const remoteAudioBuffers: { [path: string]: AudioBuffer } = {};
      await Promise.all(
        paths.map(async (path) => {
          const localAudioBuffer = state.audioBuffers[path];
          if (!localAudioBuffer) {
            const gotAudioBuffer = await getAudioBufferFromStorage(path);
            if (gotAudioBuffer) {
              remoteAudioBuffers[path] = gotAudioBuffer;
            }
          }
        })
      );
      if (!Object.keys(remoteAudioBuffers).length) return;

      const updatedState = R.assocPath<{ [id: string]: AudioBuffer }, State>(
        ['audioBuffers'],
        { ...state.audioBuffers, ...remoteAudioBuffers }
      )(state);
      dispatch({ type: ActionTypes.setState, payload: updatedState });
    };
    fetchData();
  }, [state.recordVoice.assets]);

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
    <div>
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
    </div>
  );
};

export default RecordVoiceAssetsPane;
