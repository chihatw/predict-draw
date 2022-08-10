export const shuffle = ([...array]: string[]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const createAudioContext = () => {
  const audioContext = new window.AudioContext();
  const osc = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  osc.connect(gainNode);
  gainNode.connect(audioContext.destination);

  gainNode.gain.value = 0;
  osc.start(audioContext.currentTime);
  osc.stop(audioContext.currentTime + 0.01);
  return audioContext;
};
