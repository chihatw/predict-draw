import { Container } from '@mui/material';
import { useContext } from 'react';

import noImage from '../../../images/keitai.png';
import Greeting from '../../Greeting';
import yesImage from '../../../images/suimin.png';
import TalkingToLiSan from '../../TalkingToLiSan';
import TalkingToKouSan from '../../TalkingToKouSan';
import AppContext, { PageState } from '../../../services/context';
import BPMTrackManagementPage from '../../BPMTrackManagementPage';
import { Predict } from '../../../pages/predict';
import { Draw } from '../../../pages/draw';

const PageSwitcher = ({ user, state }: { user: string; state: PageState }) => {
  const {
    drawn,
    predict,
    yesRatio,
    newGameAt,
    bpmCalcBpm,
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
          noImage={noImage}
          yesImage={yesImage}
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
          noImage={noImage}
          yesImage={yesImage}
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
    case 'bpmTrack':
      return <BPMTrackManagementPage />;
    default:
      return <></>;
  }
};

export default PageSwitcher;
