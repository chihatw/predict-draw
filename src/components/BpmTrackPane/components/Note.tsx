import React from 'react';
import { MusicNote } from '@mui/icons-material';

const RED = '#f50057';

const Note = ({ height, isActive }: { height: number; isActive: boolean }) => (
  <div
    style={{
      width: height / 2,
      height: height,
      display: 'flex',
      alignItems: 'center',
    }}
  >
    <div
      style={{
        transform: 'scaleY(1.2)',
        transformOrigin: 'top center',
      }}
    >
      <MusicNote
        sx={{ fontSize: height / 2, color: isActive ? RED : 'inherit' }}
      />
    </div>
  </div>
);

export default Note;
