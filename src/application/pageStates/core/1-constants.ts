export const USERS = { liSan: 'liSan', kouSan: 'kouSan', chinSan: 'chinSan' };

export const USER_LABELS: { [key: string]: string } = {
  liSan: '李さん',
  kouSan: '黄さん',
  chinSan: '陳さん',
};

export const PAGES = {
  note: 'note',
  blank: 'blank',
  micTest: 'micTest',
  cueWorkout: 'cueWorkout',
  speedWorkoutCue: 'speedWorkoutCue',
  speedWorkoutRead: 'speedWorkoutRead',
  speedWorkoutSolo: 'speedWorkoutSolo',
};

export const PAGE_STATE: { value: string; label: string }[] = [
  { value: PAGES.speedWorkoutSolo, label: '速読ソロ' },
  { value: PAGES.speedWorkoutCue, label: '速読キュー' },
  { value: PAGES.speedWorkoutRead, label: '速読練習' },
  { value: PAGES.cueWorkout, label: '紙コップ' },
  { value: PAGES.note, label: 'ノート' },
  { value: PAGES.blank, label: '空欄' },
  { value: PAGES.micTest, label: 'マイクテスト' },
];
