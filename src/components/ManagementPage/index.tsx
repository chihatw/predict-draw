import { Button, Container } from '@mui/material';
import React, { useContext, useEffect, useMemo, useState } from 'react';

import AppContext from '../../services/context';
import PageSwitcher from './components/PageSwitcher';
import PageStatePane from './components/PageStatePane';
import YesRatioSlider from './components/YesRatioSlider';
import NewGameButton from './components/NewGameButton';
import PredictPane from './components/PredictPane';
import { useHandleTimes, useTimes } from '../../services/useTimes';

const LEVEL_A = 3;
const LEVEL_B = 3;
const LEVEL_C = 10;

const times: Date[] = [];

let hours: number[] = [];

function shuffleArray(inputArray: number[]) {
  inputArray.sort(() => Math.random() - 0.5);
}

// 00
hours = [];
for (let i = 0; i < 24; i += 2) {
  hours.push(i);
}
shuffleArray(hours);

for (let i = 0; i < LEVEL_A; i++) {
  times.push(new Date(`2022/01/01/${hours[i]}:00`));
}

// 30
hours = [];
for (let i = 1; i < 24; i += 2) {
  hours.push(i);
}
shuffleArray(hours);
for (let i = 0; i < LEVEL_B; i++) {
  const min = Math.random() > 0.66 ? '00' : '30';
  times.push(new Date(`2022/01/01/${hours[i]}:${min}`));
}

// 00 10 20...
hours = [];
for (let i = 1; i < 24; i++) {
  hours.push(i);
}
shuffleArray(hours);
for (let i = 0; i < LEVEL_C; i++) {
  const min = Math.floor(Math.random() * 1000) % 6;
  times.push(new Date(`2022/01/01/${hours[i]}:${min}0`));
}

const ManagementPage: React.FC<{ user: string }> = ({ user }) => {
  const { liSanPageState, kouSanPageState } = useContext(AppContext);
  const { inputTime, score, hours, minutes } = useTimes();
  const { setTime, clearScore } = useHandleTimes();

  const time = useMemo(
    () => new Date(`2020/01/01 ${hours}:${minutes}:00`),
    [hours, minutes]
  );

  const _inputTime = useMemo(() => new Date(inputTime), [inputTime]);

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

  useEffect(() => {
    setState(_state);
  }, [_state]);

  const handleClickTime = (time: Date) => {
    setTime(time.getTime());
  };

  return (
    <>
      <Container maxWidth='sm'>
        <div style={{ display: 'grid', rowGap: 8, padding: '8px 0' }}>
          <PageStatePane state={state} user={user} setState={setState} />
          <YesRatioSlider />
          <PredictPane />
          <NewGameButton />
          <div>
            <span>{`Score: ${score}`}</span>
            <Button onClick={clearScore}>Clear</Button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '80px auto' }}>
            <div>設定時間</div>
            <div>{`${time.getHours()}時${String(time.getMinutes()).padStart(
              2,
              '0'
            )}分`}</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '80px auto' }}>
            <div>入力時間</div>
            <div>{`${_inputTime.getHours()}時${String(
              _inputTime.getMinutes()
            ).padStart(2, '0')}分`}</div>
          </div>
          <div style={{ padding: 8, border: '1px solid #eee' }}>
            練習用
            <PracticeButton h='10' m='00' handleClickTime={handleClickTime} />
            <PracticeButton h='13' m='00' handleClickTime={handleClickTime} />
            <PracticeButton h='18' m='00' handleClickTime={handleClickTime} />
            <PracticeButton h='20' m='30' handleClickTime={handleClickTime} />
            <PracticeButton h='03' m='00' handleClickTime={handleClickTime} />
          </div>
          <div>時間問題</div>
          {times.map((time, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <div>{`${time.getHours()}時${String(time.getMinutes()).padStart(
                2,
                '0'
              )}分`}</div>
              <Button size='small' onClick={() => handleClickTime(time)}>
                送信
              </Button>
            </div>
          ))}
        </div>
      </Container>
      <PageSwitcher user={user} state={state} />
    </>
  );
};

export default ManagementPage;

const PracticeButton = ({
  h,
  m,
  handleClickTime,
}: {
  h: string;
  m: string;
  handleClickTime: (value: Date) => void;
}) => (
  <div>
    <Button onClick={() => handleClickTime(new Date(`2022/01/01/${h}:${m}`))}>
      {`${h}時${m}分`}
    </Button>
  </div>
);
