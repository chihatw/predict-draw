import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';

import { NoteState } from '../../Model';
import { setNote } from '../../services/note';

const NotePane = () => {
  const [open, setOpen] = useState(true);
  const [input, setInput] = useState('');
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
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h3>Note</h3>
        <Button onClick={() => setOpen(!open)}>{open ? 'hide' : 'open'}</Button>
      </div>
      {open && (
        <>
          <TextField
            multiline
            rows={20}
            value={input}
            onChange={(e) => handleInput(e.target.value)}
          />
        </>
      )}
    </>
  );
};

export default NotePane;
