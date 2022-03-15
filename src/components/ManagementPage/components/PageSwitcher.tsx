import { Draw } from '@chihatw/lang-gym-h.card.page.draw';
import { Predict } from '@chihatw/lang-gym-h.card.page.predict';
import { Container } from '@mui/material';
import { useContext } from 'react';

import AppContext from '../../../services/context';
import Greeting from '../../Greeting';
import TalkingToKouSan from '../../TalkingToKouSan';
import TalkingToLiSan from '../../TalkingToLiSan';

const PageSwitcher = ({ user, state }: { user: string; state: string }) => {
  const {
    drawn,
    predict,
    newGameAt,
    bpmCalcBpm,
    yesRatio,
    showRatioPane,
    showPredictPane,
    isBpmCalcRunning,
    updateDrawn,
    updatePredict,
    handleShowPane,
  } = useContext(AppContext);

  const handleShowRatioPane = (visible: boolean) => {
    handleShowPane({ visible, docId: 'ratioPane' });
  };

  const handleShowPredictPane = (visible: boolean) => {
    handleShowPane({ visible, docId: 'predictPane' });
  };

  switch (state) {
    case 'greeting':
      return <Greeting />;
    case 'talkingToLiSan':
      return <TalkingToLiSan />;
    case 'talkingToKouSan':
      return <TalkingToKouSan />;
    case 'predict':
      return (
        <Predict
          yesRatio={yesRatio}
          opponent={user === 'liSan' ? '黄さん' : '李さん'}
          newGameAt={newGameAt}
          superPredict={predict}
          superShowRatioPane={showRatioPane}
          superShowPredictPane={showPredictPane}
          superHandlePredict={updatePredict}
          superHandleShowRatioPane={handleShowRatioPane}
          superHandleShowPredictPane={handleShowPredictPane}
          isManagementMode
        />
      );
    case 'draw':
      return (
        <Draw
          yesRatio={yesRatio}
          newGameAt={newGameAt}
          superDrawn={drawn}
          superHandleDrawn={updateDrawn}
          isManagementMode
        />
      );
    case 'bpmCalc':
      return (
        <Container maxWidth='sm' sx={{ paddingTop: 1 }}>
          <div>{isBpmCalcRunning ? '計測中' : '待機中'}</div>
          <div>{`BPM: ${bpmCalcBpm}`}</div>
        </Container>
      );
    default:
      return <></>;
  }
};

export default PageSwitcher;
