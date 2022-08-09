import { SentencePitchLine } from '@chihatw/pitch-line.sentence-pitch-line';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
} from '@mui/material';
import React from 'react';
import string2PitchesArray from 'string2pitches-array';
import { calcBeatCount, cuesStrToCues } from '../../../services/randomWorkout';
import { RandomWorkoutEditState } from './Model';
import { RandomWorkoutEditAction, RandomWorkoutActionTypes } from './Update';

const RandomWorkoutForm = ({
  state,
  dispatch,
  handleSubmit,
}: {
  state: RandomWorkoutEditState;
  dispatch: React.Dispatch<RandomWorkoutEditAction>;
  handleSubmit: () => void;
}) => {
  const { id, cues, title, beatCount, targetBpm, roundCount, cuesStr } = state;
  const handleChangeTitle = (title: string) => {
    dispatch({
      type: RandomWorkoutActionTypes.changeTitle,
      payload: title,
    });
  };
  const handleChangeTargetBpm = (targetBpm: number) => {
    dispatch({
      type: RandomWorkoutActionTypes.changeTargetBpm,
      payload: targetBpm,
    });
  };
  const handleChangeRoundCount = (roundCount: number) => {
    dispatch({
      type: RandomWorkoutActionTypes.changeRoundCount,
      payload: roundCount,
    });
  };
  const handleChangeCuesStr = (cuesStr: string) => {
    const updatedCues = cuesStrToCues(cuesStr, cues);
    const updatedBeatCount = calcBeatCount(updatedCues);
    dispatch({
      type: RandomWorkoutActionTypes.changeCuesStr,
      payload: {
        cues: updatedCues,
        cuesStr,
        beatCount: updatedBeatCount,
      },
    });
  };

  const handleChangeImagePath = (imagePath: string, cueIndex: number) => {
    dispatch({
      type: RandomWorkoutActionTypes.changeImagePath,
      payload: { imagePath, cueIndex },
    });
  };

  return (
    <div style={{ display: 'grid', rowGap: 16 }}>
      <h2>{!!id ? `${title} - 更新` : '新規作成'}</h2>
      <div>{`beatCount: ${beatCount}`}</div>
      <TextField
        size='small'
        fullWidth
        label='title'
        value={title}
        onChange={(e) => handleChangeTitle(e.target.value)}
      />
      <TextField
        size='small'
        fullWidth
        label='targetBpm'
        value={targetBpm}
        type='number'
        onChange={(e) => handleChangeTargetBpm(Number(e.target.value))}
      />
      <TextField
        size='small'
        fullWidth
        label='roundCount'
        value={roundCount}
        type='number'
        onChange={(e) => handleChangeRoundCount(Number(e.target.value))}
      />
      <TextField
        size='small'
        multiline
        rows={10}
        label='cuesStr'
        onChange={(e) => handleChangeCuesStr(e.target.value)}
        value={cuesStr}
      />
      <Table>
        <TableBody>
          {cues.map((cue, cueIndex) => (
            <TableRow key={cue.id}>
              <TableCell>{cue.label}</TableCell>
              <TableCell>
                <SentencePitchLine
                  pitchesArray={string2PitchesArray(cue.pitchStr)}
                />
              </TableCell>
              <TableCell>
                <TextField
                  fullWidth
                  value={cue.imagePath}
                  size='small'
                  variant='standard'
                  onChange={(e) =>
                    handleChangeImagePath(e.target.value, cueIndex)
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        variant='contained'
        sx={{ color: 'white' }}
        onClick={handleSubmit}
      >
        {!!id ? `更新` : '新規作成'}
      </Button>
    </div>
  );
};

export default RandomWorkoutForm;
