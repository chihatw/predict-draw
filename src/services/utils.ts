import { useEffect } from 'react';

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

export const useCallbackByTime = ({
  time,
  callback,
  resetTime,
}: {
  time?: number;
  callback: () => void;
  resetTime?: (value: number) => void;
}) => {
  useEffect(() => {
    // time が 0 の時は何もしない
    if (!time) return;
    // time が変更されたら、 callbackを実行
    callback();
    // 破棄されるときに、time を初期化
    return () => {
      !!resetTime && resetTime(0);
    };
  }, [time]);
};
