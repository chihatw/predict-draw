import * as R from 'ramda';
import { SentencePitchLine } from '@chihatw/pitch-line.sentence-pitch-line';
import { PlayCircle } from '@mui/icons-material';
import { Button, IconButton, TextField } from '@mui/material';
import React, { startTransition, useContext, useState } from 'react';
import string2PitchesArray from 'string2pitches-array';
import { AppContext } from '../../App';
import { INITIAL_WORKING_MEMORY_CUE, WorkingMemory } from '../../Model';
import { ActionTypes } from '../../Update';
import { createSourceNode } from '../../services/utils';
import {
  buildCueIds,
  setWorkingMemory,
} from '../../services/workingMemoryWorkout';

const WorkingMemoryPane = () => {
  const { state, dispatch } = useContext(AppContext);
  const [open, setOpen] = useState(true);
  const blob = state.blobs[state.workingMemory.storagePath];
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

    dispatch({
      type: ActionTypes.setWorkingMemory,
      payload: {
        workingMemory: updatedWorkingMemory,
        blob,
      },
    });
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
    dispatch({
      type: ActionTypes.setWorkingMemory,
      payload: {
        workingMemory: updatedWorkingMemory,
        blob,
      },
    });
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
        <h3>WorkingMemoryWorkout</h3>
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
          <h4>Cues</h4>
          {Object.values(state.workingMemory.cues).map((cue, index) => {
            return (
              <div
                key={index}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <SentencePitchLine
                  pitchesArray={string2PitchesArray(cue.pitchStr)}
                />

                {!!state.audioContext && !!blob && (
                  <PlayButton
                    blob={blob}
                    start={cue.start}
                    end={cue.end}
                    audioContext={state.audioContext}
                  />
                )}
              </div>
            );
          })}
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

const PlayButton = ({
  start,
  end,
  blob,
  audioContext,
}: {
  start: number;
  end: number;
  blob: Blob;
  audioContext: AudioContext;
}) => {
  const play = async () => {
    const sourceNode = await createSourceNode(blob, audioContext);
    sourceNode.start(0, start, end - start);
  };
  return (
    <IconButton onClick={play}>
      <PlayCircle />
    </IconButton>
  );
};
