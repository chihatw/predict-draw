import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../infrastructure/firebase';

/**
 *
 * @example
 * getRandomInt(1) // 0;
 * getRandomInt(2) // 0,1;
 *
 */
export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const shuffle = ([...array]: any[]) => {
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

export const blobToAudioBuffer = async (blob: Blob) => {
  const audioContext = new AudioContext();
  const arrayBuffer = await blob.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  return audioBuffer;
};

export const createSourceNode = (
  audioBuffer: AudioBuffer,
  audioContext: AudioContext
) => {
  const sourceNode = audioContext.createBufferSource();
  sourceNode.buffer = audioBuffer;
  sourceNode.connect(audioContext.destination);
  return sourceNode;
};

export const getBlob = async (downloadURL: string) => {
  let blob = null;

  if (downloadURL) {
    const header = downloadURL.slice(0, 4);
    if (header !== 'http') {
      downloadURL = await getDownloadURL(ref(storage, downloadURL));
    }
    console.log('create blob');
    const response = await fetch(downloadURL);
    blob = await response.blob();
  }
  return blob;
};

export const getBlobFromAssets = async (path: string) => {
  const response = await fetch(path);
  const blob = await response.blob();

  return { blob };
};

export const toggleElement = (arr: string[], val: string) =>
  arr.includes(val) ? arr.filter((el) => el !== val) : [...arr, val];

export const getAudioBufferFromStorage = async (
  storagePath: string
): Promise<AudioBuffer | null> => {
  const downloadURL = await getDownloadURL(ref(storage, storagePath));
  if (!downloadURL) return null;
  console.log(`fetch from "${storagePath}"`);
  const response = await fetch(downloadURL);
  const blob = await response.blob();
  if (!blob) return null;
  const audioBuffer = await blobToAudioBuffer(blob);
  return audioBuffer;
};

export const getBlobFromStorage = async (storagePath: string) => {
  const downloadURL = await getDownloadURL(ref(storage, storagePath));
  if (!downloadURL) return null;
  console.log(`fetch from "${storagePath}"`);
  const response = await fetch(downloadURL);
  const blob = await response.blob();
  return blob;
};
