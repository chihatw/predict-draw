import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { VoiceProps } from '../Model';
import { db } from '../infrastructure/firebase';

const COLLECTIONS = {
  recordVoice: 'recordVoice',
  recordVoiceAssets: 'recordVoiceAssets',
};

export const setRecordVoiceAsset = (recordVoice: VoiceProps) => {
  console.log('set recordVoiceAsset');
  setDoc(doc(db, COLLECTIONS.recordVoiceAssets, recordVoice.id), recordVoice);
};

export const deleteRecordVoiceAsset = (id: string) => {
  console.log('delete recordVoiceAsset');
  deleteDoc(doc(db, COLLECTIONS.recordVoiceAssets, id));
};
