import { Checkbox, FormControlLabel } from '@mui/material';
import { useState } from 'react';

import { ICuePatternParams } from 'application/cuePatternParams/core/0-interface';
import { cuePatternParamsActions } from 'application/cuePatternParams/framework/0-reducer';
import { RootState } from 'main';
import { useDispatch, useSelector } from 'react-redux';
import createCueFromParams from '../../../../services/cueWorkout/createCueFromParams';
import { setCueWorkoutCue } from '../../../../services/cueWorkout/cueWorkout';

const PatternListSwitchesPane = () => {
  const dispatch = useDispatch();
  const cuePatternParams = useSelector(
    (state: RootState) => state.cuePatternParams
  );
  const { colors } = useSelector((state: RootState) => state.cueWorkoutParams);
  const [value, setValue] = useState(cuePatternParams);
  const handleChangePatternParams = (
    updatedPatternParams: ICuePatternParams
  ) => {
    setValue(updatedPatternParams);
    dispatch(cuePatternParamsActions.setProps(updatedPatternParams));
    const cue = createCueFromParams(colors, updatedPatternParams);
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
              checked={value.hasWoTopic}
              onChange={(e) => {
                handleChangePatternParams({
                  ...value,
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
              checked={value.hasNiTopic}
              onChange={(e) =>
                handleChangePatternParams({
                  ...value,
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
              checked={value.hasNoneTopic}
              onChange={(e) =>
                handleChangePatternParams({
                  ...value,
                  hasNoneTopic: e.target.checked,
                })
              }
            />
          }
          label={<div style={{ fontSize: 14, userSelect: 'none' }}>なし</div>}
        />
        {!value.hasWoTopic && !value.hasNiTopic && !value.hasNoneTopic && (
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
              checked={value.hasWoGroping}
              onChange={(e) =>
                handleChangePatternParams({
                  ...value,
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
              checked={value.hasNiGroping}
              onChange={(e) =>
                handleChangePatternParams({
                  ...value,
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
              checked={value.hasNoneGroping}
              onChange={(e) =>
                handleChangePatternParams({
                  ...value,
                  hasNoneGroping: e.target.checked,
                })
              }
            />
          }
          label={<div style={{ fontSize: 14 }}>なし</div>}
        />
        {!value.hasWoGroping &&
          !value.hasNiGroping &&
          !value.hasNoneGroping && (
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
              checked={value.hasStraightOrder}
              onChange={(e) =>
                handleChangePatternParams({
                  ...value,
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
              checked={value.hasInvertOrder}
              onChange={(e) =>
                handleChangePatternParams({
                  ...value,
                  hasInvertOrder: e.target.checked,
                })
              }
            />
          }
          label={<div style={{ fontSize: 14, userSelect: 'none' }}>逆順</div>}
        />
        {!value.hasStraightOrder && !value.hasInvertOrder && (
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
              checked={value.hasPositive}
              onChange={(e) =>
                handleChangePatternParams({
                  ...value,
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
              checked={value.hasNegative}
              onChange={(e) =>
                handleChangePatternParams({
                  ...value,
                  hasNegative: e.target.checked,
                })
              }
            />
          }
          label={<div style={{ fontSize: 14, userSelect: 'none' }}>否定</div>}
        />
        {!value.hasPositive && !value.hasNegative && (
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
              checked={value.hasGroupingTopic}
              onChange={(e) =>
                handleChangePatternParams({
                  ...value,
                  hasGroupingTopic: e.target.checked,
                })
              }
            />
          }
          label={<div style={{ fontSize: 14, userSelect: 'none' }}>許可</div>}
        />
        {value.hasGroupingTopic && (
          <div style={{ fontSize: 12, color: 'red' }}>
            主題と分類の重複指定が許可されました
          </div>
        )}
      </div>
    </div>
  );
};

export default PatternListSwitchesPane;
