import { RECORD_VOICE_STORAGE_PATH } from 'application/recordVoiceParms/core/1-constants';
import * as R from 'ramda';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../..';
import { State } from '../../../../Model';
import { ActionTypes } from '../../../../Update';
import {
  blobToAudioBuffer,
  getBlobFromStorage,
} from '../../../../services/utils';
import DeleteRawButton from './DeleteRawButton';
import PlayRawPane from './PlayRawPane';
import RawSaveAsAssetPane from './RawSaveAsAssetPane';
import RecordedPitchStrPane from './RecordedPitchStrPane';
import TargetPitchPane from './TargetPitchPane';

const RecordVoiceRawPane = () => {
  const { state, dispatch } = useContext(AppContext);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [rawPitchStr, setRawPitchStr] = useState('');

  /**
   * blob の初期設定
   */
  useEffect(() => {
    const path = RECORD_VOICE_STORAGE_PATH + 'raw';
    const fetchData = async () => {
      let updatedState = state;

      const remoteBlob = await getBlobFromStorage(path);
      setBlob(remoteBlob);
      // path から　blob が取得できなければ、終了
      if (!remoteBlob) {
        updatedState = R.dissocPath<State>(['audioBuffers', path])(state);
        dispatch({ type: ActionTypes.setState, payload: updatedState });
        return;
      }

      const remoteAudioBuffer = await blobToAudioBuffer(remoteBlob);

      if (!!remoteAudioBuffer) {
        updatedState = R.assocPath<AudioBuffer, State>(
          ['audioBuffers', path],
          remoteAudioBuffer
        )(state);
      } else {
        updatedState = R.dissocPath<State>(['audioBuffers', path])(state);
      }
      dispatch({ type: ActionTypes.setState, payload: updatedState });
    };
    fetchData();
  }, []);

  /**
   * rawPitchStr の初期値設定
   */
  useEffect(() => {
    const localValue = state.recordVoice.params.recordedPitchStr;
    // リモートが空の場合
    if (!localValue) {
      setRawPitchStr('');
      return;
    }
    // ローカルが空では無い場合、代入しない
    if (!!rawPitchStr) return;

    setRawPitchStr(localValue);
  }, [state.recordVoice.params.recordedPitchStr]);

  return (
    <div style={{ display: 'grid', rowGap: 8 }}>
      <TargetPitchPane />
      <div style={{ display: 'flex', alignItems: 'center', columnGap: 8 }}>
        <PlayRawPane />
        <RecordedPitchStrPane
          rawPitchStr={rawPitchStr}
          setRawPitchStr={setRawPitchStr}
        />
        <DeleteRawButton />
      </div>
      <RawSaveAsAssetPane blob={blob} rawPitchStr={rawPitchStr} />
    </div>
  );
};

export default RecordVoiceRawPane;
