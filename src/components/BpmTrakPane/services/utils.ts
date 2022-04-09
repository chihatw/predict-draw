export const bpmPitchesArray2MoraTrack = (bpmPitchesArray: string[][][]) => {
  const moraTrack: number[] = [];
  for (const line of bpmPitchesArray) {
    for (const pitch of line) {
      const mora = pitch[0];
      const isHighPitch = !!pitch[1];
      let beat: number = -1;
      // 空文字列、っ、ッ、は -1のまま（無音）
      if (!['', 'っ', 'ッ'].includes(mora)) {
        // 高音は1, 低音は0を代入
        beat = isHighPitch ? 1 : 0;
      }
      moraTrack.push(beat);
    }
  }
  return moraTrack;
};

export const bpmPitchesArray2OneByOneTrack = (
  bpmPitchesArray: string[][][]
) => {
  let track: number[] = [];
  for (const line of bpmPitchesArray) {
    const syllableCount = Math.ceil(line.length / 2);
    for (let i = 0; i < syllableCount; i++) {
      track.push(0);
      track.push(-1);
    }
  }
  return track;
};

export const bpmPitchesArray2SyllableTrack = (
  bpmPitchesArray: string[][][]
) => {
  let syllableTrack: number[] = [];
  for (const line of bpmPitchesArray) {
    const syllableCount = Math.ceil(line.length / 2);
    syllableTrack = syllableTrack.concat(new Array(syllableCount).fill(0));
  }
  return syllableTrack;
};
