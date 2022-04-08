import { Container } from '@mui/material';
import React from 'react';

import { useBpmCalc } from '../../../services/useBpmCalc';
import Greeting from '../../Greeting';
import TalkingToLiSan from '../../TalkingToLiSan';
import TalkingToKouSan from '../../TalkingToKouSan';
import { PageState } from '../../../services/context';
import BPMTrackManagementPane from '../../BPMTrackManagementPane';
import { PredictPane } from '../../PredictDraw/PredictPane';
import { Draw } from '../../PredictDraw/DrawPane';

const PageSwitcher = ({ user, state }: { user: string; state: PageState }) => {
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
        <PredictPane
          opponent={user === 'liSan' ? '黄さん' : '李さん'}
          isManagementMode
        />
      );
    case 'draw':
      return <Draw isManagementMode />;
    case 'bpmCalc':
      return (
        <Container maxWidth='sm' sx={{ paddingTop: 1 }}>
          <div>{isRunning ? '計測中' : '待機中'}</div>
          <div>{`BPM: ${bpm}`}</div>
        </Container>
      );
    case 'bpmTrack':
      return <BPMTrackManagementPane />;
    default:
      return <></>;
  }
};

export default PageSwitcher;
