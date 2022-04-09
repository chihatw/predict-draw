export class Beat {
  private _audioContext: AudioContext | null = null;
  constructor(audioContext: AudioContext) {
    this._audioContext = audioContext;
  }
  play(hz?: number) {
    if (!this._audioContext) {
      console.warn('no audioContext');
      return;
    }
    const osc = this._audioContext.createOscillator();
    osc.frequency.value = hz || 1000;
    osc.connect(this._audioContext.destination);

    osc.start(this._audioContext.currentTime);
    osc.stop(this._audioContext.currentTime + 0.03);
  }
}
