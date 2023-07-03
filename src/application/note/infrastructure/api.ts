import { DocumentData, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from 'infrastructure/firebase';
import * as _ from 'lodash';

import { INote } from '../core/0-interface';
import { buildNoteFromString } from '../core/2-services';

const COLLECTION = 'pitches';
const DOC_ID = 'note1';

export const listenNote = (
  localNote: INote,
  callback: (value: INote) => void
) => {
  return onSnapshot(doc(db, COLLECTION, DOC_ID), (docSnapshot) => {
    console.log(`%cfetched ${COLLECTION}`, 'color:red');
    if (!docSnapshot.exists()) return;

    const note = buildNote(docSnapshot);
    if (!_.isEqual(localNote, note)) {
      callback(note);
    }
  });
};

export const update = (input: string) => {
  const note = buildNoteFromString(input);
  console.log(`%cset ${COLLECTION}`, 'color:red');
  setDoc(doc(db, COLLECTION, DOC_ID), { ...note });
};

const buildNote = (doc: DocumentData) => {
  const { texts, pitchStrs } = doc.data();
  const note: INote = {
    texts: texts || [],
    pitchStrs: pitchStrs || [],
  };
  return note;
};
