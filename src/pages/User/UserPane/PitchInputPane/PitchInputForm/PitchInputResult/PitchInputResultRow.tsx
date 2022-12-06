import { Clear } from '@mui/icons-material';
import Check from '@mui/icons-material/Check';
import { useTheme } from '@mui/material';
import React from 'react';
import { PITCH_INPUT_ITEMS } from '../../../../../../pitchInputItems';
import { PitchInputFormState } from '../../Model';
import PitchInputResultCell from './PitchInputResultCell';

const PitchInputResultRow = ({
  index,
  state,
  cueId,
}: {
  index: number;
  cueId: string;
  state: PitchInputFormState;
}) => {
  const theme = useTheme();

  const correct = Object.values(PITCH_INPUT_ITEMS).find(
    (item) => item.pitchStr === cueId
  ) || { pitchStr: '', schedules: [] };
  const answerId = state.answerIds[index];
  const answer = Object.values(PITCH_INPUT_ITEMS).find(
    (item) => item.pitchStr === answerId
  ) || { pitchStr: '', schedules: [] };
  const isCorrect = cueId == answerId;

  return (
    <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
      <div
        style={{
          ...(theme.typography as any).mRounded300,
          flexBasis: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 14,
          color: '#555',
        }}
      >
        {index + 1}
      </div>
      <div
        style={{
          flexBasis: 40,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: isCorrect ? '#52a2aa' : 'red',
        }}
      >
        {isCorrect ? <Check /> : <Clear />}
      </div>
      <PitchInputResultCell
        cueId={cueId}
        state={state}
        schedules={correct.schedules}
      />
      <PitchInputResultCell
        isCorrect={isCorrect}
        cueId={answerId}
        state={state}
        schedules={answer.schedules}
      />
    </div>
  );
};

export default PitchInputResultRow;
