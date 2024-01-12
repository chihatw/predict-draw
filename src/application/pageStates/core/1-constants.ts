export const USERS = { liSan: "liSan", kouSan: "kouSan", chinSan: "chinSan" };

export const USER_LABELS: { [key: string]: string } = {
  liSan: "李さん",
  kouSan: "黄さん",
  chinSan: "陳さん",
};

export const PAGES = {
  note: "note",
  blank: "blank",
  micTest: "micTest",
  ga_wo_ni: "ga_wo_ni",
  paperCups: "paperCups",
  sokudokuCue: "sokudokuCue",
  sokudokuRenshu: "sokudokuRenshu",
  sokudokuSolo: "sokudokuSolo",
};

export const PAGE_STATE: { value: string; label: string }[] = [
  { value: PAGES.sokudokuSolo, label: "速読ソロ" },
  { value: PAGES.sokudokuCue, label: "速読キュー" },
  { value: PAGES.sokudokuRenshu, label: "速読練習" },
  { value: PAGES.paperCups, label: "紙コップ" },
  { value: PAGES.ga_wo_ni, label: "がをに" },
  { value: PAGES.note, label: "ノート" },
  { value: PAGES.blank, label: "空欄" },
  { value: PAGES.micTest, label: "マイクテスト" },
];
