import React from 'react';

import { PageState } from '../../../services/context';
import MngBPMTrackPane from '../../BPMTrack/MngBPMTrackPane';

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
      return <MngBPMTrackPane />;
    case 'readTimePerformance':
      return <MngTimePane />;
    default:
      return <></>;
  }
};

export default PaneSwitcher;
