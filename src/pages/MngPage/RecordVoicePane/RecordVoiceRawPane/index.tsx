import * as R from 'ramda';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../../App';
import { State } from '../../../../Model';
import {
  blobToAudioBuffer,
  getBlobFromStorage,
} from '../../../../services/utils';
import { ActionTypes } from '../../../../Update';
import DeleteRawButton from './DeleteRawButton';
import PlayRawPane from './PlayRawPane';
import RawPitchStrPane from './RawPitchStrPane';
import RawSaveAsAssetPane from './RawSaveAsAssetPane';
import TargetPitchPane from './TargetPitchPane';
import TouchedAtPane from './TouchedAtPane';

const RecordVoiceRawPane = () => {
  const { state, dispatch } = useContext(AppContext);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [rawPitchStr, setRawPitchStr] = useState('');

  /**
   * blob の初期設定
   */
  useEffect(() => {
    const path = state.recordVoice.raw.storagePath;

    // path が空の場合は終了
    if (!path) {
      setBlob(null);
      return;
    }

    // localAudioBuffer の存在は無視
    // 毎回 storage から blob を作成
    // const localAudioBuffer = state.audioBuffers[path]
    // if (!!localAudioBuffer) return;

    const fetchData = async () => {
      let updatedState = state;
      if (!state.audioContext) return;

      const remoteBlob = await getBlobFromStorage(path);
      setBlob(remoteBlob);
      // path から　blob が取得できなければ、終了
      if (!remoteBlob) {
        updatedState = R.dissocPath<State>(['audioBuffers', path])(state);
        dispatch({ type: ActionTypes.setState, payload: updatedState });
        return;
      }

      const remoteAudioBuffer = await blobToAudioBuffer(
        remoteBlob,
        state.audioContext
      );

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
  }, [state.recordVoice.raw.storagePath, state.audioContext]);

  /**
   * rawPitchStr の初期値設定
   */
  useEffect(() => {
    const localValue = state.recordVoice.raw.pitchStr;
    // リモートが空の場合
    if (!localValue) {
      setRawPitchStr('');
      return;
    }
    // ローカルが空では無い場合、代入しない
    if (!!rawPitchStr) return;

    setRawPitchStr(localValue);
  }, [state.recordVoice.raw.pitchStr]);

  return (
    <div style={{ display: 'grid', rowGap: 8 }}>
      <TargetPitchPane />
      <div style={{ display: 'flex', alignItems: 'center', columnGap: 8 }}>
        <PlayRawPane />
        <RawPitchStrPane
          rawPitchStr={rawPitchStr}
          setRawPitchStr={setRawPitchStr}
        />
        <DeleteRawButton />
      </div>
      <TouchedAtPane />
      <RawSaveAsAssetPane blob={blob} rawPitchStr={rawPitchStr} />
    </div>
  );
};

export default RecordVoiceRawPane;
