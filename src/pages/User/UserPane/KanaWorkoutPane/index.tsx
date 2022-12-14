import * as R from 'ramda';
import gojuuon from '../../../../assets/audios/gojuuon.mp3';
import React, { useContext, useEffect, useReducer } from 'react';
import { AppContext } from '../../../../App';
import { INITIAL_KANA_WORKOUT_STATE, KanaWorkoutState } from './Model';
import { getBlobFromAssets } from '../../../../services/utils';
import { KanaWorkoutParams, State } from '../../../../Model';
import { ActionTypes } from '../../../../Update';
import {
  buildKanaWorkoutState,
  setKanaWorkoutParams,
} from '../../../../services/kanaCard';
import TouchMe from '../RandomWorkoutPane/RecordingPane/TouchMe';
import { Container, useTheme } from '@mui/material';
import KanaWorkoutAnswer from './KanaWorkoutForm/KanaWorkoutAnswer';
import Check from '@mui/icons-material/Check';
import { Clear } from '@mui/icons-material';

const reducer = (state: KanaWorkoutState, action: KanaWorkoutState) => action;

const KanaWorkoutPane = () => {
  const { state, dispatch } = useContext(AppContext);
  const [kanaWorkoutState, kanaWorkoutDispatch] = useReducer(
    reducer,
    INITIAL_KANA_WORKOUT_STATE
  );

  useEffect(() => {
    const fetchData = async () => {
      let _blob: Blob | null = null;
      if (state.blobs[gojuuon]) {
        _blob = state.blobs[gojuuon];
      } else {
        const { blob: tmp } = await getBlobFromAssets(gojuuon);
        _blob = tmp;
      }

      const updatedState = R.assocPath<Blob | null, State>(
        ['blobs', gojuuon],
        _blob
      )(state);
      dispatch({ type: ActionTypes.setState, payload: updatedState });
    };
    fetchData();
  }, []);

  useEffect(() => {
    const workoutState = buildKanaWorkoutState(state);
    kanaWorkoutDispatch(workoutState);

    const updatedKanaWorkoutParams: KanaWorkoutParams = {
      ...state.params.kanaWorkout,
      currentIndex: workoutState.currentIndex,
      kanas: workoutState.cueIds,
      answers: {},
    };
    setKanaWorkoutParams(updatedKanaWorkoutParams);
  }, [state.kanaCards.kanas, state.audioContext, state.blobs]);

  if (!state.audioContext) return <TouchMe />;

  return (
    <KanaWorkoutForm state={kanaWorkoutState} dispatch={kanaWorkoutDispatch} />
  );
};

export default KanaWorkoutPane;

const KanaWorkoutForm = ({
  state,
  dispatch,
}: {
  state: KanaWorkoutState;
  dispatch: React.Dispatch<KanaWorkoutState>;
}) => {
  return (
    <Container maxWidth='xs' sx={{ paddingTop: 2 }}>
      {(() => {
        if (state.currentIndex !== state.cueIds.length) {
          return <KanaWorkoutAnswer state={state} dispatch={dispatch} />;
        }
        return <KanaWorkoutResult state={state} />;
      })()}
    </Container>
  );
};

const KanaWorkoutResult = ({ state }: { state: KanaWorkoutState }) => {
  const theme = useTheme();
  let correctCount = 0;
  state.answers.forEach((answer, index) => {
    const cueId = state.cueIds[index];
    if (answer === cueId) {
      correctCount++;
    }
  });
  const correctRatio = Math.round((correctCount / state.cueIds.length) * 100);
  if (!state.answers.length) return <></>;
  return (
    <div style={{ display: 'grid', rowGap: 16 }}>
      <div
        style={{
          ...(theme.typography as any).lato900,
          textAlign: 'center',
          fontSize: 100,
        }}
      >{`${correctRatio}%`}</div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            width: 280,
            display: 'grid',
            rowGap: 8,
          }}
        >
          <div style={{ display: 'flex' }}>
            <div style={{ flexBasis: 80 }}></div>
            <div
              style={{
                ...(theme.typography as any).mRounded300,
                flexBasis: 100,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 14,
                color: '#aaa',
              }}
            >
              播放
            </div>
            <div
              style={{
                ...(theme.typography as any).mRounded300,
                flexBasis: 100,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 14,
                color: '#aaa',
              }}
            >
              回答
            </div>
          </div>
          {state.cueIds.map((kana, index) => {
            const answer = state.answers[index];
            const isCorrect = kana == answer;
            return (
              <div
                key={index}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <div
                  style={{
                    ...(theme.typography as any).mRounded300,
                    flexBasis: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 14,
                    color: '#555',
                  }}
                >
                  {index + 1}
                </div>
                <div
                  style={{
                    flexBasis: 40,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: isCorrect ? '#52a2aa' : 'red',
                  }}
                >
                  {isCorrect ? <Check /> : <Clear />}
                </div>
                <div
                  style={{
                    flexBasis: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 28,
                    color: '#555',
                  }}
                >
                  {kana}
                </div>
                <div
                  style={{
                    flexBasis: 100,
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: 4,
                    justifyContent: 'center',
                    background: isCorrect ? 'transparent' : 'rgba(255,0,0,0.1)',
                    fontSize: 28,
                    color: '#555',
                  }}
                >
                  {answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
