export class Timer {
  private _startAt: number = 0;
  set startAt(value: number) {
    this._startAt = value;
  }
  elapsedTime(now: number) {
    return Math.floor(now - this._startAt);
  }
}
