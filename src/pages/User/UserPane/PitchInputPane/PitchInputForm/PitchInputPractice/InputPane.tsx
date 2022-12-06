import { Button } from '@mui/material';
import React from 'react';

const BUTTON_LABELS = 'ターンッ'.split('');

const InputPane = ({
  disableds,
  handleClickInputButton,
}: {
  disableds: { highs: boolean[]; lows: boolean[] };
  handleClickInputButton: (clicked: string, pitch: string) => void;
}) => {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', columnGap: 8 }}>
        <div style={{ flexBasis: 60, textAlign: 'center' }}>高</div>
        {BUTTON_LABELS.map((label, index) => (
          <InputButton
            key={index}
            label={label}
            disabled={disableds.highs[index]}
            handleClick={() => handleClickInputButton(label, 'high')}
          />
        ))}
      </div>
      <div style={{ borderTop: '5px dashed #ccc' }} />
      <div style={{ display: 'flex', alignItems: 'center', columnGap: 8 }}>
        <div style={{ flexBasis: 60, textAlign: 'center' }}>低</div>
        {BUTTON_LABELS.map((label, index) => (
          <InputButton
            key={index}
            label={label}
            disabled={disableds.lows[index]}
            handleClick={() => handleClickInputButton(label, 'low')}
          />
        ))}
      </div>
    </>
  );
};

export default InputPane;

const InputButton = ({
  label,
  disabled,
  handleClick,
}: {
  label: string;
  disabled: boolean;
  handleClick: () => void;
}) => {
  return (
    <Button
      variant='outlined'
      sx={{ flexGrow: 1, visibility: disabled ? 'hidden' : 'visible' }}
      disabled={disabled}
      onClick={handleClick}
    >
      {label}
    </Button>
  );
};
