import Delete from '@mui/icons-material/Delete';
import { Container, IconButton, useTheme } from '@mui/material';
import React, { useContext, useMemo } from 'react';

import { AppContext } from '../../../../App';
import { deleteStorage } from '../../../../repositories/storage';
import { RandomWorkout } from '../../../../Model';
import {
  setRandomWorkout,
  resetRandomWorkout,
} from '../../../../services/randomWorkout';

import TimeDisplay from '../commons/TimeDisplay';
import BlobSlider from '../../../../commons/BlobSlider';

const ResultPane = () => {
  const theme = useTheme();
  const { state } = useContext(AppContext);
  const { randomWorkout, audioContext } = state;
  const { workouts, workoutId, blobs } = randomWorkout;
  const workout = workouts[workoutId];
  const blob = blobs[workoutId];
  const { title, roundCount, time, beatCount, storagePath } = workout;
  const bpm = useMemo(() => {
    if (!time) return 0;
    const totalBeatCount = roundCount * beatCount;
    const bps = totalBeatCount / time;
    const bpm = Math.round(bps * 60 * 2);
    return bpm;
  }, [time, roundCount, beatCount]);

  const handleDelete = () => {
    if (window.confirm('録音ファイルを削除しますか？')) {
      deleteStorage(storagePath);
      const updatedWorkout: RandomWorkout = {
        ...workout,
        time: 0,
        storagePath: '',
      };
      setRandomWorkout(updatedWorkout);
      resetRandomWorkout();
    }
  };

  return (
    <Container maxWidth='sm' sx={{ paddingTop: 3 }}>
      <div
        style={{
          ...(theme.typography as any).mRounded300,
          fontSize: 20,
          display: 'grid',
          rowGap: 8,
          textAlign: 'center',
        }}
      >
        <div>
          <span style={{ fontSize: 24 }}>{title}</span>
          <span style={{ fontSize: 18 }}>{`（${roundCount}周）`}</span>
        </div>
        <TimeDisplay miliSeconds={time * 1000} />
        <div
          style={{
            ...(theme.typography as any).mRounded300,
            fontSize: 48,
            textAlign: 'center',
          }}
        >
          <span style={{ fontSize: 16 }}>BPM: </span>
          <span>{bpm}</span>
        </div>
      </div>
      <div style={{ height: 64 }} />
      {!!blob && !!audioContext && (
        <BlobSlider
          blob={blob}
          spacer={5}
          duration={time + 0.3}
          audioContext={audioContext}
        />
      )}
      <div style={{ height: 180 }} />
      <div style={{ textAlign: 'center' }}>
        <IconButton onClick={handleDelete}>
          <Delete sx={{ fontSize: 80 }} />
        </IconButton>
      </div>
      <div style={{ height: 180 }} />
    </Container>
  );
};

export default ResultPane;
