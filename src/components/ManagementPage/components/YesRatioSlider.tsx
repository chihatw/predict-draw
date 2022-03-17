import { Slider } from '@mui/material';
import { useContext, useEffect, useRef, useState } from 'react';

import AppContext from '../../../services/context';

const DELAY = 15; // ms

const YesRatioSlider = () => {
  const {
    yesRatio: _yesRatio,
    updateYesRatio,
    updateNewGameAt,
  } = useContext(AppContext);

  const [yesRatio, setYesRatio] = useState(_yesRatio);

  const timerId = useRef(0);

  useEffect(() => {
    setYesRatio(_yesRatio);
  }, [_yesRatio]);

  const handleChangeYesRatio = (value: number) => {
    setYesRatio(value);
    window.clearTimeout(timerId.current);
    timerId.current = window.setTimeout(() => {
      updateYesRatio(value);
      updateNewGameAt();
    }, DELAY);
  };

  return (
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
          // color='secondary'
          value={yesRatio}
          onChange={(e, value: number | number[]) => {
            typeof value === 'number' && handleChangeYesRatio(value);
          }}
        />
      </div>
    </div>
  );
};

export default YesRatioSlider;
