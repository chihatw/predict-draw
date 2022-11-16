export type RhythmWorkoutFormState = {
  blob: Blob | null;
  mora: number;
  cueIds: string[];
  answerIds: string[];
  currentIndex: number;
  audioContext: AudioContext | null;
};

export const INITIAL_RHYTHM_WORKOUT_FORM_STATE: RhythmWorkoutFormState = {
  blob: null,
  mora: 1,
  cueIds: [],
  answerIds: [],
  currentIndex: 0,
  audioContext: null,
};
