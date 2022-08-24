import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import Check from '@mui/icons-material/Check';
import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';
import React, { useContext } from 'react';
import AppContext from '../../services/context';
import {
  deleteRandomWorkout,
  setRandomWorkoutId,
} from '../../services/randomWorkout';
import { useNavigate } from 'react-router-dom';
import { RandomWorkoutParams } from '../../Model';

const RandomWorkoutList = () => {
  const { state, dispatch } = useContext(AppContext);
  const { randomWorkout } = state;
  const { workoutId, workouts } = randomWorkout;

  const navigate = useNavigate();
  const openCreatePage = () => {
    navigate('/mng/random/new');
  };
  const openEditPage = (workoutId: string) => {
    navigate(`/mng/random/${workoutId}`);
  };
  const handleDelete = async (workoutId: string) => {
    if (!dispatch) return;
    if (window.confirm('delete?')) {
      await deleteRandomWorkout(workoutId);
    }
  };

  const handleCheck = async (checkedId: string) => {
    const checkedWorkout = workouts[checkedId];
    const { cues, roundCount } = checkedWorkout;
    const cueIds = cues.map(({ id }) => id);
    let tmpCueIds: string[] = [];

    for (let i = 0; i < roundCount; i++) {
      tmpCueIds = tmpCueIds.concat(cueIds);
    }
    await setRandomWorkoutId(
      checkedId === workoutId ? '' : checkedId,
      checkedId === workoutId ? [] : tmpCueIds
    );
  };
  return (
    <div>
      <h3>RandomWorkout</h3>
      <Button onClick={openCreatePage}>新規作成</Button>
      <Table>
        <TableBody>
          {Object.values(workouts).map((workout) => (
            <TableRow key={workout.id}>
              <TableCell>
                <IconButton
                  onClick={() => handleCheck(workout.id)}
                  sx={{
                    color: workout.id === workoutId ? '#52a2aa' : '#555',
                  }}
                >
                  <Check />
                </IconButton>
              </TableCell>
              <TableCell>{workout.title}</TableCell>
              <TableCell>
                <IconButton
                  size='small'
                  onClick={() => openEditPage(workout.id)}
                >
                  <Edit />
                </IconButton>
              </TableCell>
              <TableCell>
                <IconButton
                  size='small'
                  onClick={() => handleDelete(workout.id)}
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RandomWorkoutList;
