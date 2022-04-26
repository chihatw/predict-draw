import string2PitchesArray from 'string2pitches-array';
import { PitchesArray } from '../../../services/usePitches';

export const bpmPitchesArray2MoraTrack = (bpmPitchesArray: string[][][]) => {
  const moraTrack: number[] = [];
  for (const line of bpmPitchesArray) {
    for (const pitch of line) {
      const mora = pitch[0];
      const isHighPitch = !!pitch[1];
      let beat: number = -1;
      // 空文字列、っ、ッ、は -1のまま（無音）
      if (!['', 'っ', 'ッ'].includes(mora)) {
        // 高音は1, 低音は0を代入
        beat = isHighPitch ? 1 : 0;
      }
      moraTrack.push(beat);
    }
  }
  return moraTrack;
};

export const bpmPitchesArray2OneByOneTrack = (
  bpmPitchesArray: string[][][]
) => {
  let track: number[] = [];
  for (const line of bpmPitchesArray) {
    const syllableCount = Math.ceil(line.length / 2);
    for (let i = 0; i < syllableCount; i++) {
      track.push(0);
      track.push(-1);
    }
  }
  return track;
};

export const bpmPitchesArray2SyllableTrack = (
  bpmPitchesArray: string[][][]
) => {
  let syllableTrack: number[] = [];
  for (const line of bpmPitchesArray) {
    const syllableCount = Math.ceil(line.length / 2);
    syllableTrack = syllableTrack.concat(new Array(syllableCount).fill(0));
  }
  return syllableTrack;
};

export const string2PitchesArrayLines = (value: string) => {
  const lines = value.split('\n').filter((i) => i);
  const pitchesArrayLines: PitchesArray[] = [];
  for (const line of lines) {
    const pitchesArray = string2PitchesArray(line);
    pitchesArrayLines.push(pitchesArray);
  }
  return pitchesArrayLines;
};

export const pitchesArrayLines2BpmPitchesArray = (
  pitchesArrayLines: PitchesArray[]
) => {
  const bpmPitchesArray: string[][][] = [];
  for (const pitchesArray of pitchesArrayLines) {
    let lineBpmPitchesArray: string[][] = [];
    for (const pitches of pitchesArray) {
      const deleteM = pitches.map((pitch) => {
        if (pitch[0] === 'm') {
          return [''];
        } else {
          return pitch;
        }
      });
      lineBpmPitchesArray = lineBpmPitchesArray.concat(deleteM);
    }
    bpmPitchesArray.push(lineBpmPitchesArray);
  }
  return bpmPitchesArray;
};

export const getBeatIntervals = ({
  bpm,
  type,
  syncopationRatio,
}: {
  bpm: number;
  type: string;
  syncopationRatio: number;
}) => {
  const intervals: [number, number] = [0, 0];
  let interval = 0;
  switch (type) {
    case 'mora':
    case 'onebyone':
    case 'syncopation':
      interval = (60 * 1000) / 2 / bpm;
      const _offset = (interval * (100 - syncopationRatio)) / 100;
      intervals[0] = Math.round(interval - _offset);
      intervals[1] = Math.round(interval + _offset);
      break;
    case 'syllable':
      interval = (60 * 1000) / bpm;
      intervals[0] = Math.round(interval);
      intervals[1] = Math.round(interval);
      break;
    default:
  }
  return intervals;
};

export const getBeatNotes = ({
  type,
  bpmPitchesArray,
  syncopationRatio,
}: {
  type: string;
  bpmPitchesArray: string[][][];
  syncopationRatio: number;
}) => {
  let _beatNotes: number[] = []; // 鳴らす音の種類

  switch (type) {
    case 'syncopation':
      _beatNotes = syncopationRatio === 0 ? [0, -1, 0, -1] : [0, 0, 0, 0];
      break;
    case 'mora':
      _beatNotes = bpmPitchesArray2MoraTrack(bpmPitchesArray);
      break;
    case 'onebyone':
      _beatNotes = bpmPitchesArray2OneByOneTrack(bpmPitchesArray);
      break;
    case 'syllable':
      _beatNotes = bpmPitchesArray2SyllableTrack(bpmPitchesArray);
      break;
    default:
  }
  return _beatNotes;
};
