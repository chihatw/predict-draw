import { Beat } from './Beat';

export class BeatScheduler {
  private _beat: Beat;
  private _beatNotes: number[]; // 鳴らす音の種類: 1: 高音, 0: 低音, -1: 無音
  private _nextBeatAt: number; // 次に音を鳴らす時刻(ms)
  private _beatIntervals: number[]; // bpm と syncopationRatio から計算した 音と音の間隔(ms)

  private _noteIndex = 0;

  constructor({
    beatNotes,
    nextBeatAt,
    audioContext,
    beatIntervals,
  }: {
    beatNotes: number[];
    nextBeatAt: number;
    audioContext: AudioContext;
    beatIntervals: number[];
  }) {
    this._beat = new Beat(audioContext);
    this._beatNotes = beatNotes;
    this._nextBeatAt = nextBeatAt;
    this._beatIntervals = beatIntervals;
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
  }
}
