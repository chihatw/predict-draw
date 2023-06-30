import { Container, Divider } from '@mui/material';
import { useContext, useMemo } from 'react';
import { AppContext } from '../..';
import { setPageState } from '../../../services/pageState';
import Layout from '../../Layout';
import CueWorkoutList from './CueWorkoutList';
import NotePane from './NotePane';
import PageStatePane from './PageStatePane';
import RecordVoicePane from './RecordVoicePane';
import SpeedWorkoutPane from './SpeedWorkoutPane';

const MngPage = () => {
  const { state } = useContext(AppContext);

  const handleChangePageState = (user: string, state: string) => {
    setPageState({ id: user, state });
  };

  const pageStateItems = useMemo(() => {
    return [
      {
        user: 'liSan',
        value: state.pageStates.liSan,
        handleChange: handleChangePageState,
      },
      {
        user: 'kouSan',
        value: state.pageStates.kouSan,
        handleChange: handleChangePageState,
      },
      {
        user: 'chinSan',
        value: state.pageStates.chinSan,
        handleChange: handleChangePageState,
      },
    ];
  }, [
    state.pageStates.liSan,
    state.pageStates.kouSan,
    state.pageStates.chinSan,
  ]);

  return (
    <Layout color='red' label='MngPage'>
      <Container maxWidth='sm'>
        <div style={{ display: 'grid', rowGap: 16, padding: '8px 0' }}>
          <div style={{ display: 'grid' }}>
            {pageStateItems.map((item, index) => (
              <PageStatePane
                user={item.user}
                value={item.value}
                handleChange={item.handleChange}
                key={index}
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
