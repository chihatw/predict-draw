export interface ICueCard {
  label: string;
  pitchStr: string;
}

export interface ICueWorkoutCue {
  text: string;
  verb: ICueCard;
  nouns: ICueCard[];
  header: ICueCard;
}
