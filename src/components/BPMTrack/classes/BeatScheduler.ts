import {
  bpmPitchesArray2MoraTrack,
  bpmPitchesArray2OneByOneTrack,
  bpmPitchesArray2SyllableTrack,
} from '../services/utils';
import { Beat } from './Beat';

export class BeatScheduler {
  private _beat: Beat;
  private _track: number[] = [];
  private _startAt: number;
  private _beatRate: number;
  private _syncopationRatio: number;

  private _index = 0;

  constructor({
    bpm,
    type,
    startAt,
    audioContext,
    bpmPitchesArray,
    syncopationRatio,
  }: {
    bpm: number;
    type: string;
    startAt: number;
    audioContext: AudioContext;
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

    this._beat = new Beat(audioContext);
    this._track = track;
    this._startAt = startAt;
    this._beatRate = beatRate;
    this._syncopationRatio = syncopationRatio;
  }

  tick(now: number) {
    const beatElapsedTime = now - this._startAt;
    if (beatElapsedTime > 0) {
      const syncopation =
        (!!(this._index % 2) ? 1 : -1) *
        ((this._beatRate * (100 - this._syncopationRatio)) / 100);
      this._startAt += this._beatRate + syncopation;
      const pitch = this._track[this._index];
      if (pitch > -1) {
        // 音を鳴らす
        this._beat.play(pitch > 0 ? 1000 : 800);
      }

      this._index = (this._index + 1) % this._track.length;
    }
  }
}
