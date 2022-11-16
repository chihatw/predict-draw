export type PitchWorkoutFormState = {
  blob: Blob | null;
  mora: number;
  cueIds: string[];
  answerIds: string[];
  currentIndex: number;
  audioContext: AudioContext | null;
};

export const INITIAL_PITCH_WORKOUT_FORM_STATE: PitchWorkoutFormState = {
  blob: null,
  mora: 1,
  cueIds: [],
  answerIds: [],
  currentIndex: 0,
  audioContext: null,
};
