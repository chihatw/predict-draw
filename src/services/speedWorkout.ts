import {
  collection,
  doc,
  DocumentData,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore';
import React, { useEffect } from 'react';
import { workoutItems2String } from 'workout-items';

import { ISpeedWorkoutParams } from 'application/speedWorkoutParams/core/0-interface';
import {
  INITIAL_SPEED_WORKOUT_EDIT_STATE,
  SpeedWorkoutEditState,
} from 'views/pages/SpeedWorkoutEditPage/Model';
import { db } from '../infrastructure/firebase';
import { INITIAL_WORKOUT, SpeedWorkout, State } from '../Model';
import { Action, ActionTypes } from '../Update';
import { SpeedWorkoutState } from '../views/components/UserSpeedWorkoutPane/Model';

const COLLECTIONS = { params: 'params', workouts: 'workouts' };

export const useSpeedWorkout = (dispatch: React.Dispatch<Action>) => {
  useEffect(() => {
    const q = query(
      collection(db, COLLECTIONS.workouts),
      orderBy('createdAt', 'desc'),
      limit(6)
    );
    const unsub = onSnapshot(
      q,
      (querySnapshot) => {
        console.log('snapshot speedWorkouts');
        const workouts: { [id: string]: SpeedWorkout } = {};
        querySnapshot.forEach((doc) => {
          workouts[doc.id] = buildSpeedWorkout(doc);
        });
        dispatch({ type: ActionTypes.setSpeedWorkouts, payload: workouts });
      },
      (err) => {
        console.warn(err);
      }
    );

    return () => {
      unsub();
    };
  }, []);
};

export const setSpeedWorkoutParams = (params: ISpeedWorkoutParams) => {
  console.log('set speedWorkoutParams');
  setDoc(doc(db, COLLECTIONS.params, 'speedWorkout'), params);
};

export const setSpeedWorkout = (workout: SpeedWorkout) => {
  console.log('set speedWorkout');
  const { id, ...omitted } = workout;
  setDoc(doc(db, COLLECTIONS.workouts, id), { ...omitted });
};

export const buildSpeedWorkoutState = (state: State): SpeedWorkoutState => {
  const workout =
    state.speedWorkouts[state.params.speedWorkout.selectedId] ||
    INITIAL_WORKOUT;

  return {
    workout,
    isRunning: false,
    updatedAt: state.params.speedWorkout.updatedAt,
    miliSeconds: 0,
    totalRounds: state.params.speedWorkout.totalRounds,
    checkedIndexes: state.params.speedWorkout.checkedIndexes,
  };
};

const buildSpeedWorkoutParams = (doc: DocumentData): ISpeedWorkoutParams => {
  const {
    bpm,
    updatedAt,
    isRunning,
    selectedId,
    totalRounds,
    currentRound,
    checkedIndexes,
  } = doc.data();
  return {
    bpm: bpm || 0,
    isRunning: isRunning || false,
    selectedId: selectedId || '',
    updatedAt: updatedAt || 0,
    checkedIndexes: checkedIndexes || [],
    totalRounds: totalRounds || 1,
    currentRound: currentRound || 1,
  };
};

const buildSpeedWorkout = (doc: DocumentData) => {
  const { id } = doc;
  const { createdAt, label, items, beatCount, cues, cueType } = doc.data();
  const workout: SpeedWorkout = {
    id: id || '',
    cues: cues || [],
    label: label || '',
    items: items || [],
    cueType: cueType || '',
    beatCount: beatCount || 0,
    createdAt: createdAt || 0,
  };
  return workout;
};

export const buildSpeedWorkoutEditState = (
  state: State,
  workoutId: string
): SpeedWorkoutEditState => {
  const speedWorkout = state.speedWorkouts[workoutId];
  if (!speedWorkout) return INITIAL_SPEED_WORKOUT_EDIT_STATE;

  return {
    label: speedWorkout.label,
    cues: speedWorkout.cues,
    cueStr: speedWorkout.cues.join('\n'),
    cueType: speedWorkout.cueType,
    beatCount: speedWorkout.beatCount,
    workoutItems: speedWorkout.items,
    workoutItemStr: workoutItems2String(speedWorkout.items),
  };
};
