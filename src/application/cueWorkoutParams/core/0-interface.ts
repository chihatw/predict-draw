export interface ICuePattern {
  doushi: string;
  grouping: string;
  isNegative: boolean;
  isWoFirst: boolean;
  ni: string;
  sentence: string;
  wo: string;
  topic: string;
}

export interface ICueWorkoutParams {
  colors: string[];
  isRunning: boolean;
  lastPattern: ICuePattern;
  points: number;
  time: number;
}
