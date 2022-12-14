import { css } from '@emotion/css';
import PlayCircleRounded from '@mui/icons-material/PlayCircleRounded';
import { Button, IconButton, useTheme } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../../../../../../App';
import { PITCH_WORKOUT_ITEMS } from '../../../../../../pitchWorkoutItems';
import { setPitchWorkoutAnswers } from '../../../../../../services/pitchWorkout';
import { createSourceNode } from '../../../../../../services/utils';
import { PitchWorkoutFormState } from '../../Model';
import PitchWorkoutPracticeRow from './PitchWorkoutPracticeRow';

const PitchWorkoutPractice = ({
  state,
  dispatch,
}: {
  state: PitchWorkoutFormState;
  dispatch: React.Dispatch<PitchWorkoutFormState>;
}) => {
  const { state: appState } = useContext(AppContext);
  const theme = useTheme();

  const [initialize, setInitialize] = useState(true);
  const [selectedId, setSelectedId] = useState('');
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
  const item = PITCH_WORKOUT_ITEMS[currentCueId];
  const play = async () => {
    if (!state.audioBuffer || !state.audioContext) return;

    const currentTime = state.audioContext.currentTime;
    const sourceNodes: AudioBufferSourceNode[] = [];
    await Promise.all(
      item.schedules.map(async (_) => {
        const sourceNode = await createSourceNode(
          state.audioBuffer!,
          state.audioContext!
        );
        sourceNodes.push(sourceNode);
      })
    );
    item.schedules.forEach((item, index) => {
      const sourceNode = sourceNodes[index];
      sourceNode.start(currentTime + item.offset, item.start);
      sourceNode.stop(currentTime + item.stop);
    });
  };
  const handleClickPlay = () => {
    play();
  };

  const handleClickRow = (cueId: string) => {
    cueId = selectedId === cueId ? '' : cueId;
    setSelectedId(cueId);

    let updatedTapped: string[] = [];
    if (appState.pitchWorkoutAnswers[state.currentIndex]) {
      updatedTapped = appState.pitchWorkoutAnswers[state.currentIndex];
    }
    updatedTapped.push(cueId);
    const updatedPitchListeningAnswers: { [index: number]: string[] } = {
      ...appState.pitchWorkoutAnswers,
    };
    updatedPitchListeningAnswers[state.currentIndex] = updatedTapped;
    setPitchWorkoutAnswers(updatedPitchListeningAnswers);
  };

  const handleNext = () => {
    const updatedAnswerIds: string[] = [...state.answerIds];
    updatedAnswerIds.push(selectedId);
    const updatedState: PitchWorkoutFormState = {
      ...state,
      answerIds: updatedAnswerIds,
      currentIndex: state.currentIndex + 1,
    };
    dispatch(updatedState);
    setSelectedId('');
    setInitialize(true);
  };

  return (
    <div style={{ display: 'grid', rowGap: 8 }}>
      <div
        style={{
          ...(theme.typography as any).lato100,
          color: '#555',
          fontSize: 40,
          textAlign: 'center',
        }}
      >
        <span>{state.currentIndex + 1}</span>
        <span style={{ fontSize: 32 }}> / </span>
        <span>{state.cueIds.length}</span>
      </div>
      <div
        ref={AnimationElemRef}
        className={css({
          display: 'flex',
          justifyContent: 'center',
          opacity: 1,
          transition: 'all 0.5s ease-in-out',
          transform: 'translateY(0%)',
          '&.initial': {
            opacity: 0,
            transition: '0s',
            transform: 'translateY(30%)',
          },
        })}
      >
        <IconButton color='primary' onClick={handleClickPlay}>
          <PlayCircleRounded sx={{ fontSize: 120 }} />
        </IconButton>
      </div>
      <div
        style={{
          display: 'grid',
          rowGap: 16,
          maxHeight: 260,
          overflowY: 'scroll',
          paddingTop: 24,
        }}
      >
        {Object.values(PITCH_WORKOUT_ITEMS)
          .filter((item) => item.id.length === state.mora)
          .map((item, index) => (
            <PitchWorkoutPracticeRow
              key={index}
              pitchStr={item.pitchStr}
              isSelected={selectedId === item.id}
              handleClickRow={() => handleClickRow(item.id)}
            />
          ))}
      </div>
      <div
        style={{ display: 'flex', justifyContent: 'center', paddingTop: 40 }}
      >
        <Button
          variant='contained'
          sx={{ color: 'white', width: 240 }}
          disabled={!selectedId}
          onClick={handleNext}
        >
          下一題
        </Button>
      </div>
    </div>
  );
};

export default PitchWorkoutPractice;
