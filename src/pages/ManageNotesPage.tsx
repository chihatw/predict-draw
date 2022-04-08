import React, { useEffect, useRef, useState } from 'react';
import string2PitchesArray from 'string2pitches-array';
import { Container, TextField } from '@mui/material';
import pitchesArray2String from 'pitches-array2string';

import Layout from '../Layout';
import usePitches, { PitchesArray } from '../services/usePitches';

const ManageNotesPage = () => {
  const { note1PitchList, updatePitchList } = usePitches();

  const [input, setInput] = useState('');
  const isBlankRef = useRef(false);

  // note1PitchListを文字列化して、inputに代入
  useEffect(() => {
    if (!!input) return;
    const lines: string[] = [];
    for (const line of note1PitchList) {
      lines.push(line[0]);
      lines.push(pitchesArray2String(line[1]));
    }
    if (!isBlankRef.current) {
      setInput(lines.join('\n'));
    }
  }, [note1PitchList, input]);

  const handleChangeInput = (input: string) => {
    setInput(input);
    isBlankRef.current = input === '';
    const pitchList: [string, PitchesArray][] = [];
    const lines = input.split('\n').filter((i) => i);
    lines.forEach((line, index) => {
      if (index % 2) {
        const i = (index - 1) / 2;
        pitchList[i][1] = string2PitchesArray(line);
      } else {
        pitchList.push([line, []]);
      }
    });
    updatePitchList(pitchList);
  };

  return (
    <Layout color='blue' label='Input Pitches'>
      <Container maxWidth='sm'>
        <TextField
          rows={10}
          value={input}
          color='secondary'
          multiline
          fullWidth
          onChange={(e) => handleChangeInput(e.target.value)}
        />
      </Container>
    </Layout>
  );
};

export default ManageNotesPage;
