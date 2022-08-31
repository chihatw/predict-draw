import downpitch_120 from '../../assets/audios/downpitch_120.mp3';
import { Container, Divider, TextField } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import Layout from '../../Layout';
import { AppContext } from '../../App';
import { setPageState } from '../../services/pageState';
import { resetWorkoutParams } from '../../services/workoutParams';
import CueWorkoutList from './CueWorkoutList';
import PageStatePane from './PageStatePane';
import RandomWorkoutList from './RandomWorkoutList';
import StatusPane from './StatusPane';
import WorkingMemoryPane from './WorkingMemoryPane';
import WorkoutList from './WorkoutList';
import WorkoutPane from './WorkoutPane';
import NotePane from './NotePane';
import RhythmListPane from './RhythmListPane';
import RhythmWorkoutPane from './RhythmListeningPane';
import KanaCardsPane from './KanaCardsPane';

const MngPage = () => {
  const { state } = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(downpitch_120);
      const blob = await response.blob();
    };
    fetchData();
  }, []);

  const handleChangeTotalRounds = (totalRounds: number) => {
    resetWorkoutParams(totalRounds);
  };

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
            <KanaCardsPane />
            <NotePane />
            <RhythmListPane />
            <RhythmWorkoutPane />
            <StatusPane />
            <TextField
              size='small'
              type='number'
              label='totalRounds'
              value={state.workoutParams.totalRounds}
              onChange={(e) => handleChangeTotalRounds(Number(e.target.value))}
            />

            <WorkoutPane />
            <WorkoutList />
            <RandomWorkoutList />
            <CueWorkoutList />
            <WorkingMemoryPane />
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default MngPage;
