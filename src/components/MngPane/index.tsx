import { Container, Divider } from '@mui/material';
import React, { useContext, useEffect, useMemo, useState } from 'react';

import AppContext from '../../services/context';
import PaneSwitcher from './components/PaneSwitcher';
import PageStatePane from './components/PageStatePane';

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
        <PageStatePane state={state} user={user} setState={setState} />
        <Divider />
        <PaneSwitcher state={state} />
      </div>
    </Container>
  );
};

export default MngPane;
