export class DisplayScheduler {
  private _isSycopation: boolean;
  private _startAt: number;
  private _nextBeatAt: number; // 次に音を鳴らす時刻(ms)
  private _beatNotes: number[]; // 鳴らす音の種類: 1: 高音, 0: 低音, -1: 無音
  private _beatIntervals: number[]; // bpm と syncopationRatio から計算した 音と音の間隔(ms)
  private _4NotesDuration: number;

  private _noteIndex = 0;

  constructor({
    startAt,
    beatNotes,
    beatIntervals,
    isSyncopation,
  }: {
    startAt: number;
    beatNotes: number[];
    beatIntervals: number[];
    isSyncopation: boolean;
  }) {
    this._startAt = startAt;
    this._nextBeatAt = startAt;
    this._beatNotes = beatNotes;
    this._beatIntervals = beatIntervals;
    this._4NotesDuration =
      beatIntervals.reduce((sum, beatInterval) => sum + beatInterval, 0) * 2;
    this._isSycopation = isSyncopation;
  }
  tick(now: number) {
    const _leftTime = this._nextBeatAt - now;
    if (_leftTime < 0) {
      // nextBeatAt の更新
      this._nextBeatAt += this._beatIntervals[this._noteIndex % 2];

      // インデックスのカウントアップ
      this._noteIndex = (this._noteIndex + 1) % this._beatNotes.length;
    }

    const _elapsedTime = now - this._startAt;

    // 経過時間を４拍の長さで割った残り
    const _extraTime = Math.floor(_elapsedTime % this._4NotesDuration);
    const _xPosProgress = this._isSycopation
      ? Math.floor((_extraTime / this._4NotesDuration) * 100)
      : 0;

    return { index: this._noteIndex - 1, xPosProgress: _xPosProgress };
  }
}
