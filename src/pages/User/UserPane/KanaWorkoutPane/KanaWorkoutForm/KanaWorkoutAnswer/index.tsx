import { css } from '@emotion/css';
import PlayCircleRounded from '@mui/icons-material/PlayCircleRounded';
import { Button, IconButton, useTheme } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../../../../../../App';
import { KANAS } from '../../../../../../kana';
import { KanaWorkoutParams } from '../../../../../../Model';
import { setKanaWorkoutParams } from '../../../../../../services/kanaCard';
import { createSourceNode } from '../../../../../../services/utils';
import { KanaWorkoutState } from '../../Model';
import KanaWorkoutAnswerRow from './KanaWorkoutAnswerRow';

const KanaWorkoutAnswer = ({
  state,
  dispatch,
}: {
  state: KanaWorkoutState;
  dispatch: React.Dispatch<KanaWorkoutState>;
}) => {
  const { state: appState } = useContext(AppContext);
  const theme = useTheme();

  const [initialize, setInitialize] = useState(true);
  const [selectedKana, setSelectedKana] = useState('');
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
  const currentKana = Object.values(KANAS).find((item) =>
    [item.hira, item.kata].includes(currentCueId)
  ) || { id: '', start: 0, end: 0, hira: '', kata: '' };

  const play = async () => {
    if (!state.audioBuffer || !state.audioContext) return;
    const sourceNode = await createSourceNode(
      state.audioBuffer,
      state.audioContext
    );
    sourceNode.start(0, currentKana.start, currentKana.end - currentKana.start);
  };

  const handleClickPlay = () => {
    play();
  };

  const handleClickRow = (kana: string) => {
    kana = selectedKana === kana ? '' : kana;
    setSelectedKana(kana);

    if (!kana) return;
    let updatedAnswer: string[] = [];

    if (appState.params.kanaWorkout.answers[state.currentIndex]) {
      updatedAnswer = appState.params.kanaWorkout.answers[state.currentIndex];
    }
    updatedAnswer.push(kana);
    const updatedAnswers = {
      ...appState.params.kanaWorkout.answers,
      [state.currentIndex]: updatedAnswer,
    };

    const updatedKanaWorkoutParams: KanaWorkoutParams = {
      ...appState.params.kanaWorkout,
      answers: updatedAnswers,
    };

    setKanaWorkoutParams(updatedKanaWorkoutParams);
  };
  const handleNext = () => {
    const updatedAnswers: string[] = [...state.answers];
    updatedAnswers.push(selectedKana);
    const updatedState: KanaWorkoutState = {
      ...state,
      answers: updatedAnswers,
      currentIndex: state.currentIndex + 1,
    };
    dispatch(updatedState);
    setSelectedKana('');
    setInitialize(true);
  };

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
          gridAutoFlow: 'column',
          gridTemplateRows: 'repeat(5, 1fr)',
          rowGap: 16,
          columnGap: 16,
          maxHeight: 260,
          overflowY: 'scroll',
          paddingTop: 24,
        }}
      >
        {state.kanas.map((kana, index) => {
          const kanaCard = Object.values(KANAS).find((item) =>
            [item.hira, item.kata].includes(kana)
          ) || { id: '', start: 0, end: 0, hira: '', kata: '' };

          return (
            <KanaWorkoutAnswerRow
              key={index}
              kana={!!kanaCard.id ? kana : ''}
              isSelected={selectedKana === kana}
              handleClickRow={() => handleClickRow(kana)}
            />
          );
        })}
      </div>
      <div
        style={{ display: 'flex', justifyContent: 'center', paddingTop: 40 }}
      >
        <Button
          variant='contained'
          sx={{ color: 'white', width: 240 }}
          disabled={!selectedKana}
          onClick={handleNext}
        >
          下一題
        </Button>
      </div>
    </div>
  );
};

export default KanaWorkoutAnswer;
