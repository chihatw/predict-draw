import * as R from 'ramda';

import { Container } from '@mui/material';
import { useContext, useEffect } from 'react';
import { getAudioBufferFromStorage } from '../../../../services/utils';
import { AppContext } from '../../../../App';
import TouchMe from '../RandomWorkoutPane/RecordingPane/TouchMe';
import { State } from '../../../../Model';
import PlayAudioPane from './PlayAudioPane';
import { ActionTypes } from '../../../../Update';
import TargetPitchPane from './TargetPitchPane';
import RecordVoiceButton from './RecordVoiceButton';

export const RAW_STORAGE_PATH = '/recordVoice/raw';

const MicTestPane = () => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    const storagePath = state.recordVoice.raw.storagePath;
    if (!storagePath) return;

    // ローカルの存在を確認
    const audioBuffer: AudioBuffer | null = state.audioBuffers[storagePath];
    if (!!audioBuffer) {
      console.log(`already has audioBuffer of "${storagePath}"`);
      return;
    }

    // ローカルに無い場合、ストレージから取得
    const fetchData = async () => {
      if (!state.audioContext) return;
      const audioBuffer = await getAudioBufferFromStorage(
        storagePath,
        state.audioContext
      );

      let updatedState = state;
      if (audioBuffer) {
        updatedState = R.assocPath<AudioBuffer, State>(
          ['audioBuffers', RAW_STORAGE_PATH],
          audioBuffer
        )(state);
      } else {
        updatedState = R.dissocPath<State>(['audioBuffers', RAW_STORAGE_PATH])(
          state
        );
      }
      dispatch({ type: ActionTypes.setState, payload: updatedState });
    };
    fetchData();
  }, [
    state.audioBuffers,
    state.audioContext,
    state.recordVoice.raw.storagePath,
  ]);

  if (!state.audioContext) {
    return <TouchMe />;
  }

  return (
    <Container maxWidth='sm'>
      <div style={{ display: 'grid', paddingTop: 80, rowGap: 40 }}>
        <div>
          <TargetPitchPane />
          <RecordVoiceButton />
        </div>
        <PlayAudioPane />
      </div>
    </Container>
  );
};

export default MicTestPane;
