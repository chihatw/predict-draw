import { IRecordVoiceParams } from './0-interface';

export const initialState: IRecordVoiceParams = {
  pitchStr: '',
  hasVoice: false,
  recordedPitchStr: '',
};

export const RECORD_VOICE_STORAGE_PATH = 'recordVoice/';
