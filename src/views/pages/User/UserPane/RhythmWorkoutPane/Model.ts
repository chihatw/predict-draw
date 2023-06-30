export type RhythmWorkoutFormState = {
  audioBuffer: AudioBuffer | null;
  mora: number;
  cueIds: string[];
  answerIds: string[];
  currentIndex: number;
  audioContext: AudioContext | null;
};

export const INITIAL_RHYTHM_WORKOUT_FORM_STATE: RhythmWorkoutFormState = {
  audioBuffer: null,
  mora: 1,
  cueIds: [],
  answerIds: [],
  currentIndex: 0,
  audioContext: null,
};
