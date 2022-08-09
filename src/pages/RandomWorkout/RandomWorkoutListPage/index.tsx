import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import {
  Button,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../../services/context';
import { deleteRandomWorkout } from '../../../services/randomWorkout';
import { ActionTypes } from '../../../Update';

const RandomWorkoutListPage = () => {
  const { state, dispatch } = useContext(AppContext);
  const { randomWorkout } = state;
  const { workouts } = randomWorkout;

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

  return (
    <Container maxWidth='sm' sx={{ paddingTop: 2 }}>
      <h2>RandomWorkout List</h2>
      <Button onClick={openCreatePage}>新規作成</Button>
      <Table size='small'>
        <TableBody>
          {!!workouts &&
            Object.values(workouts).map((workout) => (
              <TableRow key={workout.id}>
                <TableCell>{workout.title}</TableCell>
                <TableCell>{workout.roundCount}</TableCell>
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
    </Container>
  );
};

export default RandomWorkoutListPage;
