import { IRecordVoiceParams } from 'application/recordVoiceParms/core/0-interface';
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import React, { useEffect } from 'react';
import { db } from '../infrastructure/firebase';
import { VoiceProps } from '../Model';
import { Action, ActionTypes } from '../Update';

const COLLECTIONS = {
  recordVoice: 'recordVoice',
  recordVoiceAssets: 'recordVoiceAssets',
};

export const useRecordVoice = async (dispatch: React.Dispatch<Action>) => {
  useEffect(() => {
    const unsubRaw = onSnapshot(
      doc(db, COLLECTIONS.recordVoice, 'raw'),
      (doc) => {
        console.log('snapshot recordVoiceRow');
        if (!doc.exists()) return;
        const recordVoiceRaw = buildRecordVoice(doc);
        dispatch({
          type: ActionTypes.setRecordVoiceRaw,
          payload: recordVoiceRaw,
        });
      }
    );
    const unsubAssets = onSnapshot(
      collection(db, COLLECTIONS.recordVoiceAssets),
      (querySnapshot) => {
        console.log('snapshot recordVoiceAssets');
        const recordVoiceAssets: { [id: string]: VoiceProps } = {};
        querySnapshot.forEach((doc) => {
          recordVoiceAssets[doc.id] = buildRecordVoice(doc);
        });
        dispatch({
          type: ActionTypes.setRecordVoiceAssets,
          payload: recordVoiceAssets,
        });
      }
    );
    const unsubParams = onSnapshot(
      doc(db, COLLECTIONS.recordVoice, 'params'),
      (doc) => {
        console.log('snapshot recordVoiceParams');
        if (!doc.exists()) return;
        const params = buildRecordVoiceParams(doc);
        dispatch({
          type: ActionTypes.setRecordVoiceParams,
          payload: params,
        });
      }
    );
    const unsubLogs = onSnapshot(
      doc(db, COLLECTIONS.recordVoice, 'logs'),
      (doc) => {
        console.log('snapshot recordVoiceLogs');
        if (!doc.exists()) return;
        const logs = buildRecordVoiceLogs(doc);
        dispatch({
          type: ActionTypes.setRecordVoiceLogs,
          payload: logs,
        });
      }
    );
    return () => {
      unsubRaw();
      unsubAssets();
      unsubParams();
      unsubLogs();
    };
  }, []);
};

export const updateRowPitchStr = (pitchStr: string) => {
  console.log('set recordVoiceRaw');
  updateDoc(doc(db, COLLECTIONS.recordVoice, 'raw'), { pitchStr });
};

export const setRecordVoiceAsset = (recordVoice: VoiceProps) => {
  console.log('set recordVoiceAsset');
  setDoc(doc(db, COLLECTIONS.recordVoiceAssets, recordVoice.id), recordVoice);
};

export const deleteRecordVoiceAsset = (id: string) => {
  console.log('delete recordVoiceAsset');
  deleteDoc(doc(db, COLLECTIONS.recordVoiceAssets, id));
};

export const setRecordVoiceParams = (params: IRecordVoiceParams) => {
  console.log('set recordVoiceParams');
  setDoc(doc(db, COLLECTIONS.recordVoice, 'params'), params);
};

export const setRecordVoiceLogs = (logs: { selected: string }) => {
  console.log('set recordVoiceParams');
  setDoc(doc(db, COLLECTIONS.recordVoice, 'logs'), logs);
};

const buildRecordVoice = (doc: DocumentData): VoiceProps => {
  const { startAt, stopAt, pitchStr } = doc.data();
  return {
    id: doc.id,
    stopAt: stopAt || 0,
    startAt: startAt || 0,
    pitchStr: pitchStr || '',
  };
};

const buildRecordVoiceParams = (doc: DocumentData): IRecordVoiceParams => {
  const { rawPitchStr, hasVoice, recordedPitchStr } = doc.data();
  return {
    rawPitchStr: rawPitchStr || '',
    recordedPitchStr: recordedPitchStr || '',
  };
};
const buildRecordVoiceLogs = (doc: DocumentData): { selected: string } => {
  const { selected } = doc.data();
  return {
    selected: selected || '',
  };
};
