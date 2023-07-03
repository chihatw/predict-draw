export type Schedule = { offset: number; start: number; stop: number };

export type NoteState = {
  texts: string[];
  pitches: string[];
};

export const INITIAL_NOTE_STATE: NoteState = {
  texts: [],
  pitches: [],
};

export type VoiceProps = {
  id: string;
  startAt: number;
  stopAt: number;
  pitchStr: string;
  storagePath: string;
};

export const INITIAL_VOICE_PROPS: VoiceProps = {
  id: '',
  startAt: 0,
  stopAt: 0,
  pitchStr: '',
  storagePath: '',
};

export type RecordVoiceParams = {
  activeIds: string[];
  targetAssetId: string;
  targetPitchStr: string;
};

export type RecordVoice = {
  raw: VoiceProps;
  assets: {
    [id: string]: VoiceProps;
  };
  params: RecordVoiceParams;
  logs: {
    selected: string;
  };
};

export const INITIAL_RECORD_VOICE: RecordVoice = {
  raw: {
    ...INITIAL_VOICE_PROPS,
    id: 'raw',
  },
  assets: {},
  params: {
    activeIds: [],
    targetAssetId: '',
    targetPitchStr: '',
  },
  logs: {
    selected: '',
  },
};

export type State = {
  note: NoteState;
  audioBuffers: {
    [downloadURL: string]: AudioBuffer;
  };
  recordVoice: RecordVoice;
};

export const INITIAL_STATE: State = {
  note: INITIAL_NOTE_STATE,
  audioBuffers: {},
  recordVoice: INITIAL_RECORD_VOICE,
};
