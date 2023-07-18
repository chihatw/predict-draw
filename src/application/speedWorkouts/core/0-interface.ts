export interface ISpeedWorkout {
  id: string;
  beatCount: number;
  createdAt: number;
  cueType: string;
  itemTempIds: string[];
  label: string;
}

export interface IRemoteSpeedWorkout {
  beatCount: number;
  createdAt: number;
  cueType: string;
  cues: string[];
  items: {
    text: string;
    chinese: string;
    pitchStr: string;
    cuePitchStr: string;
  }[];
  label: string;
}
