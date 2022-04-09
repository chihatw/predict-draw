import bpmPitchesArray2Offsets from 'bpm-pitches-array2offsets';
import {
  bpmPitchesArray2MoraTrack,
  bpmPitchesArray2SyllableTrack,
} from '../services/utils';

export class DisplayScheduler {
  private _startAts: number[];
  private _beatRate: number;
  private _blockCount: number;
  private _isSycopation: boolean;
  private _syncopationRatio: number;

  constructor({
    bpm,
    type,
    bpmPitchesArray,
    syncopationRatio,
  }: {
    bpm: number;
    type: string;
    bpmPitchesArray: string[][][];
    syncopationRatio: number;
  }) {
    let beatRate = 0;
    let track: number[] = [];
    switch (type) {
      case 'syncopation':
        track = syncopationRatio === 0 ? [0, -1, 0, -1] : [0, 0, 0, 0];
        beatRate = (60 * 1000) / 2 / bpm;
        break;
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
    this._startAts = bpmPitchesArray2Offsets(bpmPitchesArray);
    this._beatRate = beatRate;
    this._blockCount = track.length;
    this._isSycopation = type === 'syncopation';
    this._syncopationRatio = syncopationRatio;
  }

  get offsets() {
    return this._startAts;
  }

  getActiveIndex(elapsedTime: number) {
    const elapsedCountPair = Math.floor(elapsedTime / (this._beatRate * 2));
    const extraTime = elapsedTime - elapsedCountPair * (this._beatRate * 2);

    const syncopation = this._beatRate * ((100 - this._syncopationRatio) / 100);
    const extraCount = extraTime > this._beatRate - syncopation ? 1 : 0;

    const elapsedCount = elapsedCountPair * 2 + extraCount;
    return Math.floor(elapsedCount % this._blockCount);
  }

  getProgress(elapsedTime: number) {
    const totalTime = this._beatRate * 4;
    const extraTime = Math.floor(elapsedTime % totalTime);
    return this._isSycopation ? Math.floor((extraTime / totalTime) * 100) : 0;
  }
}
