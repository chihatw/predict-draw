import * as R from 'ramda';

import { Button, useTheme } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../../../../../../App';
import { PITCH_INPUT_ITEMS } from '../../../../../../pitchInputItems';
import { PitchInputFormState } from '../../Model';

import PlayButton from './PlayButton';

import PitchLineMonitor from './PitchLineMonitor';
import { buildInput } from './services/buildInput';
import { buildDisableds } from './services/buildDisables';
import InputPane from './InputPane';
import { removeLastMora } from './services/removeLastMora';
import { updateRemoteLog } from '../../../../../../services/pitchInput';

const PitchInputPractice = ({
  state,
  dispatch,
}: {
  state: PitchInputFormState;
  dispatch: React.Dispatch<PitchInputFormState>;
}) => {
  const { state: appState } = useContext(AppContext);
  const theme = useTheme();

  const [initialize, setInitialize] = useState(true);
  const [input, setInput] = useState('');
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

  const item = Object.entries(PITCH_INPUT_ITEMS)
    .map(([key, value]) => ({
      id: key,
      ...value,
    }))
    .find((item) => item.pitchStr === currentCueId);
  if (!item) return <></>;

  const handleBackSpace = () => {
    const updatedInput = removeLastMora(input);
    setInput(updatedInput);
    updateRemoteLog(updatedInput, state.currentIndex, appState.pitchInputLogs);
  };

  const handleClickInputButton = (clicked: string, pitch: string) => {
    const updatedInput = buildInput(input, clicked, pitch);
    setInput(updatedInput);
    updateRemoteLog(updatedInput, state.currentIndex, appState.pitchInputLogs);
  };

  const handleNext = () => {
    const updatedAnswerIds: string[] = [...state.answerIds];
    updatedAnswerIds.push(input);
    const updatedState: PitchInputFormState = {
      ...state,
      answerIds: updatedAnswerIds,
      currentIndex: state.currentIndex + 1,
    };
    dispatch(updatedState);
    setInput('');
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
      {state.blob && state.audioContext ? (
        <PlayButton
          blob={state.blob}
          schedules={item.schedules}
          audioContext={state.audioContext}
          AnimationElemRef={AnimationElemRef}
        />
      ) : (
        <div style={{ height: 136 }} />
      )}

      <PitchLineMonitor input={input} handleBackSpace={handleBackSpace} />

      <InputPane
        disableds={buildDisableds(
          input,
          state.mora,
          state.hasA,
          state.hasN,
          state.hasX
        )}
        handleClickInputButton={handleClickInputButton}
      />
      <div style={{ height: 40 }} />
      <Button
        variant='contained'
        sx={{ color: 'white' }}
        disabled={input.replace('＼', '').length !== state.mora}
        onClick={handleNext}
      >
        下一題
      </Button>
    </div>
  );
};

export default PitchInputPractice;

//
