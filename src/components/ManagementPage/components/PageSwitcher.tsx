import { Container } from '@mui/material';
import React, { useContext } from 'react';

import { useBpmCalc } from '../../../services/useBpmCalc';
import Greeting from '../../Greeting';
import TalkingToLiSan from '../../TalkingToLiSan';
import TalkingToKouSan from '../../TalkingToKouSan';
import AppContext, { PageState } from '../../../services/context';
import BPMTrackManagementPage from '../../BPMTrackManagementPage';
import { Predict } from '../../../pages/predict';
import usePredict from '../../../services/usePredict';
import { Draw } from '../../../pages/draw';

const PageSwitcher = ({ user, state }: { user: string; state: PageState }) => {
  const { drawn, newGameAt, predict, yesRatio, updateDrawn, updatePredict } =
    usePredict();

  const { bpm, isRunning } = useBpmCalc();

  switch (state) {
    case 'greeting':
      return <Greeting />;
    case 'talkingToLiSan':
      return <TalkingToLiSan />;
    case 'talkingToKouSan':
      return <TalkingToKouSan />;
    case 'predict':
      return (
        <Predict
          yesRatio={yesRatio}
          opponent={user === 'liSan' ? '黄さん' : '李さん'}
          newGameAt={newGameAt}
          superPredict={predict}
          superHandlePredict={updatePredict}
          isManagementMode
        />
      );
    case 'draw':
      return (
        <Draw
          yesRatio={yesRatio}
          newGameAt={newGameAt}
          superDrawn={drawn}
          superHandleDrawn={updateDrawn}
          isManagementMode
        />
      );
    case 'bpmCalc':
      return (
        <Container maxWidth='sm' sx={{ paddingTop: 1 }}>
          <div>{isRunning ? '計測中' : '待機中'}</div>
          <div>{`BPM: ${bpm}`}</div>
        </Container>
      );
    case 'bpmTrack':
      return <BPMTrackManagementPage />;
    default:
      return <></>;
  }
};

export default PageSwitcher;
