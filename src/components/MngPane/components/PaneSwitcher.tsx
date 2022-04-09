import React from 'react';

import { PageState } from '../../../services/context';
import BPMTrackManagementPane from '../../BPMTrackManagementPane';

import MngBpmCalc from '../../MngBpmCalcPane';
import MngTimePane from '../../MngTimePane';
import MngPredictDrawPane from '../../MngPredictDrawPane';

const PaneSwitcher = ({ state }: { state: PageState }) => {
  switch (state) {
    case 'draw':
    case 'predict':
      return <MngPredictDrawPane />;
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
