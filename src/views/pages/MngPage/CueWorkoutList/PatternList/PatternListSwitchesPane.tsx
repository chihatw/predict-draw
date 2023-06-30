import { Checkbox, FormControlLabel } from '@mui/material';
import * as R from 'ramda';
import { useContext, useEffect } from 'react';

import {
  CueWorkoutParams,
  INITIAL_PATTERN_PARAMS,
  PatternParams,
} from '../../../../../Model';

import { PatternListContext } from '.';
import { AppContext } from '../../../../../App';
import createCueFromParams from '../../../../../services/cueWorkout/createCueFromParams';
import {
  setCueWorkoutCue,
  setCueWorkoutParams,
} from '../../../../../services/cueWorkout/cueWorkout';

const PatternListSwitchesPane = () => {
  const { state } = useContext(AppContext);
  const { listState, listDispatch } = useContext(PatternListContext);

  useEffect(() => {
    if (JSON.stringify(listState) !== JSON.stringify(INITIAL_PATTERN_PARAMS))
      return;

    if (
      JSON.stringify(state.cueWorkout.params.patternParams) !==
      JSON.stringify(listState)
    ) {
      listDispatch(state.cueWorkout.params.patternParams);
    }
  }, [state.cueWorkout.params.patternParams, listState]);

  const handleChangePatternParams = (updatedPatternParams: PatternParams) => {
    listDispatch(updatedPatternParams);
    const updatedParams = R.assocPath<PatternParams, CueWorkoutParams>(
      ['patternParams'],
      updatedPatternParams
    )(state.cueWorkout.params);
    setCueWorkoutParams(updatedParams);

    const cue = createCueFromParams(
      updatedParams.colors,
      updatedParams.patternParams
    );
    setCueWorkoutCue(cue);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', columnGap: 16 }}>
        <div style={{ fontSize: 14, userSelect: 'none' }}>主題</div>
        <FormControlLabel
          control={
            <Checkbox
              size='small'
              checked={listState.hasWoTopic}
              onChange={(e) => {
                handleChangePatternParams({
                  ...listState,
                  hasWoTopic: e.target.checked,
                });
              }}
            />
          }
          label={<div style={{ fontSize: 14, userSelect: 'none' }}>ヲ格</div>}
        />
        <FormControlLabel
          control={
            <Checkbox
              size='small'
              checked={listState.hasNiTopic}
              onChange={(e) =>
                handleChangePatternParams({
                  ...listState,
                  hasNiTopic: e.target.checked,
                })
              }
            />
          }
          label={<div style={{ fontSize: 14, userSelect: 'none' }}>ニ格</div>}
        />
        <FormControlLabel
          control={
            <Checkbox
              size='small'
              checked={listState.hasNoneTopic}
              onChange={(e) =>
                handleChangePatternParams({
                  ...listState,
                  hasNoneTopic: e.target.checked,
                })
              }
            />
          }
          label={<div style={{ fontSize: 14, userSelect: 'none' }}>なし</div>}
        />
        {!listState.hasWoTopic &&
          !listState.hasNiTopic &&
          !listState.hasNoneTopic && (
            <div style={{ fontSize: 12, color: 'red' }}>
              １つ以上指定してださい
            </div>
          )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', columnGap: 16 }}>
        <div style={{ fontSize: 14, userSelect: 'none' }}>分類</div>
        <FormControlLabel
          control={
            <Checkbox
              size='small'
              checked={listState.hasWoGroping}
              onChange={(e) =>
                handleChangePatternParams({
                  ...listState,
                  hasWoGroping: e.target.checked,
                })
              }
            />
          }
          label={<div style={{ fontSize: 14, userSelect: 'none' }}>ヲ格</div>}
        />
        <FormControlLabel
          control={
            <Checkbox
              size='small'
              checked={listState.hasNiGroping}
              onChange={(e) =>
                handleChangePatternParams({
                  ...listState,
                  hasNiGroping: e.target.checked,
                })
              }
            />
          }
          label={<div style={{ fontSize: 14, userSelect: 'none' }}>ニ格</div>}
        />
        <FormControlLabel
          control={
            <Checkbox
              size='small'
              checked={listState.hasNoneGroping}
              onChange={(e) =>
                handleChangePatternParams({
                  ...listState,
                  hasNoneGroping: e.target.checked,
                })
              }
            />
          }
          label={<div style={{ fontSize: 14 }}>なし</div>}
        />
        {!listState.hasWoGroping &&
          !listState.hasNiGroping &&
          !listState.hasNoneGroping && (
            <div style={{ fontSize: 12, color: 'red' }}>
              １つ以上指定してださい
            </div>
          )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', columnGap: 16 }}>
        <div style={{ fontSize: 14, userSelect: 'none' }}>格順</div>
        <FormControlLabel
          control={
            <Checkbox
              size='small'
              checked={listState.hasStraightOrder}
              onChange={(e) =>
                handleChangePatternParams({
                  ...listState,
                  hasStraightOrder: e.target.checked,
                })
              }
            />
          }
          label={<div style={{ fontSize: 14, userSelect: 'none' }}>正順</div>}
        />
        <FormControlLabel
          control={
            <Checkbox
              size='small'
              checked={listState.hasInvertOrder}
              onChange={(e) =>
                handleChangePatternParams({
                  ...listState,
                  hasInvertOrder: e.target.checked,
                })
              }
            />
          }
          label={<div style={{ fontSize: 14, userSelect: 'none' }}>逆順</div>}
        />
        {!listState.hasStraightOrder && !listState.hasInvertOrder && (
          <div style={{ fontSize: 12, color: 'red' }}>
            １つ以上指定してださい
          </div>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', columnGap: 16 }}>
        <div style={{ fontSize: 14, userSelect: 'none' }}>肯否</div>
        <FormControlLabel
          control={
            <Checkbox
              size='small'
              checked={listState.hasPositive}
              onChange={(e) =>
                handleChangePatternParams({
                  ...listState,
                  hasPositive: e.target.checked,
                })
              }
            />
          }
          label={<div style={{ fontSize: 14, userSelect: 'none' }}>肯定</div>}
        />
        <FormControlLabel
          control={
            <Checkbox
              size='small'
              checked={listState.hasNegative}
              onChange={(e) =>
                handleChangePatternParams({
                  ...listState,
                  hasNegative: e.target.checked,
                })
              }
            />
          }
          label={<div style={{ fontSize: 14, userSelect: 'none' }}>否定</div>}
        />
        {!listState.hasPositive && !listState.hasNegative && (
          <div style={{ fontSize: 12, color: 'red' }}>
            １つ以上指定してださい
          </div>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', columnGap: 16 }}>
        <div style={{ fontSize: 14, userSelect: 'none' }}>
          主題と分類の重複指定
        </div>
        <FormControlLabel
          control={
            <Checkbox
              size='small'
              checked={listState.hasGroupingTopic}
              onChange={(e) =>
                handleChangePatternParams({
                  ...listState,
                  hasGroupingTopic: e.target.checked,
                })
              }
            />
          }
          label={<div style={{ fontSize: 14, userSelect: 'none' }}>許可</div>}
        />
        {listState.hasGroupingTopic && (
          <div style={{ fontSize: 12, color: 'red' }}>
            主題と分類の重複指定が許可されました
          </div>
        )}
      </div>
    </div>
  );
};

export default PatternListSwitchesPane;
