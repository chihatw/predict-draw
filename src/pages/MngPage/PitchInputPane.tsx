import { Button, FormControlLabel, Switch, TextField } from '@mui/material';
import { useContext, useState } from 'react';
import SentencePitchLine from 'views/components/SentencePitchLine';
import { AppContext } from '../../App';
import { PitchInput } from '../../Model';
import { PITCH_INPUT_ITEMS } from '../../pitchInputItems';
import { setPitchInput, setPitchInputLogs } from '../../services/pitchInput';
import { shuffle } from '../../services/utils';

const PitchInputPane = () => {
  const { state } = useContext(AppContext);

  const [open, setOpen] = useState(false);

  const handleChangeMora = (mora: number) => {
    mora = Math.min(Math.max(mora, 2), 4);
    if (mora === state.pitchInput.mora) return;

    const cueIds = buildPitchInputCueIds(
      mora,
      state.pitchInput.normalOnly,
      state.pitchInput.hasA,
      state.pitchInput.hasN,
      state.pitchInput.hasX
    );
    const updatedPitchInput: PitchInput = {
      ...state.pitchInput,
      cueIds,
      mora,
    };
    setPitchInput(updatedPitchInput);
    setPitchInputLogs({});
  };

  const handleChangeNormalOnly = (normalOnly: boolean) => {
    const cueIds = buildPitchInputCueIds(
      state.pitchInput.mora,
      normalOnly,
      state.pitchInput.hasA,
      state.pitchInput.hasN,
      state.pitchInput.hasX
    );
    const updatedPitchInput: PitchInput = {
      ...state.pitchInput,
      normalOnly,
      cueIds,
    };
    setPitchInput(updatedPitchInput);
    setPitchInputLogs({});
  };

  const handleChangeHasA = (hasA: boolean) => {
    const cueIds = buildPitchInputCueIds(
      state.pitchInput.mora,
      state.pitchInput.normalOnly,
      hasA,
      state.pitchInput.hasN,
      state.pitchInput.hasX
    );
    const updatedPitchInput: PitchInput = {
      ...state.pitchInput,
      hasA,
      cueIds,
    };
    setPitchInput(updatedPitchInput);
    setPitchInputLogs({});
  };

  const handleChangeHasN = (hasN: boolean) => {
    const cueIds = buildPitchInputCueIds(
      state.pitchInput.mora,
      state.pitchInput.normalOnly,
      state.pitchInput.hasA,
      hasN,
      state.pitchInput.hasX
    );
    const updatedPitchInput: PitchInput = {
      ...state.pitchInput,
      hasN,
      cueIds,
    };
    setPitchInput(updatedPitchInput);
    setPitchInputLogs({});
  };

  const handleChangeHasX = (hasX: boolean) => {
    const cueIds = buildPitchInputCueIds(
      state.pitchInput.mora,
      state.pitchInput.normalOnly,
      state.pitchInput.hasA,
      state.pitchInput.hasN,
      hasX
    );
    const updatedPitchInput: PitchInput = {
      ...state.pitchInput,
      hasX,
      cueIds,
    };
    setPitchInput(updatedPitchInput);
    setPitchInputLogs({});
  };

  const handleShuffle = () => {
    const cueIds = buildPitchInputCueIds(
      state.pitchInput.mora,
      state.pitchInput.normalOnly,
      state.pitchInput.hasA,
      state.pitchInput.hasN,
      state.pitchInput.hasX
    );
    const updatedPitchInput: PitchInput = {
      ...state.pitchInput,
      cueIds,
    };
    setPitchInput(updatedPitchInput);
    setPitchInputLogs({});
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
        <h3>Pitch Input</h3>
        <Button onClick={() => setOpen(!open)}>{open ? 'hide' : 'open'}</Button>
      </div>
      {open && (
        <div style={{ display: 'grid', rowGap: 8 }}>
          <TextField
            label='mora'
            size='small'
            type='number'
            autoComplete='off'
            value={state.pitchInput.mora}
            onChange={(e) => handleChangeMora(Number(e.target.value))}
          />
          <FormControlLabel
            label='普通拍'
            control={
              <Switch
                checked={state.pitchInput.normalOnly}
                onChange={(_, checked) => handleChangeNormalOnly(checked)}
              />
            }
          />
          <FormControlLabel
            label='ー'
            control={
              <Switch
                checked={state.pitchInput.hasA}
                onChange={(_, checked) => handleChangeHasA(checked)}
              />
            }
          />
          <FormControlLabel
            label='ん'
            control={
              <Switch
                checked={state.pitchInput.hasN}
                onChange={(_, checked) => handleChangeHasN(checked)}
              />
            }
          />
          <FormControlLabel
            label='っ'
            control={
              <Switch
                checked={state.pitchInput.hasX}
                onChange={(_, checked) => handleChangeHasX(checked)}
              />
            }
          />

          <Button variant='outlined' onClick={handleShuffle}>
            Shuffle
          </Button>
          {state.pitchInput.cueIds.map((cueId, index) => {
            const item = Object.values(PITCH_INPUT_ITEMS).find(
              (item) => item.pitchStr === cueId
            ) || { pitchStr: '', schedules: [] };
            return (
              <div
                key={index}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <div style={{ flexBasis: 40, textAlign: 'center' }}>
                  {index + 1}
                </div>

                <SentencePitchLine pitchStr={item.pitchStr} />

                <div style={{ fontSize: 12, paddingLeft: 24 }}>
                  {state.pitchInputLogs[index] || ''}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PitchInputPane;

export const buildPitchInputCueIds = (
  mora: number,
  normalOnly: boolean,
  hasA: boolean,
  hasN: boolean,
  hasX: boolean
): string[] => {
  const cueIds = Object.values(PITCH_INPUT_ITEMS)
    .filter(({ pitchStr }) => {
      const pitchStrWithoutAccentMark = pitchStr.replace('＼', '');
      let result = pitchStrWithoutAccentMark.length === mora;

      // 「普通拍」が選ばれていない時、特殊拍が含まれていなければ false
      if (
        !normalOnly &&
        !pitchStr.includes('ー') &&
        !pitchStr.includes('ン') &&
        !pitchStr.includes('ッ')
      ) {
        result = false;
      }

      if (!hasA && pitchStr.includes('ー')) {
        result = false;
      }

      if (!hasN && pitchStr.includes('ン')) {
        result = false;
      }

      if (!hasX && pitchStr.includes('ッ')) {
        result = false;
      }

      return result;
    })
    .map(({ pitchStr }) => pitchStr);
  return shuffle(cueIds);
};
