import { Container, Divider, TextField } from '@mui/material';
import React, { useContext } from 'react';
import Layout from '../../Layout';
import { INITIAL_WORKOUT } from '../../Model';
import AppContext from '../../services/context';
import { setPageState } from '../../services/pageState';
import { updateTotalRounds } from '../../services/workoutParams';
import PageStatePane from './PageStatePane';
import StatusPane from './StatusPane';
import WorkoutItemList from './WorkoutItemList';
import WorkoutList from './WorkoutList';

const MngPage = () => {
  const { state, dispatch } = useContext(AppContext);
  const { liSanPageState, kouSanPageState, workoutParams, workouts } = state;
  const { totalRounds, workoutId } = workoutParams;
  const workout =
    workouts.find((workout) => workout.id === workoutId) || INITIAL_WORKOUT;

  const { label, items, cueType, cues, beatCount } = workout;

  const handleChangeTotalRounds = (totalRounds: number) => {
    if (!dispatch) return;
    updateTotalRounds(totalRounds);
  };

  const handleChangeLiSanPageState = (state: string) => {
    if (!dispatch) return;
    setPageState({ id: 'liSan', state });
  };

  const handleChangeKouSanPageState = (state: string) => {
    if (!dispatch) return;
    setPageState({ id: 'kouSan', state });
  };
  return (
    <Layout color='red' label='MngPage'>
      <Container maxWidth='sm'>
        <div style={{ display: 'grid', rowGap: 16, padding: '8px 0' }}>
          <PageStatePane
            label='李さん'
            value={liSanPageState}
            handleChange={handleChangeLiSanPageState}
          />
          <PageStatePane
            label='黄さん'
            value={kouSanPageState}
            handleChange={handleChangeKouSanPageState}
          />
          <Divider />
          <div style={{ display: 'grid', rowGap: 16, paddingBottom: 80 }}>
            <StatusPane />
            <TextField
              size='small'
              type='number'
              label='totalRounds'
              value={totalRounds}
              onChange={(e) => handleChangeTotalRounds(Number(e.target.value))}
            />
            {!!workoutId && (
              <>
                <h3>{label}</h3>
                <div>{`beatCount: ${beatCount}`}</div>
                <WorkoutItemList
                  workoutItems={items}
                  cueType={cueType}
                  cues={cues}
                />
              </>
            )}

            <WorkoutList />
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default MngPage;
