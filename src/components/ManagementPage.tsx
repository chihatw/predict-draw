import { Draw } from '@chihatw/lang-gym-h.card.page.draw';
import { Predict } from '@chihatw/lang-gym-h.card.page.predict';
import { Button, Container, Slider } from '@mui/material';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import AppContext from '../services/context';
import Greeting from './Greeting';
import PageStatePane from './PageStatePane';
import TalkingToKouSan from './TalkingToKouSan';
import TalkingToLiSan from './TalkingToLiSan';

const DELAY = 15; // ms

const ManagementPage: React.FC<{ user: string }> = ({ user }) => {
  const {
    drawn,
    predict,
    yesRatio: _yesRatio,
    newGameAt,
    showRatioPane: _showRatioPane,
    showScorePane: _showScorePane,
    liSanPageState,
    kouSanPageState,
    showPredictPane: _showPredictPane,
    updateDrawn,
    updatePredict,
    updateYesRatio,
    handleShowPane,
    updateNewGameAt,
    updateLiSanPageState,
    updateKouSanPageState,
  } = useContext(AppContext);

  const timerId = useRef(0);

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

  const [state, setState] = useState(_state);
  const [yesRatio, setYesRatio] = useState(_yesRatio);
  const [showRatioPane, setShowRatioPane] = useState(_showRatioPane);
  const [showPredictPane, setShowPredictPane] = useState(_showPredictPane);

  useEffect(() => {
    setState(_state);
  }, [_state]);

  useEffect(() => {
    setYesRatio(_yesRatio);
  }, [_yesRatio]);

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
    updatePredict('');
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

  const handleChangeYesRatio = (value: number) => {
    setYesRatio(value);
    window.clearTimeout(timerId.current);
    timerId.current = window.setTimeout(() => {
      updateYesRatio(value);
      updateNewGameAt();
    }, DELAY);
  };

  const handleNewGame = () => {
    updateNewGameAt();
    updatePredict('');
  };

  return (
    <>
      <Container maxWidth='sm'>
        <div style={{ display: 'grid', rowGap: 8, padding: '8px 0' }}>
          <PageStatePane state={state} handleChangeState={handleChangeState} />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>{`Yes Ratio: ${yesRatio}%`}</div>
            <div style={{ padding: '0 16px', flexGrow: 1 }}>
              <Slider
                color='secondary'
                value={yesRatio}
                onChange={(e, value: number | number[]) => {
                  typeof value === 'number' && handleChangeYesRatio(value);
                }}
              />
            </div>
          </div>
          <div>{`予想: ${
            !predict ? '未選択' : predict === 'yes' ? 'はい' : 'いいえ'
          }`}</div>
          <Button variant='contained' color='secondary' onClick={handleNewGame}>
            new game
          </Button>
        </div>
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
