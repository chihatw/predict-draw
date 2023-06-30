import { useTheme } from '@mui/material';
import { useContext } from 'react';
import { AppContext } from '../../../../../../App';
import { RandomWorkout, RandomWorkoutParams } from '../../../../../../Model';

const Header = ({ workout }: { workout: RandomWorkout }) => {
  const theme = useTheme();
  const { state } = useContext(AppContext);
  const { randomWorkout } = state;
  const { params } = randomWorkout;
  const { cueIds, currentIndex }: RandomWorkoutParams = params;
  const { title, beatCount, targetBpm, roundCount }: RandomWorkout = workout;
  const targetTimeTenTimes =
    Math.round(((beatCount * roundCount) / (targetBpm / 60)) * 10) * 2;
  const targetTimeSecond = Math.floor(targetTimeTenTimes / 10);
  const targetTimePoints = targetTimeTenTimes % 10;
  return (
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
      <div>
        <div>
          <span style={{ fontSize: 16 }}>目標BPM: </span>
          <span>{targetBpm}</span>
        </div>
        <div>
          <span style={{ fontSize: 16 }}>目標時間: </span>
          <span>{`${targetTimeSecond}.${targetTimePoints}`}</span>
        </div>

        <div style={{ fontSize: 20 }}>{`${
          cueIds.length ? currentIndex + 1 : 0
        }/${cueIds.length}`}</div>
      </div>
    </div>
  );
};

export default Header;
