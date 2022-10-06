import * as R from 'ramda';
import { Button, MenuItem, Select, Switch, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import {
  HANDS,
  VERBS,
  COLORS,
  TOPIC_MODE,
  CueWorkoutParams,
  JOSHI_ORDER,
  NEGATIVE_SENTENCE,
} from '../../Model';
import { AppContext } from '../../App';
import {
  createCueFromParams,
  setCueWorkoutCue,
  setCueWorkoutParams,
} from '../../services/cueWorkout';

const CueWorkoutList = () => {
  const { state } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const { cueWorkout } = state;
  const { params } = cueWorkout;

  const handleClickColor = async (color: string) => {
    let updatedColors = [...params.colors];
    if (params.colors.includes(color)) {
      updatedColors = params.colors.filter((item) => item !== color);
    } else {
      updatedColors.push(color);
    }
    const updatedParams: CueWorkoutParams = {
      ...params,
      colors: updatedColors,
    };
    await setCueWorkoutParams(updatedParams);
    const cue = createCueFromParams(updatedParams);
    await setCueWorkoutCue(cue);
  };

  const handleClickHand = async (hand: string) => {
    let updatedHands = [...params.hands];
    if (params.hands.includes(hand)) {
      updatedHands = params.hands.filter((item) => item !== hand);
    } else {
      updatedHands.push(hand);
    }
    let updatedParams = R.assocPath<string[], CueWorkoutParams>(
      ['hands'],
      updatedHands
    )(params);

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

  const handleChangePosition = async (hasPosition: boolean) => {
    let updatedParams = R.assocPath<boolean, CueWorkoutParams>(
      ['hasPosition'],
      hasPosition
    )(params);

    // 位置指定を含める場合、トピックは使わない
    if (hasPosition) {
      updatedParams = R.assocPath<string, CueWorkoutParams>(
        ['topicMode'],
        TOPIC_MODE.noTopic
      )(updatedParams);
    }

    await setCueWorkoutParams(updatedParams);
    const cue = createCueFromParams(updatedParams);
    await setCueWorkoutCue(cue);
  };

  const handleClickVerb = async (verb: string) => {
    let updatedVerbs = [...params.verbs];
    if (params.verbs.includes(verb)) {
      updatedVerbs = params.verbs.filter((item) => item !== verb);
    } else {
      updatedVerbs.push(verb);
    }
    const updatedParams: CueWorkoutParams = {
      ...params,
      verbs: updatedVerbs,
    };
    await setCueWorkoutParams(updatedParams);
    const cue = createCueFromParams(updatedParams);
    await setCueWorkoutCue(cue);
  };

  const handleChangeTime = async (time: number) => {
    const updatedParams: CueWorkoutParams = {
      ...params,
      time,
    };
    await setCueWorkoutParams(updatedParams);
  };

  const handleChangeJoshiOrder = async (joshiOrder: string) => {
    let updatedParams = R.assocPath<string, CueWorkoutParams>(
      ['joshiOrder'],
      joshiOrder
    )(params);
    await setCueWorkoutParams(updatedParams);
    const cue = createCueFromParams(updatedParams);
    await setCueWorkoutCue(cue);
  };

  const handleChangeTopicMode = async (topicMode: string) => {
    let updatedParams = R.assocPath<string, CueWorkoutParams>(
      ['topicMode'],
      topicMode
    )(params);
    // トピックの練習をするときは、手と位置は含めない
    if (topicMode !== TOPIC_MODE.noTopic) {
      console.log('!!');
      updatedParams = R.compose(
        R.assocPath<string[], CueWorkoutParams>(['hands'], []),
        R.assocPath<boolean, CueWorkoutParams>(['hasPosition'], false)
      )(updatedParams);
    }
    await setCueWorkoutParams(updatedParams);
    const cue = createCueFromParams(updatedParams);
    await setCueWorkoutCue(cue);
  };

  const handleChangeNegativeSentence = async (negativeSentence: string) => {
    let updatedParams = R.assocPath<string, CueWorkoutParams>(
      ['negativeSentence'],
      negativeSentence
    )(params);
    await setCueWorkoutParams(updatedParams);
    const cue = createCueFromParams(updatedParams);
    await setCueWorkoutCue(cue);
  };

  const handleReset = async () => {
    const updatedParams: CueWorkoutParams = {
      ...params,
      points: 0,
      isRunning: false,
    };
    await setCueWorkoutParams(updatedParams);
    const cue = createCueFromParams(updatedParams);
    await setCueWorkoutCue(cue);
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
        <h3>紙コップ(CueWorkout)</h3>
        <Button onClick={() => setOpen(!open)}>{open ? 'hide' : 'open'}</Button>
      </div>
      {open && (
        <div style={{ display: 'grid', rowGap: 8 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 80px)',
              alignItems: 'center',
            }}
          >
            <h4>Points</h4>
            <div>{params.points}</div>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 100px)',
              alignItems: 'center',
            }}
          >
            <h4>IsRunning</h4>
            <div>{String(params.isRunning)}</div>
          </div>
          <Button fullWidth variant='outlined' onClick={handleReset}>
            reset
          </Button>
          <h4>色</h4>
          <div
            style={{
              display: 'grid',
              columnGap: 8,
              gridTemplateColumns: 'repeat(6, 80px)',
            }}
          >
            {COLORS.map((color) => (
              <Button
                key={color}
                color={params.colors.includes(color) ? 'primary' : 'secondary'}
                onClick={() => handleClickColor(color)}
              >
                {color}
              </Button>
            ))}
          </div>
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
                color={params.hands.includes(hand) ? 'primary' : 'secondary'}
                onClick={() => handleClickHand(hand)}
              >
                {hand}
              </Button>
            ))}
          </div>
          <h4>一番右・一番左（Position）</h4>
          <Switch
            checked={params.hasPosition}
            onChange={(_, checked) => handleChangePosition(checked)}
          />
          <h4>Verbs</h4>
          <div
            style={{
              display: 'grid',
              columnGap: 8,
              gridTemplateColumns: 'repeat(6, 80px)',
            }}
          >
            {VERBS.map((verb) => (
              <Button
                key={verb}
                color={params.verbs.includes(verb) ? 'primary' : 'secondary'}
                onClick={() => handleClickVerb(verb)}
              >
                <span style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                  {verb}
                </span>
              </Button>
            ))}
          </div>
          <h4>Time</h4>
          <TextField
            fullWidth
            size='small'
            type='number'
            value={params.time}
            onChange={(e) => handleChangeTime(Number(e.target.value))}
          />
          <h4>助詞順序</h4>
          <Select
            value={params.joshiOrder}
            size='small'
            onChange={(e) => handleChangeJoshiOrder(e.target.value)}
          >
            {Object.values(JOSHI_ORDER).map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
          <h4>トピック</h4>
          <Select
            value={params.topicMode}
            size='small'
            onChange={(e) => handleChangeTopicMode(e.target.value)}
          >
            {Object.values(TOPIC_MODE).map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
          <h4>否定</h4>
          <Select
            value={params.negativeSentence}
            size='small'
            onChange={(e) => handleChangeNegativeSentence(e.target.value)}
          >
            {Object.values(NEGATIVE_SENTENCE).map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </div>
      )}
    </div>
  );
};

export default CueWorkoutList;
