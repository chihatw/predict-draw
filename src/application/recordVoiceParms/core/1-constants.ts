import { IRecordVoiceParams } from './0-interface';

export const initialState: IRecordVoiceParams = {
  hasVoice: false,
  rawPitchStr: '',
  recordedPitchStr: '',
};

export const RECORD_VOICE_STORAGE_PATH = 'recordVoice/';
