import { Container } from '@mui/material';
import React, { useContext, useEffect, useMemo, useState } from 'react';

import AppContext from '../../services/context';
import PaneSwitcher from './components/PaneSwitcher';
import PageStatePane from './components/PageStatePane';
import YesRatioSlider from './components/YesRatioSlider';
import NewGameButton from './components/NewGameButton';
import PredictPane from './components/PredictPane';
import { useTimes } from '../../services/useTimes';

const MngPane: React.FC<{ user: string }> = ({ user }) => {
  const { liSanPageState, kouSanPageState } = useContext(AppContext);

  const _state = useMemo(() => {
    switch (user) {
      case 'liSan':
        return liSanPageState;
      case 'kouSan':
        return kouSanPageState;
      default:
        return 'greeting';
    }
  }, [user, liSanPageState, kouSanPageState]);

  const [state, setState] = useState(_state);

  useEffect(() => {
    setState(_state);
  }, [_state]);

  return (
    <>
      <Container maxWidth='sm'>
        <div style={{ display: 'grid', rowGap: 16, padding: '8px 0' }}>
          <PageStatePane state={state} user={user} setState={setState} />
          <YesRatioSlider />
          <PredictPane />
          <NewGameButton />
          <PaneSwitcher user={user} state={state} />
        </div>
      </Container>
    </>
  );
};

export default MngPane;
