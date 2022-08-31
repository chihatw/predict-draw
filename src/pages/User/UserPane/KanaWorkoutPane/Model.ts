export type KanaWorkoutState = {
  blob: Blob | null;
  kanas: string[];
  cueIds: string[];
  answers: string[];
  currentIndex: number;
  audioContext: AudioContext | null;
};

export const INITIAL_KANA_WORKOUT_STATE: KanaWorkoutState = {
  blob: null,
  kanas: [],
  cueIds: [],
  answers: [],
  currentIndex: 0,
  audioContext: null,
};
