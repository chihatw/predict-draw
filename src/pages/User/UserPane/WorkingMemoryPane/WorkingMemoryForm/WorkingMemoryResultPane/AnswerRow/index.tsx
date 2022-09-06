import { SentencePitchLine } from '@chihatw/pitch-line.sentence-pitch-line';
import React from 'react';
import string2PitchesArray from 'string2pitches-array';
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
        <SentencePitchLine pitchesArray={string2PitchesArray(cue.pitchStr)} />
        {state.blob && state.audioContext && (
          <AnswerRowPlayButton
            blob={state.blob}
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
        <SentencePitchLine
          pitchesArray={string2PitchesArray(answer.pitchStr)}
        />
        {state.blob && state.audioContext && (
          <AnswerRowPlayButton
            blob={state.blob}
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
