import { Button, TextField } from '@mui/material';
import { useContext, useState } from 'react';
import SentencePitchLine from 'views/components/SentencePitchLine';
import { AppContext } from '../../App';
import { PitchWorkout } from '../../Model';
import { PITCH_WORKOUT_ITEMS } from '../../pitchWorkoutItems';
import {
  buildPitchWorkoutCueIds,
  setPitchWorkout,
  setPitchWorkoutAnswers,
} from '../../services/pitchWorkout';

const PitchWorkoutPane = () => {
  const { state } = useContext(AppContext);

  const [open, setOpen] = useState(false);

  const handleChangeMora = (mora: number) => {
    mora = Math.min(Math.max(mora, 2), 4);
    if (mora === state.pitchWorkout.mora) return;

    const cueIds = buildPitchWorkoutCueIds(mora);
    const updatedPitchWorkout: PitchWorkout = {
      cueIds,
      mora,
    };
    setPitchWorkout(updatedPitchWorkout);
    setPitchWorkoutAnswers({});
  };
  const handleShuffle = () => {
    const cueIds = buildPitchWorkoutCueIds(state.pitchWorkout.mora);
    const updatedPitchWorkout: PitchWorkout = {
      ...state.pitchWorkout,
      cueIds,
    };
    setPitchWorkout(updatedPitchWorkout);
    setPitchWorkoutAnswers({});
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
        <h3>Pitch Workout</h3>
        <Button onClick={() => setOpen(!open)}>{open ? 'hide' : 'open'}</Button>
      </div>
      {open && (
        <div style={{ display: 'grid', rowGap: 8 }}>
          <TextField
            label='mora'
            size='small'
            type='number'
            autoComplete='off'
            value={state.pitchWorkout.mora}
            onChange={(e) => handleChangeMora(Number(e.target.value))}
          />
          <Button variant='outlined' onClick={handleShuffle}>
            Shuffle
          </Button>
          {state.pitchWorkout.cueIds.map((cueId, index) => {
            const item = PITCH_WORKOUT_ITEMS[cueId];
            return (
              <div
                key={index}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <div style={{ flexBasis: 40, textAlign: 'center' }}>
                  {index + 1}
                </div>
                <SentencePitchLine pitchStr={item.pitchStr} />
                <div>
                  {(state.pitchWorkoutAnswers[index] || []).map((answer, i) => (
                    <span
                      key={i}
                      style={{
                        color: answer === item.id ? '#52a2aa' : 'crimson',
                        paddingLeft: 10,
                      }}
                    >
                      {answer}
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

export default PitchWorkoutPane;
