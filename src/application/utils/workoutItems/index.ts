export type WorkoutItem = {
  text: string;
  chinese: string;
  pitchesArray: string;
};

export const INITIAL_WORKOUT_ITEM: WorkoutItem = {
  text: '',
  chinese: '',
  pitchesArray: '',
};

export const string2WorkoutItems = (value: string) => {
  const workoutItems: WorkoutItem[] = [];
  const lines = value.split('\n').filter((i) => i);
  for (let i = 0; i < lines.length; i = i + 3) {
    const text = lines[i] || '';
    const chinese = lines[i + 1] || '';
    const pitchesArray = lines[i + 2] || '';
    const workoutItem: WorkoutItem = {
      text,
      chinese,
      pitchesArray,
    };
    workoutItems.push(workoutItem);
  }
  return workoutItems;
};

export const workoutItems2String = (workoutItems: WorkoutItem[]) => {
  const lines: string[] = [];
  for (const workoutItem of workoutItems) {
    const { text, chinese, pitchesArray } = workoutItem;
    lines.push(text);
    lines.push(chinese);
    lines.push(pitchesArray);
  }
  return lines.join('\n');
};
