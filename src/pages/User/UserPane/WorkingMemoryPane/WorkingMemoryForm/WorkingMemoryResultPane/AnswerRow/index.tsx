import SentencePitchLine from 'views/components/SentencePitchLine';
import { INITIAL_WORKING_MEMORY_CUE } from '../../../../../../../Model';
import { PITCHES } from '../../../../../../../pitch';
import { WorkingMemoryFormState } from '../../../Model';
import AnswerRowPlayButton from './AnswerRowPlayButton';

const AnswerRow = ({
  state,
  index,
}: {
  state: WorkingMemoryFormState;
  index: number;
}) => {
  const cueId = state.cueIds[index] || '';
  const cue = PITCHES[cueId] || INITIAL_WORKING_MEMORY_CUE;
  const answerId = state.answerIds[index] || '';
  const answer = PITCHES[answerId] || INITIAL_WORKING_MEMORY_CUE;
  return (
    <div
      key={index}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ flexBasis: 40, textAlign: 'center' }}>{index + 1}</div>
      <div
        style={{
          flexBasis: 120,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <SentencePitchLine pitchStr={cue.pitchStr} />
        {state.audioBuffer && state.audioContext && (
          <AnswerRowPlayButton
            audioBuffer={state.audioBuffer}
            audioContext={state.audioContext}
            start={cue.start}
            end={cue.end}
          />
        )}
      </div>
      <div
        style={{
          flexBasis: 120,
          display: 'flex',
          justifyContent: 'center',
          borderRadius: 4,
          background:
            answer.pitchStr === cue.pitchStr ? 'white' : 'rgba(255,0,0,0.1)',
        }}
      >
        <SentencePitchLine pitchStr={answer.pitchStr} />
        {state.audioBuffer && state.audioContext && (
          <AnswerRowPlayButton
            audioBuffer={state.audioBuffer}
            audioContext={state.audioContext}
            start={answer.start}
            end={answer.end}
          />
        )}
      </div>
    </div>
  );
};

export default AnswerRow;
