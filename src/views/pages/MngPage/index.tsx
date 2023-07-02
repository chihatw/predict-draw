import { Container, Divider } from '@mui/material';
import { speedWorkoutsActions } from 'application/speedWorkouts/framework/0-reducer';
import { RootState } from 'main';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../Layout';
import MngCueWorkoutPane from '../../components/MngCueWorkoutPane';
import MngPageStatePane from '../../components/MngPageStatePane';
import MngSpeedWorkoutPane from '../../components/MngSpeedWorkoutPane';
import NotePane from './NotePane';
import RecordVoicePane from './RecordVoicePane';

const MngPage = () => {
  const dispatch = useDispatch();
  const { ids: users, entities: pageStates } = useSelector(
    (state: RootState) => state.pageStates
  );

  useEffect(() => {
    dispatch(speedWorkoutsActions.startFetch());
  }, []);

  const userPageStates = users.map((user, index) => (
    <MngPageStatePane
      key={index}
      user={user as string}
      value={pageStates[user]?.state}
    />
  ));

  return (
    <Layout color='red' label='MngPage'>
      <Container maxWidth='sm'>
        <div style={{ display: 'grid', rowGap: 16, padding: '8px 0' }}>
          <div style={{ display: 'grid' }}>{userPageStates}</div>
          <Divider />
          <div style={{ display: 'grid', rowGap: 0, paddingBottom: 80 }}>
            <MngSpeedWorkoutPane />
            <MngCueWorkoutPane />
            <RecordVoicePane />
            <NotePane />
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default MngPage;
