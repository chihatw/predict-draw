import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../infrastructure/firebase';

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
