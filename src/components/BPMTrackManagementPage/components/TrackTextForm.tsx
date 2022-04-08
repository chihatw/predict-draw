import { TextField } from '@mui/material';
import string2BpmPitchesArray from 'string2bpm-pitches-array';
import bpmPitchesArray2String from 'bpm-pitches-array2string';
import React, { useEffect, useState } from 'react';

import useBpmTrack from '../../../services/useBpmTrack';

const TrackTextForm = () => {
  const { bpmPitchesArray, updateOffsets, updateBpmPitchesArray } =
    useBpmTrack();
  const [input, setInput] = useState('');

  useEffect(() => {
    if (!!input) return;
    const _input = bpmPitchesArray2String(bpmPitchesArray);
    setInput(_input);
  }, [bpmPitchesArray]);

  const handleInput = (input: string) => {
    setInput(input);
    const bpmPitchesArray = string2BpmPitchesArray(input);
    console.log({ input, bpmPitchesArray });
    updateBpmPitchesArray(bpmPitchesArray);

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
