import { Button, Container } from '@mui/material';
import React, { useMemo } from 'react';
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

const MngTimePane = () => {
  const { inputTime, score, hours, minutes } = useTimes();

  const time = useMemo(
    () => new Date(`2020/01/01 ${hours}:${minutes}:00`),
    [hours, minutes]
  );

  const _inputTime = useMemo(() => new Date(inputTime), [inputTime]);

  const { setTime, clearScore } = useHandleTimes();

  const handleClickTime = (time: Date) => {
    setTime(time.getTime());
  };

  return (
    <>
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
    </>
  );
};

export default MngTimePane;

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
