import { Container, Divider } from '@mui/material';
import React from 'react';

import PageStatePane from './components/PageStatePane';
import MngWorkoutPane from '../../WorkoutItems/MngWorkoutPane';

const MngPane = ({ user }: { user: string }) => {
  return (
    <Container maxWidth='sm'>
      <div style={{ display: 'grid', rowGap: 16, padding: '8px 0' }}>
        <PageStatePane user={user} />
        <Divider />
        <MngWorkoutPane />
      </div>
    </Container>
  );
};

export default MngPane;
