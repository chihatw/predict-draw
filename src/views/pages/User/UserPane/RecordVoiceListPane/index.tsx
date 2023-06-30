import { Container } from '@mui/material';
import * as R from 'ramda';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../../../App';
import { State } from '../../../../../Model';
import { ActionTypes } from '../../../../../Update';
import { getAudioBufferFromStorage } from '../../../../../services/utils';
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
    const paths: string[] = [];
    for (const asset of Object.values(state.recordVoice.assets)) {
      paths.push(asset.storagePath);
    }

    const filteredPaths = paths.filter((path) =>
      Object.keys(state.audioBuffers).includes(path)
    );

    if (paths.length === filteredPaths.length) {
      console.log('already has Assets AudioBuffers');
      return;
    }

    const fetchData = async () => {
      const remoteAudioBuffers: { [path: string]: AudioBuffer } = {};
      await Promise.all(
        paths.map(async (path) => {
          if (!state.audioContext) return;

          const localAudioBuffer = state.audioBuffers[path];
          if (!localAudioBuffer) {
            const gotAudioBuffer = await getAudioBufferFromStorage(
              path,
              state.audioContext
            );
            if (gotAudioBuffer) {
              remoteAudioBuffers[path] = gotAudioBuffer;
            }
          }
        })
      );

      const updatedState = R.assocPath<{ [id: string]: AudioBuffer }, State>(
        ['audioBuffers'],
        { ...state.audioBuffers, ...remoteAudioBuffers }
      )(state);
      dispatch({ type: ActionTypes.setState, payload: updatedState });
    };
    fetchData();
  }, [state.recordVoice.assets, state.audioContext]);

  if (!state.audioContext) return <TouchMe />;
  return (
    <Container maxWidth='xs'>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'grid', rowGap: 24, flexBasis: 320 }}>
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
