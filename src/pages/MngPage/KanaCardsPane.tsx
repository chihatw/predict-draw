import getMoras from 'get-moras';
import downpitch_120 from '../../assets/audios/downpitch_120.mp3';
import { Button, IconButton, TextField } from '@mui/material';

import React, { useContext, useState } from 'react';
import { AppContext } from '../../App';
import { KanaCards } from '../../Model';
import Delete from '@mui/icons-material/Delete';

import { setKanaCards } from '../../services/kanaCard';

const KanaCardsPane = () => {
  const { state } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const handleChangeInput = (input: string) => {
    setInput(input);
    let moras = getMoras(input);
    moras = moras.filter((item) => item !== '\n');
    const updatedKanaCards: KanaCards = {
      ...state.kanaCards,
      kanas: moras,
    };
    setKanaCards(updatedKanaCards);
  };

  const handleClearTapped = () => {
    const updatedKanaCards: KanaCards = {
      ...state.kanaCards,
      tapped: [],
    };
    setKanaCards(updatedKanaCards);
  };

  return (
    <div style={{ display: 'grid', rowGap: 8 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h3>Kana Cards</h3>
        <Button onClick={() => setOpen(!open)}>{open ? 'hide' : 'open'}</Button>
      </div>
      {open && (
        <div style={{ display: 'grid', rowGap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <h4 style={{ flexBasis: 80 }}>tapped</h4>
              <div>{state.kanaCards.tapped.join(', ')}</div>
            </div>
            <IconButton onClick={handleClearTapped}>
              <Delete />
            </IconButton>
          </div>
          <TextField
            label='kanas string'
            multiline
            rows={2}
            value={input}
            onChange={(e) => handleChangeInput(e.target.value)}
          />
          <h4>workout</h4>
          <div style={{ fontSize: 14 }}>
            {state.params.kanaWorkout.kanas.map((kana, index) => {
              const answer: string[] =
                state.params.kanaWorkout.answers[index] || [];
              return (
                <div
                  key={index}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <div style={{ flexBasis: 40, textAlign: 'center' }}>
                    {index + 1}
                  </div>
                  <div style={{ flexBasis: 60, textAlign: 'center' }}>
                    {kana}
                  </div>
                  <div>
                    {answer.map((item, index) => {
                      const isLast = answer.length === index + 1;
                      const isWrong = item !== kana;
                      return (
                        <span
                          key={index}
                          style={{
                            paddingRight: isLast ? 0 : '0.5em',
                            fontSize: 12,
                            color: isLast ? (isWrong ? 'red' : '#555') : '#aaa',
                          }}
                        >
                          {item}
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default KanaCardsPane;
