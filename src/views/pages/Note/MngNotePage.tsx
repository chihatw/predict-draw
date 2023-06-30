import { Container, TextField } from '@mui/material';
import { useContext, useEffect, useState } from 'react';

import { AppContext } from '../..';
import { buildInput, buildPitchList, setNote } from '../../../services/note';
import Layout from '../../Layout';

const MngNotePage = () => {
  const { state } = useContext(AppContext);
  const { note } = state;
  const [input, setInput] = useState('');
  useEffect(() => {
    if (!!input) return;
    const superInput = buildInput(note);
    setInput(superInput);
  }, [note]);

  const handleChangeInput = (input: string) => {
    setInput(input);
    const noteState = buildPitchList(input);
    setNote(noteState);
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

export default MngNotePage;
