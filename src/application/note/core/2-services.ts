import { INote } from './0-interface';

export const buildNoteStr = (note: INote): string => {
  const lines: string[] = [];
  const { texts, pitchStrs } = note;
  for (let i = 0; i < texts.length; i++) {
    lines.push(texts[i]);
    lines.push(pitchStrs[i] || '');
  }
  return lines.join('\n');
};

export const buildNoteFromString = (input: string): INote => {
  const texts: string[] = [];
  const pitchStrs: string[] = [];
  const lines = input.split('\n').filter((i) => i);

  for (let i = 0; i < lines.length; i = i + 2) {
    texts.push(lines[i]);
    pitchStrs.push(lines[i + 1] || '');
  }
  return { texts, pitchStrs };
};
