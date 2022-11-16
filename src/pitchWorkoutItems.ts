export type Schedule = { offset: number; start: number; stop: number };

const GAP = {
  s: 0.05,
  m: 0.06,
  l: 0.12,
};

const GAPS: { [key: string]: number[] } = {
  hl: [GAP.l],
  lh: [GAP.l],
  hll: [GAP.l, GAP.m],
  lhl: [GAP.l, GAP.s],
  lhh: [GAP.l, GAP.s],
  hlll: [GAP.l, GAP.m, GAP.m],
  lhll: [GAP.l, GAP.s, GAP.s],
  lhhl: [GAP.l, GAP.s, GAP.s],
  lhhh: [GAP.l, GAP.s, GAP.s],
};

const START_AT: { [key: string]: number } = {
  h: 0.75,
  l: 1.26,
};
const DURATION: { [key: string]: number } = {
  h: 0.4,
  l: 0.35,
};

/**
 * input は低音をl, 高音をhで表す 'lhhh'
 */

const buildSchedules = (input: string): Schedule[] => {
  const schedules: Schedule[] = [];

  const pitches = input.split('');

  if (!pitches.every((char) => ['l', 'h'].includes(char))) {
    console.error('inputs only accepts "l" or "h" ');
    return [];
  }

  let offset = 0;

  pitches.forEach((pitch, index) => {
    const start = START_AT[pitch];
    const stop = offset + DURATION[pitch];
    const schedule = { offset, start, stop };
    schedules.push(schedule);
    offset = stop + GAPS[input][index];
  });

  return schedules;
};

export const PITCH_WORKOUT_ITEMS: {
  [key: string]: { id: string; pitchStr: string; schedules: Schedule[] };
} = {
  hl: {
    id: 'hl',
    pitchStr: 'タ＼タ',
    schedules: buildSchedules('hl'),
  },
  lh: {
    id: 'lh',
    pitchStr: 'タタ',
    schedules: buildSchedules('lh'),
  },
  hll: {
    id: 'hll',
    pitchStr: 'タ＼タタ',
    schedules: buildSchedules('hll'),
  },
  lhl: {
    id: 'lhl',
    pitchStr: 'タタ＼タ',
    schedules: buildSchedules('lhl'),
  },
  lhh: {
    id: 'lhh',
    pitchStr: 'タタタ',
    schedules: buildSchedules('lhh'),
  },
  hlll: {
    id: 'hlll',
    pitchStr: 'タ＼タタタ',
    schedules: buildSchedules('hlll'),
  },
  lhll: {
    id: 'lhll',
    pitchStr: 'タタ＼タタ',
    schedules: buildSchedules('lhll'),
  },
  lhhl: {
    id: 'lhhl',
    pitchStr: 'タタタ＼タ',
    schedules: buildSchedules('lhhl'),
  },
  lhhh: {
    id: 'lhhh',
    pitchStr: 'タタタタ',
    schedules: buildSchedules('lhhh'),
  },
};
