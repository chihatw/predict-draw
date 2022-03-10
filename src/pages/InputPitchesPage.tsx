import { useContext, useEffect, useState } from 'react';
import string2PitchesArray from 'string2pitches-array';
import { Container, TextField } from '@mui/material';
import pitchesArray2String from 'pitches-array2string';

import Layout from '../Layout';
import AppContext from '../services/context';

const InputPitchesPage = () => {
  const { handleUpdatePitchList, note1PitchList } = useContext(AppContext);

  const [input, setInput] = useState('');

  // note1PitchListを文字列化して、inputに代入
  useEffect(() => {
    // inputにすでに値がある場合は、代入しない
    if (!!input) return;
    const lines: string[] = [];
    for (const line of note1PitchList) {
      lines.push(line[0]);
      lines.push(pitchesArray2String(line[1]));
    }
    setInput(lines.join('\n'));
  }, [note1PitchList, input]);

  const handleChangeInput = (input: string) => {
    setInput(input);
    const pitchList: [string, string[][][]][] = [];
    const lines = input.split('\n').filter((i) => i);
    lines.forEach((line, index) => {
      if (index % 2) {
        const i = (index - 1) / 2;
        pitchList[i][1] = string2PitchesArray(line);
      } else {
        pitchList.push([line, []]);
      }
    });
    handleUpdatePitchList({ pitchList, note: 'note1' });
  };

  return (
    <Layout color='blue' label='Input Pitches'>
      <Container maxWidth='sm'>
        <div
          style={{
            display: 'grid',
          }}
        >
          <TextField
            rows={10}
            value={input}
            color='secondary'
            multiline
            onChange={(e) => handleChangeInput(e.target.value)}
          />
        </div>
      </Container>
    </Layout>
  );
};

export default InputPitchesPage;
