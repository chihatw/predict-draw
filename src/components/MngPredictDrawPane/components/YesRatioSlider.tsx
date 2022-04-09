import { Slider } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

import usePredict from '../../../services/usePredict';

const DELAY = 15; // ms

const START_AT = new Date('2000/01/01 20:00:00');

const calcDate = ({
  startAt,
  progress,
}: {
  startAt: Date;
  progress: number;
}) => {
  return new Date(startAt.getTime() + 10 * 60 * 60 * 8 * progress);
};

const YesRatioSlider = ({
  superYesRatio,
  updateYesRatio,
  updateNewGameAt,
}: {
  superYesRatio: number;
  updateYesRatio: (value: number) => void;
  updateNewGameAt: () => void;
}) => {
  const [yesRatio, setYesRatio] = useState(superYesRatio);
  const [happenedAt, setHappenedAt] = useState(START_AT);

  const timerId = useRef(0);

  useEffect(() => {
    setYesRatio(superYesRatio);
    const happenedAt = calcDate({ startAt: START_AT, progress: superYesRatio });
    setHappenedAt(happenedAt);
  }, [superYesRatio]);

  const handleChangeYesRatio = (value: number) => {
    setYesRatio(value);
    window.clearTimeout(timerId.current);
    timerId.current = window.setTimeout(() => {
      updateYesRatio(value);
      updateNewGameAt();
    }, DELAY);
  };

  return (
    <div>
      <div>{`地震発生時間: ${happenedAt.getHours()}: ${String(
        happenedAt.getMinutes()
      ).padStart(2, '0')}`}</div>
      <Slider
        color='secondary'
        value={yesRatio}
        onChange={(e, value: number | number[]) => {
          typeof value === 'number' && handleChangeYesRatio(value);
        }}
      />
    </div>
  );
};

export default YesRatioSlider;
