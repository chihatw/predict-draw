import * as R from 'ramda';
import { Button } from '@mui/material';
import React, { useContext } from 'react';
import { HANDS, TOPIC_MODE, CueWorkoutParams } from '../../../Model';
import { AppContext } from '../../../App';
import {
  setCueWorkoutCue,
  setCueWorkoutParams,
} from '../../../services/cueWorkout/cueWorkout';
import { toggleElement } from '../../../services/utils';
import createCueFromParams from '../../../services/cueWorkout/createCueFromParams';

const SelectHand = () => {
  const { state } = useContext(AppContext);
  const handleClickHand = async (hand: string) => {
    const updatedHands = toggleElement(
      [...state.cueWorkout.params.hands],
      hand
    );
    let updatedParams = R.assocPath<string[], CueWorkoutParams>(
      ['hands'],
      updatedHands
    )(state.cueWorkout.params);

    // 手を含める場合、トピックは使わない
    if (!!updatedHands.length) {
      updatedParams = R.assocPath<string, CueWorkoutParams>(
        ['topicMode'],
        TOPIC_MODE.noTopic
      )(updatedParams);
    }

    await setCueWorkoutParams(updatedParams);
    const cue = createCueFromParams(updatedParams);
    await setCueWorkoutCue(cue);
  };
  return (
    <>
      <h4>自分の手・私の手（Hands）</h4>
      <div
        style={{
          display: 'grid',
          columnGap: 8,
          gridTemplateColumns: 'repeat(6, 80px)',
        }}
      >
        {HANDS.map((hand) => (
          <Button
            key={hand}
            color={
              state.cueWorkout.params.hands.includes(hand)
                ? 'primary'
                : 'secondary'
            }
            onClick={() => handleClickHand(hand)}
          >
            {hand}
          </Button>
        ))}
      </div>
    </>
  );
};

export default SelectHand;
