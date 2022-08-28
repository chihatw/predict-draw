import { css } from '@emotion/css';
import PlayCircleRounded from '@mui/icons-material/PlayCircleRounded';
import { Button, IconButton, useTheme } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../../../../../App';
import { setRhythmListeningAnswers } from '../../../../../services/rhythmListening';
import { createSourceNode } from '../../../../../services/utils';
import { CARDS } from '../../RhythmListPane';
import { RhythmListeningFormState } from '../Model';
import RhythmListeningAnswerRow from './RhythmListeningAnswerRow';

const RhythmListeningAnswer = ({
  state,
  dispatch,
}: {
  state: RhythmListeningFormState;
  dispatch: React.Dispatch<RhythmListeningFormState>;
}) => {
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);
  const theme = useTheme();

  const [initialize, setInitialize] = useState(true);
  const [selectedId, setSelectedId] = useState('');
  const AnimationElemRef = useRef<HTMLDivElement>(null);

  const currentCueId = state.cueIds[state.currentIndex];
  const currentCue = CARDS[currentCueId];
  const play = async () => {
    if (!state.blob || !state.audioContext) return;
    const sourceNode = await createSourceNode(state.blob, state.audioContext);
    sourceNode.start(0, currentCue.start, currentCue.end - currentCue.start);
  };
  const handleClickPlay = () => {
    play();
  };
  const handleClickRow = (cueId: string) => {
    cueId = selectedId === cueId ? '' : cueId;
    setSelectedId(cueId);

    let updatedTapped: string[] = [];
    if (appState.rhythmListeningAnswers[state.currentIndex]) {
      updatedTapped = appState.rhythmListeningAnswers[state.currentIndex];
    }
    updatedTapped.push(cueId);
    const updatedRhythmListeningAnswers: { [index: number]: string[] } = {
      ...appState.rhythmListeningAnswers,
    };
    updatedRhythmListeningAnswers[state.currentIndex] = updatedTapped;
    setRhythmListeningAnswers(updatedRhythmListeningAnswers);
  };
  const handleNext = () => {
    const updatedAnswerIds: string[] = [...state.answerIds];
    updatedAnswerIds.push(selectedId);
    const updatedState: RhythmListeningFormState = {
      ...state,
      answerIds: updatedAnswerIds,
      currentIndex: state.currentIndex + 1,
    };
    console.log(updatedState);
    dispatch(updatedState);
    setSelectedId('');
    setInitialize(true);
  };

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
  return (
    <div style={{ display: 'grid', rowGap: 8 }}>
      <div style={{ textAlign: 'center', display: 'grid', rowGap: 8 }}>
        <div
          style={{
            ...(theme.typography as any).lato100,
            color: '#555',
            fontSize: 40,
          }}
        >
          <span>{state.currentIndex + 1}</span>
          <span style={{ fontSize: 32 }}> / </span>
          <span>{state.cueIds.length}</span>
        </div>
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
        {Object.values(CARDS)
          .filter((item) => state.cueIds.includes(item.id))
          .map((card, index) => (
            <RhythmListeningAnswerRow
              key={index}
              pitchStr={card.pitchStr}
              isSelected={selectedId === card.id}
              handleClickRow={() => handleClickRow(card.id)}
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

export default RhythmListeningAnswer;
