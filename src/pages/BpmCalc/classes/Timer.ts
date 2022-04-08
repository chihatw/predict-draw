export class Timer {
  private _startAt = 0;
  set startAt(value: number) {
    this._startAt = value;
  }
  getElaspedTime(now: number) {
    return now - this._startAt;
  }
}
