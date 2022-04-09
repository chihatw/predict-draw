import { TextField } from '@mui/material';
import string2BpmPitchesArray from 'string2bpm-pitches-array';
import React, { useEffect, useState } from 'react';

import { PitchesArray } from '../../../../services/useBpmTrack';
import pitchesArray2String from 'pitches-array2string';
import { string2PitchesArrayLines } from '../../services/utils';

const TrackTextForm = ({
  pitchesArrayLines,
  updateOffsets,
  updatePitchesArrayLines,
}: {
  pitchesArrayLines: PitchesArray[];
  updateOffsets: (value: number[]) => void;
  updatePitchesArrayLines: (value: PitchesArray[]) => void;
}) => {
  const [input, setInput] = useState('');

  useEffect(() => {
    if (!!input) return;

    const lines: string[] = [];
    for (const pitchesArray of pitchesArrayLines) {
      const line = pitchesArray2String(pitchesArray);
      lines.push(line);
    }
    const _input = lines.join('\n');
    setInput(_input);
  }, [pitchesArrayLines]);

  const handleInput = (input: string) => {
    setInput(input);
    const pitchesArrayLines: PitchesArray[] = string2PitchesArrayLines(input);
    updatePitchesArrayLines(pitchesArrayLines);
    const bpmPitchesArray = string2BpmPitchesArray(input);
    const startAts = bpmPitchesArray2StartAts(bpmPitchesArray);
    updateOffsets(startAts);
  };
  return (
    <TextField
      multiline
      value={input}
      onChange={(e) => handleInput(e.target.value)}
    />
  );
};

export default TrackTextForm;

const bpmPitchesArray2StartAts = (bpmPitchesArray: string[][][]) => {
  const startAts: number[] = [];
  let sum = 0;
  for (const line of bpmPitchesArray) {
    startAts.push(sum);
    sum += line.length;
  }
  return startAts;
};
