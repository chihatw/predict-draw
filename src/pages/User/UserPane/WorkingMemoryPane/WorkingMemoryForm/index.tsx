import { Container } from '@mui/material';
import React from 'react';

import { WorkingMemoryFormState } from '../Model';
import WorkingMemoryAnswerPane from './WorkingMemoryAnswerPane';
import WorkingMemoryHeader from './WorkingMemoryHeader';
import PlayButton from './PlayButton';
import WorkingMemoryResultPane from './WorkingMemoryResultPane';
import TouchMe from './TouchMe';

const WorkingMemoryForm = ({
  state,
  dispatch,
}: {
  state: WorkingMemoryFormState;
  dispatch: React.Dispatch<WorkingMemoryFormState>;
}) => {
  if (!state.audioContext) return <TouchMe />;
  return (
    <Container sx={{ paddingTop: 1, paddingBottom: 15 }}>
      <div style={{ display: 'grid', rowGap: 8 }}>
        <WorkingMemoryHeader state={state} />
        {(() => {
          if (state.currentIndex < state.offset) {
            return <PlayButton state={state} dispatch={dispatch} />;
          }
          if (state.currentIndex < state.offset + state.cueCount) {
            return (
              <WorkingMemoryAnswerPane state={state} dispatch={dispatch} />
            );
          }
          return <WorkingMemoryResultPane state={state} dispath={dispatch} />;
        })()}
      </div>
    </Container>
  );
};

export default WorkingMemoryForm;
