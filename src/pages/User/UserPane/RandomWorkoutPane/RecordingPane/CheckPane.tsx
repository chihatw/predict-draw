import { Button, Container, Modal, useTheme } from '@mui/material';
import React, { useContext, useMemo } from 'react';
import SentencePitchLine from 'views/components/SentencePitchLine';
import { AppContext } from '../../../../../App';
import { INITIAL_CUE, RandomWorkout } from '../../../../../Model';
import { ActionTypes } from '../../../../../Update';
import BlobSlider from '../../../../../commons/BlobSlider';
import { uploadStorage } from '../../../../../repositories/storage';
import {
  resetRandomWorkout,
  setRandomWorkout,
} from '../../../../../services/randomWorkout';
import TimeDisplay from '../../commons/TimeDisplay';

const CheckPane = React.memo(
  ({
    blob,
    audioBuffer,
  }: {
    blob: Blob | null;
    audioBuffer: AudioBuffer | null;
  }) => {
    const theme = useTheme();
    const { state, dispatch } = useContext(AppContext);
    const { randomWorkout, audioContext } = state;
    const { params, workoutId, workouts } = randomWorkout;
    const workout = workouts[workoutId];
    const { cues, roundCount, beatCount } = workout;
    const { isChecking, cueIds, time } = params;

    const storagePath = `/randomWorkout/${workoutId}`;

    const bpm = useMemo(() => {
      if (!time) return 0;
      const totalBeatCount = roundCount * beatCount;
      const seconds =
        Math.floor(time / 1000) + Math.floor((time % 1000) / 100) / 10;
      const bps = totalBeatCount / seconds;
      const bpm = Math.round(bps * 60 * 2);
      return bpm;
    }, [time, roundCount, beatCount]);

    const handleSave = async () => {
      if (!blob || !dispatch) return;
      const seconds =
        Math.floor(time / 1000) + Math.floor((time % 1000) / 100) / 10;
      const updatedWorkout: RandomWorkout = {
        ...workout,
        time: seconds,
        storagePath,
      };
      await uploadStorage(blob, storagePath);
      await setRandomWorkout(updatedWorkout);
      await resetRandomWorkout();
      dispatch({
        type: ActionTypes.saveRandomWorkoutBlob,
        payload: { workout: updatedWorkout, blob },
      });
    };
    const handleCancel = () => {
      resetRandomWorkout();
    };

    return (
      <Modal open={isChecking}>
        <div
          style={{
            width: '100vw',
            minHeight: '100vh',
            background: '#fafafa',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Container maxWidth='sm'>
            <div style={{ display: 'grid', rowGap: 16 }}>
              <TimeDisplay miliSeconds={time} />
              <div
                style={{
                  ...(theme.typography as any).mRounded300,
                  fontSize: 48,
                  marginTop: -32,
                  marginBottom: -16,
                  textAlign: 'center',
                }}
              >
                <span style={{ fontSize: 16 }}>BPM: </span>
                <span>{bpm}</span>
              </div>
              <div
                style={{
                  color: '#52a2aa',
                  textAlign: 'center',
                  padding: '8px 0',
                  userSelect: 'none',
                }}
              >
                録音をチェックしてください
              </div>
              {!!audioBuffer && !!audioContext && (
                <BlobSlider
                  audioBuffer={audioBuffer}
                  spacer={5}
                  duration={time / 1000 + 0.3}
                  audioContext={audioContext}
                />
              )}
              <div
                style={{
                  display: 'grid',
                  rowGap: 8,
                  height: 320,
                  overflowY: 'scroll',
                  background: 'white',
                  borderRadius: 8,
                }}
              >
                <div style={{ padding: '24px 0' }}>
                  {cueIds.map((cueId, index) => {
                    const cue =
                      cues.find((item) => item.id === cueId) || INITIAL_CUE;
                    const { pitchStr } = cue;

                    return (
                      <div
                        key={index}
                        style={{ display: 'flex', justifyContent: 'center' }}
                      >
                        <SentencePitchLine pitchStr={pitchStr} />
                      </div>
                    );
                  })}
                </div>
                <div style={{ display: 'grid', rowGap: 16 }}>
                  <Button
                    onClick={handleSave}
                    variant='contained'
                    color='primary'
                    sx={{ color: 'white' }}
                  >
                    きれいに読めました
                  </Button>
                  <Button
                    onClick={handleCancel}
                    variant='outlined'
                    color='primary'
                  >
                    もう一度録音します
                  </Button>
                </div>
                <div style={{ height: 180 }} />
              </div>
            </div>
          </Container>
        </div>
      </Modal>
    );
  }
);

export default CheckPane;
