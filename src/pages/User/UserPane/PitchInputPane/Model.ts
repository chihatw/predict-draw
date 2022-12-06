export type PitchInputFormState = {
  blob: Blob | null;
  mora: number;
  hasA: boolean;
  hasN: boolean;
  hasX: boolean;
  cueIds: string[];
  answerIds: string[];
  currentIndex: number;
  audioContext: AudioContext | null;
};

export const INITIAL_PITCH_INPUT_FORM_STATE: PitchInputFormState = {
  blob: null,
  mora: 2,
  hasA: true,
  hasN: true,
  hasX: true,
  cueIds: [],
  answerIds: [],
  currentIndex: 0,
  audioContext: null,
};
