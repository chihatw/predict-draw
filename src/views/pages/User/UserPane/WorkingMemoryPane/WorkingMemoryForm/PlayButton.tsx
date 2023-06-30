import { css } from '@emotion/css';
import { PlayCircleRounded } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { PITCHES } from '../../../../../../pitch';
import { createSourceNode } from '../../../../../../services/utils';
import { WorkingMemoryFormState } from '../Model';

const PlayButton = ({
  state,
  dispatch,
}: {
  state: WorkingMemoryFormState;
  dispatch: React.Dispatch<WorkingMemoryFormState>;
}) => {
  const [initialize, setInitialize] = useState(true);
  const AnimationElemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialize) {
      const AnswerList = AnimationElemRef.current;
      if (!AnswerList) return;
      AnswerList.classList.add('initial');
      setInitialize(false);
      setTimeout(() => {
        AnswerList.classList.remove('initial');
      }, 0);
    }
  }, [initialize]);

  const currentCueId = state.cueIds[state.currentIndex];
  const currentCue = state.cues[currentCueId];
  const play = async () => {
    if (!state.audioBuffer || !state.audioContext) return;
    const id = currentCue.id;
    const pitch = PITCHES[id];
    const sourceNode = createSourceNode(state.audioBuffer, state.audioContext);
    sourceNode.start(0, pitch.start, pitch.end - pitch.start);
  };

  const handleClick = () => {
    const updatedState: WorkingMemoryFormState = {
      ...state,
      currentIndex: state.currentIndex + 1,
    };
    setInitialize(true);
    dispatch(updatedState);
  };

  return (
    <div>
      <div
        style={{
          paddingTop: 40,
          paddingBottom: 120,
          display: 'flex',
          justifyContent: 'center',
          color: '#555',
        }}
      >
        <div>
          <span>請</span>
          <span style={{ fontWeight: 'bold', margin: '0 2px' }}>記住</span>
          <span>播放的語音</span>
        </div>
      </div>
      <div
        ref={AnimationElemRef}
        className={css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 1,
          transition: 'all 0.3s ease-in-out',
          transform: 'translateY(0%)',
          '&.initial': {
            opacity: 0,
            transition: '0s',
            transform: 'translateY(50%)',
          },
        })}
      >
        <IconButton color='primary' onClick={play}>
          <PlayCircleRounded sx={{ fontSize: 120 }} />
        </IconButton>
      </div>
      <div
        style={{ display: 'flex', justifyContent: 'center', paddingTop: 80 }}
      >
        <Button
          sx={{ color: 'white', width: 240 }}
          variant='contained'
          onClick={handleClick}
        >
          記住了
        </Button>
      </div>
    </div>
  );
};

export default PlayButton;
