import * as R from 'ramda';
import React, { useContext, useEffect, useState } from 'react';
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
    // local の存在は無視
    // 毎回 storage から blob を作成
    const fetchData = async () => {
      if (!state.audioContext) return;

      if (!state.recordVoice.raw.storagePath) {
        setBlob(null);
        return;
      }
      const blob = await getBlobFromStorage(state.recordVoice.raw.storagePath);
      setBlob(blob);
      if (!blob) return;

      let updatedState = state;
      const audioBuffer = await blobToAudioBuffer(blob, state.audioContext);
      if (!!audioBuffer) {
        updatedState = R.assocPath<AudioBuffer, State>(
          ['audioBuffers', state.recordVoice.raw.storagePath],
          audioBuffer
        )(state);
      } else {
        updatedState = R.dissocPath<State>([
          'audioBuffers',
          state.recordVoice.raw.storagePath,
        ])(state);
      }
      dispatch({ type: ActionTypes.setState, payload: updatedState });
    };
    fetchData();
  }, [state.recordVoice.raw.storagePath, state.audioContext]);

  /**
   * rawPitchStr の初期値設定
   */
  useEffect(() => {
    const remoteValue = state.recordVoice.raw.pitchStr;
    // リモートが空の場合
    if (!remoteValue) {
      setRawPitchStr('');
      return;
    }
    // ローカルが空では無い場合、代入しない
    if (!!rawPitchStr) return;
    setRawPitchStr(remoteValue);
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
