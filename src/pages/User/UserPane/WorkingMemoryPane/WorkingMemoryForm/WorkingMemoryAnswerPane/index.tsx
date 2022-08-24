import { css } from '@emotion/css';
import { Button } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { createSourceNode } from '../../../../../../services/utils';
import { setWorkingMemoryAnswerIds } from '../../../../../../services/workingMemoryWorkout';
import { WorkingMemoryFormState } from '../../Model';
import AnswerCard from './AnswerCard';
import Message from './Message';

const WorkingMemoryAnswerPane = ({
  state,
  dispatch,
}: {
  state: WorkingMemoryFormState;
  dispatch: React.Dispatch<WorkingMemoryFormState>;
}) => {
  const currentCueId = state.cueIds[state.currentIndex];
  const currentCue = state.cues[currentCueId];

  const [selectedId, setSelectedId] = useState('');
  const [initialize, setInitialize] = useState(true);

  const AnswerListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialize) {
      const AnswerList = AnswerListRef.current;
      if (!AnswerList) return;
      AnswerList.classList.add('initial');
      setInitialize(false);
      setTimeout(() => {
        AnswerList.classList.remove('initial');
      }, 0);
    }
  }, [initialize]);

  const handleTap = (cueId: string) => {
    const updatedAnswerIds = [...state.answerIds];
    updatedAnswerIds.splice(state.currentIndex, 1, cueId);
    setWorkingMemoryAnswerIds(updatedAnswerIds);

    let _selectedId = '';
    if (selectedId !== cueId) {
      _selectedId = cueId;
    }
    setSelectedId(_selectedId);
    currentCue && play();
  };

  const play = async () => {
    if (!state.blob || !state.audioContext) return;
    const sourceNode = await createSourceNode(state.blob, state.audioContext);
    sourceNode.start(0, currentCue.start, currentCue.end - currentCue.start);
  };

  const handleNext = () => {
    const updatedAnswerIds = [...state.answerIds];
    updatedAnswerIds[state.currentIndex - state.offset] = selectedId;
    const updatedState: WorkingMemoryFormState = {
      ...state,
      currentIndex: state.currentIndex + 1,
      answerIds: updatedAnswerIds,
    };
    setSelectedId('');
    setInitialize(true);
    dispatch(updatedState);
  };
  return (
    <div style={{ display: 'grid', rowGap: 16 }}>
      <Message state={state} />
      <div
        ref={AnswerListRef}
        className={css({
          height: 260,
          display: 'flex',
          overflowY: 'scroll',
          justifyContent: 'center',
          opacity: 1,
          transition: 'all 0.3s ease-in-out',
          transform: 'translateY(0%)',
          '&.initial': {
            opacity: 0.1,
            transition: '0s',
            transform: 'translateY(30%)',
          },
        })}
      >
        <div>
          <div style={{ display: 'grid', rowGap: 16 }}>
            {Object.values(state.cues).map((cue) => (
              <AnswerCard
                key={cue.id}
                selected={selectedId === cue.id}
                pitchStr={cue.pitchStr}
                handleClick={() => handleTap(cue.id)}
              />
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          sx={{ color: 'white', width: 240 }}
          variant='contained'
          disabled={!selectedId}
          onClick={handleNext}
        >
          {state.currentIndex < state.cueCount ? '記住了' : '選好了'}
        </Button>
      </div>
    </div>
  );
};

export default WorkingMemoryAnswerPane;
