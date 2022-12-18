import * as R from 'ramda';
import { SentencePitchLine } from '@chihatw/pitch-line.sentence-pitch-line';
import { Button, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import string2PitchesArray from 'string2pitches-array';
import { AppContext } from '../../App';
import { INITIAL_WORKING_MEMORY_CUE, State, WorkingMemory } from '../../Model';
import { ActionTypes } from '../../Update';
import {
  buildCueIds,
  setWorkingMemory,
} from '../../services/workingMemoryWorkout';

const WorkingMemoryPane = () => {
  const { state, dispatch } = useContext(AppContext);
  const [open, setOpen] = useState(false);

  const audioBuffer = state.audioBuffers[state.workingMemory.storagePath]; // workingMemory.storagePath?
  const handleChangeCueCount = (cueCount: number) => {
    if (!dispatch) return;
    const updatedCueIds = buildCueIds(
      Object.keys(state.workingMemory.cues),
      cueCount
    );
    const updatedWorkingMemory: WorkingMemory = {
      ...state.workingMemory,
      cueIds: updatedCueIds,
      cueCount,
    };
    const updatedAudioBuffers = { ...state.audioBuffers };
    if (audioBuffer) {
      updatedAudioBuffers[updatedWorkingMemory.storagePath] = audioBuffer;
    }
    const updatedState = R.compose(
      R.assocPath<WorkingMemory, State>(
        ['workingMemory'],
        updatedWorkingMemory
      ),
      R.assocPath<{ [path: string]: AudioBuffer }, State>(
        ['blobs'],
        updatedAudioBuffers
      )
    )(state);

    dispatch({ type: ActionTypes.setState, payload: updatedState });
    setWorkingMemory(updatedWorkingMemory);
  };
  const handleChangeOffset = (offset: number) => {
    if (!dispatch) return;

    const updatedCueIds = buildCueIds(
      Object.keys(state.workingMemory.cues),
      state.workingMemory.cueCount
    );

    const updatedWorkingMemory: WorkingMemory = {
      ...state.workingMemory,
      cueIds: updatedCueIds,
      offset,
    };

    const updatedState = R.assocPath<WorkingMemory, State>(
      ['workingMemory'],
      updatedWorkingMemory
    )(state);
    dispatch({ type: ActionTypes.setState, payload: updatedState });
    setWorkingMemory(updatedWorkingMemory);
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h3>ワーキングメモリ</h3>
        <Button onClick={() => setOpen(!open)}>{open ? 'hide' : 'open'}</Button>
      </div>
      {open && (
        <>
          <div style={{ display: 'grid', rowGap: 8 }}>
            <TextField
              fullWidth
              size='small'
              label='cueCount'
              type='number'
              value={state.workingMemory.cueCount}
              onChange={(e) => handleChangeCueCount(Number(e.target.value))}
            />
            <TextField
              fullWidth
              size='small'
              label='offset'
              type='number'
              value={state.workingMemory.offset}
              onChange={(e) => handleChangeOffset(Number(e.target.value))}
            />
          </div>
          <h4>Cue Ids</h4>
          <div>
            {state.workingMemory.cueIds.map((cueId, index) => {
              const cue = state.workingMemory.cues[cueId];
              const answerId = state.workingMemoryAnswerIds[index] || '';
              const answer =
                state.workingMemory.cues[answerId] ||
                INITIAL_WORKING_MEMORY_CUE;
              return (
                <div
                  key={index}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <div style={{ flexBasis: 40, textAlign: 'center' }}>
                    {index + 1}
                  </div>
                  <div
                    style={{
                      flexBasis: 120,
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <SentencePitchLine
                      pitchesArray={string2PitchesArray(cue.pitchStr)}
                    />
                  </div>
                  <div
                    style={{
                      flexBasis: 120,
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    {answer.id ? (
                      <SentencePitchLine
                        pitchesArray={string2PitchesArray(answer.pitchStr)}
                      />
                    ) : (
                      <div>--</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default WorkingMemoryPane;
