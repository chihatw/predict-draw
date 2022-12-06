import { useTheme } from '@mui/material';
import React from 'react';
import { PitchInputFormState } from '../../Model';
import PitchInputResultRow from './PitchInputResultRow';

const PitchInputResult = ({ state }: { state: PitchInputFormState }) => {
  const theme = useTheme();
  const correctRatio = calcCorrectRatio(state.cueIds, state.answerIds);
  if (!state.answerIds.length) return <></>;

  return (
    <div style={{ display: 'grid', rowGap: 16 }}>
      <div
        style={{
          ...(theme.typography as any).lato900,
          textAlign: 'center',
          fontSize: 100,
        }}
      >{`${correctRatio}%`}</div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            width: 280,
            display: 'grid',
            rowGap: 8,
          }}
        >
          <div style={{ display: 'flex' }}>
            <div style={{ flexBasis: 80 }}></div>
            <div
              style={{
                ...(theme.typography as any).mRounded300,
                flexBasis: 100,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 14,
                color: '#aaa',
              }}
            >
              播放
            </div>
            <div
              style={{
                ...(theme.typography as any).mRounded300,
                flexBasis: 100,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 14,
                color: '#aaa',
              }}
            >
              回答
            </div>
          </div>
          {state.cueIds.map((cueId, index) => (
            <PitchInputResultRow index={index} cueId={cueId} state={state} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PitchInputResult;

const calcCorrectRatio = (cueIds: string[], answerIds: string[]) => {
  let correctCount = 0;
  answerIds.forEach((answerId, index) => {
    const cueId = cueIds[index];
    if (answerId === cueId) {
      correctCount++;
    }
  });
  const correctRatio = Math.round((correctCount / cueIds.length) * 100);
  return correctRatio;
};
