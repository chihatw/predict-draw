import React from 'react';
import { Container } from '@mui/material';

import { useBpmCalc } from '../../../services/useBpmCalc';
import { PageState } from '../../../services/context';
import BPMTrackManagementPane from '../../BPMTrackManagementPane';
import { PredictPane } from '../../PredictDraw/PredictPane';
import { Draw } from '../../PredictDraw/DrawPane';
import MngTimePane from '../../MngTimePane';
import MngBpmCalc from '../../MngBpmCalcPane';

const PaneSwitcher = ({ user, state }: { user: string; state: PageState }) => {
  switch (state) {
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
      return <MngBpmCalc />;
    case 'bpmTrack':
      return <BPMTrackManagementPane />;
    case 'readTimePerformance':
      return <MngTimePane />;
    default:
      return <></>;
  }
};

export default PaneSwitcher;
