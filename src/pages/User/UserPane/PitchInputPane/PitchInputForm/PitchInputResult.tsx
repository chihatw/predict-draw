import { SentencePitchLine } from '@chihatw/pitch-line.sentence-pitch-line';
import { Clear } from '@mui/icons-material';
import Check from '@mui/icons-material/Check';
import { useTheme } from '@mui/material';
import React from 'react';
import string2PitchesArray from 'string2pitches-array';
import { PITCH_INPUT_ITEMS } from '../../../../../pitchInputItems';
import { PitchInputFormState } from '../Model';

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
          {state.cueIds.map((cueId, index) => {
            const answerId = state.answerIds[index];
            const isCorrect = cueId == answerId;
            return (
              <div
                key={index}
                style={{ display: 'flex', alignItems: 'center' }}
              >
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
                <div
                  style={{
                    flexBasis: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <SentencePitchLine
                    pitchesArray={string2PitchesArray(cueId)}
                  />
                </div>
                <div
                  style={{
                    flexBasis: 100,
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: 4,
                    justifyContent: 'center',
                    background: isCorrect ? 'transparent' : 'rgba(255,0,0,0.1)',
                  }}
                >
                  <SentencePitchLine
                    pitchesArray={string2PitchesArray(answerId)}
                  />
                </div>
              </div>
            );
          })}
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
