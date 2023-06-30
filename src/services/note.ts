import { doc, DocumentData, onSnapshot, setDoc } from 'firebase/firestore';
import { useEffect } from 'react';

import { db } from '../infrastructure/firebase';

import { NoteState } from '../Model';
import { Action, ActionTypes } from '../Update';

export type PitchesArray = string[][][];
const COLLECTIONS = { pitches: 'pitches' };

const useNote = (dispatch: React.Dispatch<Action> | null) => {
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, COLLECTIONS.pitches, 'note1'),
      (doc) => {
        console.log('snapshot note');
        if (!doc.exists() || !dispatch) return;
        const noteState = buildNoteState(doc);
        dispatch({ type: ActionTypes.setNoteState, payload: noteState });
      },
      (err) => {
        console.warn(err);
      }
    );
    return () => unsub();
  }, []);

  return;
};
export default useNote;

export const setNote = async (noteState: NoteState) => {
  console.log('set note');
  setDoc(doc(db, COLLECTIONS.pitches, 'note1'), noteState);
};

const buildNoteState = (doc: DocumentData): NoteState => {
  const { texts, pitches } = doc.data();

  const noteState: NoteState = {
    texts: texts || [],
    pitches: pitches || [],
  };

  return noteState;
};

export const buildPitchList = (input: string): NoteState => {
  const texts: string[] = [];
  const pitches: string[] = [];
  const lines = input.split('\n').filter((i) => i);

  for (let i = 0; i < lines.length; i = i + 2) {
    texts.push(lines[i]);
    pitches.push(lines[i + 1] || '');
  }
  return { texts, pitches };
};

export const buildInput = (note: NoteState): string => {
  const lines: string[] = [];
  const { texts, pitches } = note;
  for (let i = 0; i < texts.length; i++) {
    lines.push(texts[i]);
    lines.push(pitches[i + 1] || '');
  }

  return lines.join('\n');
};
