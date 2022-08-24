import { WorkingMemoryCue } from '../../../../Model';

export type WorkingMemoryFormState = {
  id: string;
  cues: { [id: string]: WorkingMemoryCue };
  blob: Blob | null;
  cueIds: string[];
  offset: number;
  cueCount: number;
  answerIds: string[];
  currentIndex: number;
  audioContext: AudioContext | null;
};

export const INITIAL_WORKING_MEMORY_FORM_STATE: WorkingMemoryFormState = {
  id: '',
  cues: {},
  blob: null,
  offset: 0,
  cueIds: [],
  cueCount: 0,
  answerIds: [],
  currentIndex: 0,
  audioContext: null,
};
