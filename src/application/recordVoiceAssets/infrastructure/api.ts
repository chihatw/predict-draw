import { db } from '@/infrastructure/firebase';
import { Dictionary } from '@reduxjs/toolkit';
import {
    DocumentData,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    setDoc,
    updateDoc,
} from 'firebase/firestore';
import _ from 'lodash';
import { IRecordVoiceAsset } from '../core/0-interface';

const COLLECTION = 'recordVoiceAssets';

export const listenRecordVoiceAssets = (
  localRecordVoiceAssets: Dictionary<IRecordVoiceAsset>,
  callback: (value: IRecordVoiceAsset[]) => void
) => {
  return onSnapshot(collection(db, COLLECTION), (snapshot) => {
    console.log(`%cfetched ${COLLECTION}`, 'color:red');
    const recordVoiceAssets: IRecordVoiceAsset[] = [];
    snapshot.forEach((doc) => {
      const recordVoiceAsset = buildRecordVoiceAsset(doc);
      recordVoiceAssets.push(recordVoiceAsset);
    });

    if (!isEqual(localRecordVoiceAssets, recordVoiceAssets)) {
      callback(recordVoiceAssets);
    }
  });
};

export const changePitchStr = (id: string, pitchStr: string) => {
  console.log(`%cupdate ${COLLECTION}`, 'color:red');
  updateDoc(doc(db, COLLECTION, id), { pitchStr });
};

export const changeStartAt = (id: string, startAt: number) => {
  console.log(`%cupdate ${COLLECTION}`, 'color:red');
  updateDoc(doc(db, COLLECTION, id), { startAt });
};

export const changeStopAt = (id: string, stopAt: number) => {
  console.log(`%cupdate ${COLLECTION}`, 'color:red');
  updateDoc(doc(db, COLLECTION, id), { stopAt });
};

export const addOne = (asset: IRecordVoiceAsset) => {
  setDoc(doc(db, COLLECTION, asset.id), asset);
};

export const deleteOne = (id: string) => {
  console.log(`%cdelete ${COLLECTION}`, 'color:red');
  deleteDoc(doc(db, COLLECTION, id));
};

const buildRecordVoiceAsset = (doc: DocumentData) => {
  const { startAt, pitchStr, stopAt } = doc.data();
  const recordVoiceAsset: IRecordVoiceAsset = {
    id: doc.id,
    startAt: startAt || 0,
    pitchStr: pitchStr || '',
    stopAt: stopAt || 0,
  };
  return recordVoiceAsset;
};

const isEqual = (
  locals: Dictionary<IRecordVoiceAsset>,
  remotes: IRecordVoiceAsset[]
) => {
  for (const remote of remotes) {
    const local = locals[remote.id];
    if (!local) {
      return false;
    }
    if (!_.isEqual(local, remote)) {
      return false;
    }
    return true;
  }
};
