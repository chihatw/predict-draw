import { IRecordVoiceParams } from 'application/recordVoiceParms/core/0-interface';

export type Schedule = { offset: number; start: number; stop: number };

export type VoiceProps = {
  id: string;
  startAt: number;
  stopAt: number;
  pitchStr: string;
};

export const INITIAL_VOICE_PROPS: VoiceProps = {
  id: '',
  startAt: 0,
  stopAt: 0,
  pitchStr: '',
};

export type RecordVoice = {
  assets: {
    [id: string]: VoiceProps;
  };
  params: IRecordVoiceParams;
};

export const INITIAL_RECORD_VOICE: RecordVoice = {
  assets: {},
  params: {
    rawPitchStr: '',
    recordedPitchStr: '',
  },
};

export type State = {
  audioBuffers: {
    [downloadURL: string]: AudioBuffer;
  };
  recordVoice: RecordVoice;
};

export const INITIAL_STATE: State = {
  audioBuffers: {},
  recordVoice: INITIAL_RECORD_VOICE,
};
