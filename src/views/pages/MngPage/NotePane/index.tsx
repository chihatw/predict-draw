import { Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { NoteState } from '../../../../Model';
import { setNote } from '../../../../services/note';

const LOCAL_STORAGE = 'notePane';

const NotePane = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');

  useEffect(() => {
    const value = localStorage.getItem(LOCAL_STORAGE);
    setOpen(value === String(true));
  }, []);

  const handleInput = (input: string) => {
    setInput(input);

    const lines = input.split('\n').filter((i) => i);

    const texts: string[] = [];
    const pitchStrs: string[] = [];

    for (let i = 0; i < lines.length; i = i + 2) {
      texts.push(lines[i]);
      pitchStrs.push(lines[i + 1] || '');
    }

    const noteState: NoteState = {
      texts,
      pitches: pitchStrs,
    };
    setNote(noteState);
  };

  const handleClickTitle = () => {
    const updatedOpen = !open;
    setOpen(updatedOpen);
    localStorage.setItem(LOCAL_STORAGE, String(updatedOpen));
  };
  return (
    <div style={{ display: 'grid', rowGap: 8 }}>
      <Button
        fullWidth
        sx={{ color: 'black', justifyContent: 'flex-start' }}
        onClick={handleClickTitle}
      >
        <h3>Note</h3>
      </Button>

      {open && (
        <TextField
          multiline
          rows={20}
          value={input}
          onChange={(e) => handleInput(e.target.value)}
        />
      )}
    </div>
  );
};

export default NotePane;
