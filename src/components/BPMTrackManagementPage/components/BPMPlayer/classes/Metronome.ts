import { Beat } from './Beat';

export class Metronome {
  private _beat: Beat;
  private _track: number[] = [];

  private _index = 0;
  private _startAt = 0;
  private _beatRate = 0;

  constructor({
    bpm,
    type,
    startAt,
    bpmPitchesArray,
  }: {
    bpm: number;
    type: string;
    startAt: number;
    bpmPitchesArray: string[][][];
  }) {
    let beatRate = 0;
    let track: number[] = [];

    switch (type) {
      case 'mora':
        track = bpmPitchesArray2MoraTrack(bpmPitchesArray);
        beatRate = (60 * 1000) / 2 / bpm;
        break;
      case 'onebyone':
        track = bpmPitchesArray2OneByOneTrack(bpmPitchesArray);
        beatRate = (60 * 1000) / 2 / bpm;
        break;
      case 'syllable':
        track = bpmPitchesArray2SyllableTrack(bpmPitchesArray);
        beatRate = (60 * 1000) / bpm;
        break;
    }

    this._beat = new Beat();
    this._track = track;
    this._startAt = startAt;
    this._beatRate = beatRate;
  }

  tick(now: number) {
    const beatElapsedTime = now - this._startAt;
    if (beatElapsedTime > 0) {
      this._startAt += this._beatRate;
      const pitch = this._track[this._index];
      if (pitch > -1) {
        this._beat.play(pitch > 0 ? 1000 : 800);
      }

      this._index = (this._index + 1) % this._track.length;
    }
  }
}

const bpmPitchesArray2MoraTrack = (bpmPitchesArray: string[][][]) => {
  const track: number[] = [];
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
      track.push(beat);
    }
  }
  return track;
};

const bpmPitchesArray2OneByOneTrack = (bpmPitchesArray: string[][][]) => {
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

const bpmPitchesArray2SyllableTrack = (bpmPitchesArray: string[][][]) => {
  let track: number[] = [];
  for (const line of bpmPitchesArray) {
    const syllableCount = Math.ceil(line.length / 2);
    track = track.concat(new Array(syllableCount).fill(0));
  }
  return track;
};
