import { Container, Divider } from '@mui/material';
import { RootState } from 'main';
import { useSelector } from 'react-redux';
import Layout from '../../Layout';
import MngCueWorkoutPane from '../../components/MngCueWorkoutPane';
import MngNotePane from '../../components/MngNotePane';
import MngPageStatePane from '../../components/MngPageStatePane';
import MngSpeedWorkoutPane from '../../components/MngSpeedWorkoutPane';
import RecordVoicePane from './RecordVoicePane';

const MngPage = () => {
  const { ids: users, entities: pageStates } = useSelector(
    (state: RootState) => state.pageStates
  );

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
            <MngNotePane />
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default MngPage;
