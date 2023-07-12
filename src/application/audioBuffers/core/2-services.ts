import { MutableRefObject } from 'react';

const createSourceNode = (
  audioBuffer: AudioBuffer,
  audioContext: AudioContext
) => {
  const sourceNode = audioContext.createBufferSource();
  sourceNode.buffer = audioBuffer;
  sourceNode.connect(audioContext.destination);
  return sourceNode;
};

export const blobToAudioBuffer = async (blob: Blob) => {
  const audioContext = new AudioContext();
  const arrayBuffer = await blob.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  return audioBuffer;
};

export const playAudioBufferAndSetSourceNode = async (
  audioBuffer: AudioBuffer,
  start: number,
  stop: number,
  sourceNodeRef: React.MutableRefObject<AudioBufferSourceNode | undefined>,
  callback?: () => void
) => {
  const audioContext = new AudioContext();
  const sourceNode = await createSourceNode(audioBuffer, audioContext);
  sourceNodeRef.current = sourceNode;
  const currentTime = audioContext.currentTime;
  if (callback) {
    sourceNode.onended = callback;
  }
  sourceNode.start(currentTime, start);
  sourceNode.stop(currentTime + stop - start);
};

export const pauseSourceNode = (
  sourceNodeRef: React.MutableRefObject<AudioBufferSourceNode | undefined>
) => {
  const sourceNode = sourceNodeRef.current;
  sourceNode && sourceNode.stop(0);
  sourceNodeRef.current = undefined;
};

export const createMediaRecorder = async (
  audioElemRef: MutableRefObject<HTMLAudioElement>,
  mediaRecorderRef: MutableRefObject<MediaRecorder | undefined>
) => {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: false,
  });
  const mediaRecorder = new MediaRecorder(stream);
  // streamと連携してマイクを切るため
  audioElemRef.current.srcObject = stream;
  mediaRecorderRef.current = mediaRecorder;
  return mediaRecorder;
};

export const startRecording = async (
  mediaRecorder: MediaRecorder,
  callback: (blob: Blob, audioBuffer: AudioBuffer) => void
) => {
  // データが入力された時の処理
  mediaRecorder.ondataavailable = async (event: BlobEvent) => {
    const blob = event.data;
    if (!blob) return;
    const audioBuffer = await blobToAudioBuffer(blob);
    if (!audioBuffer) return;
    callback(blob, audioBuffer);
  };
  // 録音開始
  mediaRecorder.start();
};

export const clearMediaRecorder = (
  audioElemRef: MutableRefObject<HTMLAudioElement>,
  mediaRecorderRef: MutableRefObject<MediaRecorder | undefined>
) => {
  let mediaRecorder = mediaRecorderRef.current;
  let audioElem = audioElemRef.current;
  if (!mediaRecorder) return;
  mediaRecorder.stop();
  const stream = audioElem.srcObject as MediaStream;
  stream.getTracks().forEach((track) => {
    track.stop();
  });
  // ブラウザのマイク使用中の表示を消すために必要
  audioElem.srcObject = null;
  mediaRecorder = undefined;
};

export const updateElapsedTime = (
  audioContext: AudioContext,
  elapsedStartedAtRef: React.MutableRefObject<number>,
  elapsedTimeRef: React.MutableRefObject<number>
) => {
  const currentTime = audioContext.currentTime;
  // 経過時間を累積経過時間に追加
  elapsedTimeRef.current += currentTime - elapsedStartedAtRef.current;
  // 経過時間起点を更新
  elapsedStartedAtRef.current = currentTime;
};
