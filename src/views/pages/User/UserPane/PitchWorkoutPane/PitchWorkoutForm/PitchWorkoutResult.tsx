import { Clear } from '@mui/icons-material';
import Check from '@mui/icons-material/Check';
import { useTheme } from '@mui/material';
import SentencePitchLine from 'views/components/SentencePitchLine';
import { PITCH_WORKOUT_ITEMS } from '../../../../../../pitchWorkoutItems';
import { PitchWorkoutFormState } from '../Model';

const PitchWorkoutResult = ({ state }: { state: PitchWorkoutFormState }) => {
  const theme = useTheme();
  let correctCount = 0;
  state.answerIds.forEach((answerId, index) => {
    const cueId = state.cueIds[index];
    if (answerId === cueId) {
      correctCount++;
    }
  });
  const correctRatio = Math.round((correctCount / state.cueIds.length) * 100);
  if (!state.answerIds.length) return <></>;
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
          {state.cueIds.map((cueId, index) => {
            const item = PITCH_WORKOUT_ITEMS[cueId];
            const answerId = state.answerIds[index];
            const answer = PITCH_WORKOUT_ITEMS[answerId];
            const isCorrect = cueId == answerId;
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
                  }}
                >
                  <SentencePitchLine pitchStr={item.pitchStr} />
                </div>
                <div
                  style={{
                    flexBasis: 100,
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: 4,
                    justifyContent: 'center',
                    background: isCorrect ? 'transparent' : 'rgba(255,0,0,0.1)',
                  }}
                >
                  <SentencePitchLine pitchStr={answer.pitchStr} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PitchWorkoutResult;
