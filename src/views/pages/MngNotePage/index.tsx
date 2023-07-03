import { Container, TextField } from '@mui/material';

import { buildNoteStr } from 'application/note/core/2-services';
import { noteActions } from 'application/note/framework/0-reducer';
import { RootState } from 'main';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../Layout';

const MngNotePage = () => {
  const dispatch = useDispatch();
  const note = useSelector((state: RootState) => state.note);
  const [value, setValue] = useState('');

  useEffect(() => {
    if (!!value) return;
    setValue(buildNoteStr(note));
  }, [value, note]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    dispatch(noteActions.update(e.target.value));
  };

  return (
    <Layout color='blue' label='Input Pitches'>
      <Container maxWidth='sm'>
        <TextField
          rows={10}
          value={value}
          color='secondary'
          multiline
          fullWidth
          onChange={handleChange}
        />
      </Container>
    </Layout>
  );
};

export default MngNotePage;
