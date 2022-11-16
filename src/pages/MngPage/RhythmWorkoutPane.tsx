import { Button, TextField } from '@mui/material';

import React, { useContext, useState } from 'react';

import { AppContext } from '../../App';

import { RhythmWorkout } from '../../Model';
import {
  buildCueIds,
  setRhythmWorkout,
  setRhythmWorkoutAnswers,
} from '../../services/rhythmWorkout';
import { SentencePitchLine } from '@chihatw/pitch-line.sentence-pitch-line';
import string2PitchesArray from 'string2pitches-array';
import { PITCHES } from '../../pitch';

const RhythmWorkoutPane = () => {
  const { state } = useContext(AppContext);

  const [open, setOpen] = useState(false);

  const handleChangeMora = (mora: number) => {
    mora = Math.min(Math.max(mora, 1), 3);
    if (mora === state.rhythmWorkout.mora) return;

    let cueCount = 0;
    switch (mora) {
      case 2:
        cueCount = 7;
        break;
      case 3:
        cueCount = 16;
        break;
      default:
        cueCount = 4;
    }
    const cueIds = buildCueIds(mora, cueCount);
    const updatedRhythmListening: RhythmWorkout = {
      cueCount,
      cueIds,
      mora,
    };
    setRhythmWorkout(updatedRhythmListening);
    setRhythmWorkoutAnswers({});
  };
  const handleChangeCueCount = (cueCount: number) => {
    switch (state.rhythmWorkout.mora) {
      case 2:
        cueCount = Math.min(7, cueCount);
        break;
      case 3:
        cueCount = Math.min(16, cueCount);
        break;
      default:
        cueCount = Math.min(4, cueCount);
    }
    const cueIds = buildCueIds(state.rhythmWorkout.mora, cueCount);
    const updatedRhythmListening: RhythmWorkout = {
      ...state.rhythmWorkout,
      cueCount,
      cueIds,
    };
    setRhythmWorkout(updatedRhythmListening);
    setRhythmWorkoutAnswers({});
  };

  const handleShuffle = () => {
    const cueIds = buildCueIds(
      state.rhythmWorkout.mora,
      state.rhythmWorkout.cueCount
    );
    const updatedRhythmListening: RhythmWorkout = {
      ...state.rhythmWorkout,
      cueIds,
    };
    setRhythmWorkout(updatedRhythmListening);
    setRhythmWorkoutAnswers({});
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h3>Rhythm Workout</h3>
        <Button onClick={() => setOpen(!open)}>{open ? 'hide' : 'open'}</Button>
      </div>
      {open && (
        <div style={{ display: 'grid', rowGap: 8 }}>
          <TextField
            label='mora'
            size='small'
            type='number'
            autoComplete='off'
            value={state.rhythmWorkout.mora}
            onChange={(e) => handleChangeMora(Number(e.target.value))}
          />
          <TextField
            label='cueCount'
            size='small'
            type='number'
            autoComplete='off'
            value={state.rhythmWorkout.cueCount}
            onChange={(e) => handleChangeCueCount(Number(e.target.value))}
          />
          <Button variant='outlined' onClick={handleShuffle}>
            Shuffle
          </Button>
          {state.rhythmWorkout.cueIds.map((cueId, index) => {
            const cueCard = PITCHES[cueId];
            return (
              <div
                key={index}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <div style={{ flexBasis: 40, textAlign: 'center' }}>
                  {index + 1}
                </div>
                <SentencePitchLine
                  pitchesArray={string2PitchesArray(cueCard.pitchStr)}
                />
                <div>
                  {(state.rhythmWorkoutAnswers[index] || []).map(
                    (item, itemIndex) => {
                      const isLast =
                        state.rhythmWorkoutAnswers[index].length - 1 ===
                        itemIndex;
                      return (
                        <span
                          key={itemIndex}
                          style={{
                            paddingLeft: 10,
                            color: isLast ? 'red' : '#ccc',
                          }}
                        >
                          {item}
                        </span>
                      );
                    }
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RhythmWorkoutPane;
