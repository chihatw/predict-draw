export type RhythmListeningFormState = {
  blob: Blob | null;
  mora: number;
  cueIds: string[];
  answerIds: string[];
  currentIndex: number;
  audioContext: AudioContext | null;
};

export const INITIAL_RHYTHM_LISTENING_FORM_STATE: RhythmListeningFormState = {
  blob: null,
  mora: 1,
  cueIds: [],
  answerIds: [],
  currentIndex: 0,
  audioContext: null,
};
