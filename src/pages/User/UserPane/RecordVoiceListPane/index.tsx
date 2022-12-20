import { Container } from '@mui/material';
import * as R from 'ramda';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../../App';
import { State } from '../../../../Model';
import { getAudioBufferFromStorage } from '../../../../services/utils';
import { ActionTypes } from '../../../../Update';
import { checkAudioBuffer } from '../../../MngPage/RecordVoicePane/RecordVoiceAssetsPane';
import TouchMe from '../RandomWorkoutPane/RecordingPane/TouchMe';
import PlayTargetButton from './PlayTargetButton';
import RecordVoiceRow from './RecordVoiceRow';

const RecordVoiceListPane = () => {
  const { state, dispatch } = useContext(AppContext);
  const [activeIds, setActiveIds] = useState<string[]>([]);
  const [targetAssetId, setTargetAssetId] = useState('');

  useEffect(() => {
    setActiveIds(state.recordVoice.params.activeIds);
  }, [state.recordVoice.params.activeIds]);

  useEffect(() => {
    setTargetAssetId(state.recordVoice.params.targetAssetId);
  }, [state.recordVoice.params.targetAssetId]);

  /**
   * assets の audioBuffers を取得
   */
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

  if (!state.audioContext) return <TouchMe />;
  return (
    <Container maxWidth='xs'>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          style={{ display: 'grid', rowGap: 24, marginTop: 16, flexBasis: 320 }}
        >
          <div style={{ height: 136, textAlign: 'center' }}>
            {!!targetAssetId && <PlayTargetButton id={targetAssetId} />}
          </div>
          {activeIds.map((id, index) => (
            <RecordVoiceRow key={index} id={id} index={index} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default RecordVoiceListPane;
