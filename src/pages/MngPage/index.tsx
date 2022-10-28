import { Container, Divider } from '@mui/material';
import React, { useContext } from 'react';
import Layout from '../../Layout';
import { AppContext } from '../../App';
import { setPageState } from '../../services/pageState';
import CueWorkoutList from './CueWorkoutList';
import PageStatePane from './PageStatePane';
import SpeedWorkoutPane from './SpeedWorkoutPane';

const MngPage = () => {
  const { state } = useContext(AppContext);

  const handleChangePageState = (user: string, state: string) => {
    setPageState({ id: user, state });
  };

  return (
    <Layout color='red' label='MngPage'>
      <Container maxWidth='sm'>
        <div style={{ display: 'grid', rowGap: 16, padding: '8px 0' }}>
          <PageStatePane
            user='liSan'
            value={state.pageStates.liSan}
            handleChange={handleChangePageState}
          />
          <PageStatePane
            user='kouSan'
            value={state.pageStates.kouSan}
            handleChange={handleChangePageState}
          />
          <PageStatePane
            user='chinSan'
            value={state.pageStates.chinSan}
            handleChange={handleChangePageState}
          />
          <Divider />
          <div style={{ display: 'grid', rowGap: 16, paddingBottom: 80 }}>
            <SpeedWorkoutPane />
            {/* <KanaCardsPane /> */}
            {/* <NotePane /> */}
            {/* <RhythmListPane /> */}
            {/* <RhythmWorkoutPane /> */}
            <CueWorkoutList />
            {/* <WorkingMemoryPane /> */}
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default MngPage;
