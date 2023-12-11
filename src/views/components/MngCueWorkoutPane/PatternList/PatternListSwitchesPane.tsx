import { Checkbox, FormControlLabel } from '@mui/material';

import { ICuePatternParams } from '@/application/cuePatternParams/core/0-interface';
import { cuePatternParamsActions } from '@/application/cuePatternParams/framework/0-reducer';
import { cueWorkoutCueActions } from '@/application/cueWorkoutCue/framework/0-reducer';
import { RootState } from 'main';
import { useDispatch, useSelector } from 'react-redux';

const PatternListSwitchesPane = () => {
  const dispatch = useDispatch();
  const cuePatternParams = useSelector(
    (state: RootState) => state.cuePatternParams
  );
  const { colors } = useSelector((state: RootState) => state.cueWorkoutParams);

  const handleChangePatternParams = (
    updatedPatternParams: ICuePatternParams
  ) => {
    dispatch(cuePatternParamsActions.updateProps(updatedPatternParams));
    dispatch(
      cueWorkoutCueActions.updateCueStart({
        colors,
        cuePatternParams: updatedPatternParams,
      })
    );
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', columnGap: 16 }}>
        <div style={{ fontSize: 14, userSelect: 'none' }}>主題</div>
        <FormControlLabel
          control={
            <Checkbox
              size='small'
              checked={cuePatternParams.hasWoTopic}
              onChange={(e) => {
                handleChangePatternParams({
                  ...cuePatternParams,
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
              checked={cuePatternParams.hasNiTopic}
              onChange={(e) =>
                handleChangePatternParams({
                  ...cuePatternParams,
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
              checked={cuePatternParams.hasNoneTopic}
              onChange={(e) =>
                handleChangePatternParams({
                  ...cuePatternParams,
                  hasNoneTopic: e.target.checked,
                })
              }
            />
          }
          label={<div style={{ fontSize: 14, userSelect: 'none' }}>なし</div>}
        />
        {!cuePatternParams.hasWoTopic &&
          !cuePatternParams.hasNiTopic &&
          !cuePatternParams.hasNoneTopic && (
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
              checked={cuePatternParams.hasWoGroping}
              onChange={(e) =>
                handleChangePatternParams({
                  ...cuePatternParams,
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
              checked={cuePatternParams.hasNiGroping}
              onChange={(e) =>
                handleChangePatternParams({
                  ...cuePatternParams,
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
              checked={cuePatternParams.hasNoneGroping}
              onChange={(e) =>
                handleChangePatternParams({
                  ...cuePatternParams,
                  hasNoneGroping: e.target.checked,
                })
              }
            />
          }
          label={<div style={{ fontSize: 14 }}>なし</div>}
        />
        {!cuePatternParams.hasWoGroping &&
          !cuePatternParams.hasNiGroping &&
          !cuePatternParams.hasNoneGroping && (
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
              checked={cuePatternParams.hasStraightOrder}
              onChange={(e) =>
                handleChangePatternParams({
                  ...cuePatternParams,
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
              checked={cuePatternParams.hasInvertOrder}
              onChange={(e) =>
                handleChangePatternParams({
                  ...cuePatternParams,
                  hasInvertOrder: e.target.checked,
                })
              }
            />
          }
          label={<div style={{ fontSize: 14, userSelect: 'none' }}>逆順</div>}
        />
        {!cuePatternParams.hasStraightOrder &&
          !cuePatternParams.hasInvertOrder && (
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
              checked={cuePatternParams.hasPositive}
              onChange={(e) =>
                handleChangePatternParams({
                  ...cuePatternParams,
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
              checked={cuePatternParams.hasNegative}
              onChange={(e) =>
                handleChangePatternParams({
                  ...cuePatternParams,
                  hasNegative: e.target.checked,
                })
              }
            />
          }
          label={<div style={{ fontSize: 14, userSelect: 'none' }}>否定</div>}
        />
        {!cuePatternParams.hasPositive && !cuePatternParams.hasNegative && (
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
              checked={cuePatternParams.hasGroupingTopic}
              onChange={(e) =>
                handleChangePatternParams({
                  ...cuePatternParams,
                  hasGroupingTopic: e.target.checked,
                })
              }
            />
          }
          label={<div style={{ fontSize: 14, userSelect: 'none' }}>許可</div>}
        />
        {cuePatternParams.hasGroupingTopic && (
          <div style={{ fontSize: 12, color: 'red' }}>
            主題と分類の重複指定が許可されました
          </div>
        )}
      </div>
    </div>
  );
};

export default PatternListSwitchesPane;
