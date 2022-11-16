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

const CUE_COUNT: { [key: number]: number } = {
  2: 4,
  3: 7,
  4: 16,
};

const RhythmWorkoutPane = () => {
  const { state } = useContext(AppContext);

  const [open, setOpen] = useState(false);

  const handleChangeMora = (mora: number) => {
    mora = Math.min(Math.max(mora, 2), 4);
    if (mora === state.rhythmWorkout.mora) return;

    const cueCount = CUE_COUNT[mora];
    const cueIds = buildCueIds(mora, cueCount);
    const updatedRhythmWorkout: RhythmWorkout = {
      cueCount,
      cueIds,
      mora,
    };
    setRhythmWorkout(updatedRhythmWorkout);
    setRhythmWorkoutAnswers({});
  };
  const handleChangeCueCount = (cueCount: number) => {
    const mora = state.rhythmWorkout.mora;
    cueCount = Math.min(CUE_COUNT[mora], cueCount);

    const cueIds = buildCueIds(state.rhythmWorkout.mora, cueCount);
    const updatedRhythmWorkout: RhythmWorkout = {
      ...state.rhythmWorkout,
      cueCount,
      cueIds,
    };
    setRhythmWorkout(updatedRhythmWorkout);
    setRhythmWorkoutAnswers({});
  };

  const handleShuffle = () => {
    const cueIds = buildCueIds(
      state.rhythmWorkout.mora,
      state.rhythmWorkout.cueCount
    );
    const updatedRhythmWorkout: RhythmWorkout = {
      ...state.rhythmWorkout,
      cueIds,
    };
    setRhythmWorkout(updatedRhythmWorkout);
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
                  {(state.rhythmWorkoutAnswers[index] || []).map((item, i) => (
                    <span
                      key={i}
                      style={{
                        color: cueId === item ? '#52a2aa' : 'crimson',
                        paddingLeft: 10,
                      }}
                    >
                      {item}
                    </span>
                  ))}
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
