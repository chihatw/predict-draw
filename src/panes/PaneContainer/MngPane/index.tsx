import { Container, Divider } from '@mui/material';
import React, { useContext, useEffect, useMemo, useState } from 'react';

import MngBpmCalc from '../../MngBpmCalcPane';
import AppContext from '../../../services/context';
import MngTimePane from '../../ReadWriteTime/MngReadWiteTimePane';
import PageStatePane from './components/PageStatePane';
import MngBPMTrackPane from '../../BPMTrack/MngBPMTrackPane';
import MngPredictDrawPane from '../../PredictDraw/MngPredictDrawPane';
import MngWorkoutPane from '../../WorkoutItems/MngWorkoutPane';

const MngPane: React.FC<{ user: string }> = ({ user }) => {
  const { liSanPageState, kouSanPageState } = useContext(AppContext);

  const superState = useMemo(() => {
    switch (user) {
      case 'liSan':
        return liSanPageState;
      case 'kouSan':
        return kouSanPageState;
      default:
        return 'greeting';
    }
  }, [user, liSanPageState, kouSanPageState]);

  const [state, setState] = useState(superState);

  useEffect(() => {
    setState(superState);
  }, [superState]);

  return (
    <Container maxWidth='sm'>
      <div style={{ display: 'grid', rowGap: 16, padding: '8px 0' }}>
        <PageStatePane user={user} />
        <Divider />
        {(() => {
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
            case 'workoutCue':
            case 'workoutRead':
              return <MngWorkoutPane />;
            default:
              return <></>;
          }
        })()}
      </div>
    </Container>
  );
};

export default MngPane;
