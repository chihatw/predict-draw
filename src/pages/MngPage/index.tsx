import { Container, Divider, IconButton, TextField } from '@mui/material';

import React, { useContext } from 'react';

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
import { RhythmListState } from '../../Model';
import { setRhythmList } from '../../services/rhythmList';
import Delete from '@mui/icons-material/Delete';
import RhythmListPane from './RhythmListPane';

const MngPage = () => {
  const { state } = useContext(AppContext);

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
            <StatusPane />
            <TextField
              size='small'
              type='number'
              label='totalRounds'
              value={state.workoutParams.totalRounds}
              onChange={(e) => handleChangeTotalRounds(Number(e.target.value))}
            />
            <RhythmListPane />
            <NotePane />
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
