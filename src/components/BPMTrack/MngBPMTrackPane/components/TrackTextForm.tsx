import { TextField } from '@mui/material';
import string2BpmPitchesArray from 'string2bpm-pitches-array';
import bpmPitchesArray2String from 'bpm-pitches-array2string';
import React, { useEffect, useState } from 'react';

const TrackTextForm = ({
  bpmPitchesArray,
  updateOffsets,
  updateBpmPitchesArray,
  superHandleChangeInput,
}: {
  bpmPitchesArray: string[][][];
  updateOffsets: (value: number[]) => void;
  updateBpmPitchesArray: (value: string[][][]) => void;
  superHandleChangeInput: (value: string) => void;
}) => {
  const [input, setInput] = useState('');

  useEffect(() => {
    if (!!input) return;
    const _input = bpmPitchesArray2String(bpmPitchesArray);
    setInput(_input);
  }, [bpmPitchesArray]);

  const handleInput = (input: string) => {
    setInput(input);
    superHandleChangeInput(input);
    const bpmPitchesArray = string2BpmPitchesArray(input);
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
