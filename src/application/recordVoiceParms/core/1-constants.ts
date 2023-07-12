import { IRecordVoiceParams } from './0-interface';

export const initialState: IRecordVoiceParams = {
  rawPitchStr: '',
  recordedPitchStr: '',
};

export const RECORD_VOICE_STORAGE_PATH = 'recordVoice/';
export const RAW_PATH = RECORD_VOICE_STORAGE_PATH + 'raw';
