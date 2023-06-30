import { Container, Divider } from '@mui/material';
import { mngPageActions } from 'application/mngPage/framework/0-reducer';
import { RootState } from 'main';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../Layout';
import CueWorkoutList from './CueWorkoutList';
import NotePane from './NotePane';
import PageStatePane from './PageStatePane';
import RecordVoicePane from './RecordVoicePane';
import SpeedWorkoutPane from './SpeedWorkoutPane';

const MngPage = () => {
  const dispatch = useDispatch();

  const { ids: users, entities: pageStates } = useSelector(
    (state: RootState) => state.pageStates
  );

  useEffect(() => {
    dispatch(mngPageActions.initiate());
  }, []);

  return (
    <Layout color='red' label='MngPage'>
      <Container maxWidth='sm'>
        <div style={{ display: 'grid', rowGap: 16, padding: '8px 0' }}>
          <div style={{ display: 'grid' }}>
            {users.map((user, index) => (
              <PageStatePane
                key={index}
                user={user as string}
                value={pageStates[user]?.state}
              />
            ))}
          </div>
          <Divider />
          <div style={{ display: 'grid', rowGap: 0, paddingBottom: 80 }}>
            <SpeedWorkoutPane />
            <CueWorkoutList />
            <RecordVoicePane />
            <NotePane />
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default MngPage;
