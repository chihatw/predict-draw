import { Draw } from '@chihatw/lang-gym-h.card.page.draw';
import { Predict } from '@chihatw/lang-gym-h.card.page.predict';
import { Container } from '@mui/material';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import AppContext from '../services/context';
import Greeting from './Greeting';
import PageStatePane from './PageStatePane';
import TalkingToKouSan from './TalkingToKouSan';
import TalkingToLiSan from './TalkingToLiSan';

const ManagementPage: React.FC<{ user: string }> = ({ user }) => {
  const {
    drawn,
    predict,
    yesRatio,
    newGameAt,
    showRatioPane: _showRatioPane,
    showScorePane: _showScorePane,
    liSanPageState,
    kouSanPageState,
    showPredictPane: _showPredictPane,
    updateDrawn,
    updatePredict,
    handleShowPane,
    updateLiSanPageState,
    updateKouSanPageState,
  } = useContext(AppContext);

  const _state = useMemo(() => {
    switch (user) {
      case 'liSan':
        return liSanPageState;
      case 'kouSan':
        return kouSanPageState;
      default:
        return 'greeting';
    }
  }, [user, liSanPageState, kouSanPageState]);

  const [showRatioPane, setShowRatioPane] = useState(_showRatioPane);
  const [showPredictPane, setShowPredictPane] = useState(_showPredictPane);
  const [state, setState] = useState(_state);

  useEffect(() => {
    setState(_state);
  }, [_state]);

  useEffect(() => {
    setShowRatioPane(_showRatioPane);
  }, [_showRatioPane]);

  useEffect(() => {
    setShowPredictPane(_showPredictPane);
  }, [_showPredictPane]);

  const handleShowRatioPane = (visible: boolean) => {
    setShowRatioPane(visible);
    handleShowPane({ visible, docId: 'ratioPane' });
  };

  const handleShowPredictPane = (visible: boolean) => {
    setShowPredictPane(visible);
    handleShowPane({ visible, docId: 'predictPane' });
  };

  const handleChangeState = (state: string) => {
    setState(state);
    //TODO predictのクリア?
    switch (user) {
      case 'liSan':
        updateLiSanPageState(state);
        break;
      case 'kouSan':
        updateKouSanPageState(state);
        break;
      default:
    }
  };

  return (
    <>
      <Container maxWidth='sm'>
        <PageStatePane state={state} handleChangeState={handleChangeState} />
      </Container>
      {(() => {
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
          default:
            return <></>;
        }
      })()}
    </>
  );
};

export default ManagementPage;
