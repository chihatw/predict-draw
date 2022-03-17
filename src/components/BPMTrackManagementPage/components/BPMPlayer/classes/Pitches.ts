export class Pitches {
  private _startAts: number[];
  private _beatRate: number;
  private _blockCount: number;

  constructor({
    bpm,
    type,
    bpmPitchesArray,
  }: {
    bpm: number;
    type: string;
    bpmPitchesArray: string[][][];
  }) {
    let beatRate = 0;
    let track: number[] = [];
    switch (type) {
      case 'mora':
      case 'onebyone':
        track = bpmPitchesArray2MoraTrack(bpmPitchesArray);
        beatRate = (60 * 1000) / 2 / bpm;
        break;
      case 'syllable':
        track = bpmPitchesArray2SyllableTrack(bpmPitchesArray);
        beatRate = (60 * 1000) / bpm;
        break;
    }
    this._startAts = bpmPitchesArray2StartAts(bpmPitchesArray);
    this._beatRate = beatRate;
    this._blockCount = track.length;
  }

  get startAts() {
    return this._startAts;
  }

  getActiveIndex(elapsedTime: number) {
    return Math.floor((elapsedTime / this._beatRate) % this._blockCount);
  }
}

const bpmPitchesArray2MoraTrack = (bpmPitchesArray: string[][][]) => {
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

const bpmPitchesArray2SyllableTrack = (bpmPitchesArray: string[][][]) => {
  let syllableTrack: number[] = [];
  for (const line of bpmPitchesArray) {
    const syllableCount = Math.ceil(line.length / 2);
    syllableTrack = syllableTrack.concat(new Array(syllableCount).fill(0));
  }
  return syllableTrack;
};

const bpmPitchesArray2StartAts = (bpmPitchesArray: string[][][]) => {
  const startAts: number[] = [];
  let sum = 0;
  for (const line of bpmPitchesArray) {
    startAts.push(sum);
    sum += line.length;
  }
  return startAts;
};
