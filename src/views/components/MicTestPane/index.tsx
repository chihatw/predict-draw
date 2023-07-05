import * as R from 'ramda';

import { Container } from '@mui/material';
import { useContext, useEffect } from 'react';
import { AppContext } from '../..';
import { State } from '../../../Model';
import { ActionTypes } from '../../../Update';
import { getAudioBufferFromStorage } from '../../../services/utils';

import { RECORD_VOICE_STORAGE_PATH } from 'application/recordVoiceParms/core/1-constants';
import PlayAudioPane from './PlayAudioPane';
import RecordVoiceButton from './RecordVoiceButton';
import TargetPitchPane from './TargetPitchPane';

export const RAW_STORAGE_PATH = '/recordVoice/raw';

const MicTestPane = () => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    const storagePath = RECORD_VOICE_STORAGE_PATH + 'raw';

    // ローカルの存在を確認
    const audioBuffer: AudioBuffer | null = state.audioBuffers[storagePath];
    if (!!audioBuffer) {
      console.log(`already has audioBuffer of "${storagePath}"`);
      return;
    }

    // ローカルに無い場合、ストレージから取得
    const fetchData = async () => {
      const audioBuffer = await getAudioBufferFromStorage(storagePath);

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
  }, [state.audioBuffers]);

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
