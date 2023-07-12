import { DocumentData, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from 'infrastructure/firebase';
import _ from 'lodash';
import { IRecordVoiceParams } from '../core/0-interface';

const COLLECTION = 'recordVoice';
const DOC_ID = 'params';

export const listenRecordVoiceParams = (
  localRecordVoiceParams: IRecordVoiceParams,
  callback: (value: IRecordVoiceParams) => void
) => {
  return onSnapshot(doc(db, COLLECTION, DOC_ID), (docSnapshot) => {
    const recordVoiceParams = buildRecordVoiceParams(docSnapshot);
    if (!_.isEqual(localRecordVoiceParams, recordVoiceParams)) {
      callback(recordVoiceParams);
    }
  });
};

export const changeRawPitchStr = (rawPitchStr: string) => {
  console.log(`%cupdate ${COLLECTION}`, 'color:red');
  updateDoc(doc(db, COLLECTION, DOC_ID), { rawPitchStr });
};

export const changeRecordedPitchStr = (recordedPitchStr: string) => {
  console.log(`%cupdate ${COLLECTION}`, 'color:red');
  updateDoc(doc(db, COLLECTION, DOC_ID), { recordedPitchStr });
};

const buildRecordVoiceParams = (doc: DocumentData) => {
  const { rawPitchStr, recordedPitchStr } = doc.data();
  const recordVoiceParams: IRecordVoiceParams = {
    rawPitchStr: rawPitchStr || '',
    recordedPitchStr: recordedPitchStr || '',
  };
  return recordVoiceParams;
};
