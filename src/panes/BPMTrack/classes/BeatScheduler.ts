import { Beat } from './Beat';
import { getBeatIntervals, getBeatNotes } from '../services/utils';

export class BeatScheduler {
  private _beat: Beat;
  private _startAt: number;
  private _beatNotes: number[]; // 鳴らす音の種類: 1: 高音, 0: 低音, -1: 無音
  private _nextBeatAt: number; // 次に音を鳴らす時刻(ms)
  private _beatIntervals: number[]; // bpm と syncopationRatio から計算した 音と音の間隔(ms)
  private _4NotesDuration: number;

  private _noteIndex = 0;

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
    this._beat = new Beat(audioContext);
    this._startAt = startAt;
    this._nextBeatAt = startAt;

    this._beatNotes = getBeatNotes({ type, bpmPitchesArray, syncopationRatio });
    this._beatIntervals = getBeatIntervals({ bpm, type, syncopationRatio });

    this._4NotesDuration =
      this._beatIntervals.reduce((sum, beatInterval) => sum + beatInterval, 0) *
      2;
  }

  tick(now: number) {
    const _leftTime = this._nextBeatAt - now;

    if (_leftTime < 0) {
      // 音を鳴らす
      const _beatNote = this._beatNotes[this._noteIndex];
      if (_beatNote > -1) {
        this._beat.play(_beatNote > 0 ? 1000 : 800);
      }

      // nextBeatAt の更新
      this._nextBeatAt += this._beatIntervals[this._noteIndex % 2];

      // インデックスのカウントアップ
      this._noteIndex = (this._noteIndex + 1) % this._beatNotes.length;
    }

    // 4拍節の中の進捗度を計算
    const _elapsedTime = now - this._startAt;

    // 経過時間を４拍の長さで割った残り
    const _extraTime = Math.floor(_elapsedTime % this._4NotesDuration);
    const _xPosProgress = Math.floor((_extraTime / this._4NotesDuration) * 100);

    return { noteIndex: this._noteIndex - 1, xPosProgress: _xPosProgress };
  }
}
