import { Button, useTheme } from '@mui/material';
import React from 'react';
import {
  buildCueIds,
  setWorkingMemoryAnswerIds,
  updateWorkingMemoryCueIds,
} from '../../../../../../services/workingMemoryWorkout';
import { WorkingMemoryFormState } from '../../Model';
import AnswerListHeader from './AnswerListHeader';
import AnswerRow from './AnswerRow';

const WorkingMemoryResultPane = ({
  state,
  dispath,
}: {
  state: WorkingMemoryFormState;
  dispath: React.Dispatch<WorkingMemoryFormState>;
}) => {
  if (!state.answerIds.length) return <></>;

  const theme = useTheme();
  let correctCount = 0;
  state.answerIds.forEach((answerId, index) => {
    const cueId = state.cueIds[index] || '';
    if (answerId === cueId) {
      correctCount++;
    }
  });
  const correctRatio = Math.round((correctCount / state.cueCount) * 100);

  const handleReset = () => {
    const updatedCueIds = buildCueIds(Object.keys(state.cues), state.cueCount);
    const updatedState: WorkingMemoryFormState = {
      ...state,
      cueIds: updatedCueIds,
      answerIds: [],
      currentIndex: 0,
    };
    dispath(updatedState);
    updateWorkingMemoryCueIds(updatedCueIds);
    setWorkingMemoryAnswerIds([]);
  };

  return (
    <div style={{ display: 'grid', rowGap: 8, color: '#555' }}>
      <div style={{ textAlign: 'center' }}>
        <span>正解率:</span>
        <span
          style={{
            ...(theme.typography as any).lato900,

            fontSize: 100,
          }}
        >
          {correctRatio}
        </span>
        <span>%</span>
      </div>
      <div style={{ display: 'grid', rowGap: 8 }}>
        <AnswerListHeader />
        {state.cueIds.map((_, index) => (
          <AnswerRow key={index} state={state} index={index} />
        ))}
      </div>
      <div style={{ textAlign: 'center', paddingTop: 40 }}>
        <Button variant='outlined' sx={{ width: 240 }} onClick={handleReset}>
          Reset
        </Button>
      </div>
    </div>
  );
};

export default WorkingMemoryResultPane;
