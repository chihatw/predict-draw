import { ICuePatternParams } from "@/application/cuePatternParams/core/0-interface";
import { cuePatternParamsActions } from "@/application/cuePatternParams/framework/0-reducer";
import { cueWorkoutCueActions } from "@/application/cueWorkoutCue/framework/0-reducer";
import { Checkbox } from "@/components/ui/checkbox";
import { RootState } from "@/main";
import { useDispatch, useSelector } from "react-redux";

const PatternListSwitchesPane = () => {
  const dispatch = useDispatch();
  const cuePatternParams = useSelector(
    (state: RootState) => state.cuePatternParams,
  );
  const { colors } = useSelector((state: RootState) => state.cueWorkoutParams);

  const handleChangePatternParams = (
    updatedPatternParams: ICuePatternParams,
  ) => {
    dispatch(cuePatternParamsActions.updateProps(updatedPatternParams));
    dispatch(
      cueWorkoutCueActions.updateCueStart({
        colors,
        cuePatternParams: updatedPatternParams,
      }),
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="select-none text-sm">主題</div>
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={cuePatternParams.hasWoTopic}
            onCheckedChange={(checked) => {
              handleChangePatternParams({
                ...cuePatternParams,
                hasWoTopic: checked as boolean,
              });
            }}
          />
          <label className="text-sm">ヲ格</label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            checked={cuePatternParams.hasNiTopic}
            onCheckedChange={(checked) => {
              handleChangePatternParams({
                ...cuePatternParams,
                hasNiTopic: checked as boolean,
              });
            }}
          />
          <label className="text-sm">ニ格</label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            checked={cuePatternParams.hasNoneTopic}
            onCheckedChange={(checked) => {
              handleChangePatternParams({
                ...cuePatternParams,
                hasNoneTopic: checked as boolean,
              });
            }}
          />
          <label className="text-sm">なし</label>
        </div>

        {!cuePatternParams.hasWoTopic &&
          !cuePatternParams.hasNiTopic &&
          !cuePatternParams.hasNoneTopic && (
            <div style={{ fontSize: 12, color: "red" }}>
              １つ以上指定してださい
            </div>
          )}
      </div>
      <div style={{ display: "flex", alignItems: "center", columnGap: 16 }}>
        <div style={{ fontSize: 14, userSelect: "none" }}>分類</div>
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={cuePatternParams.hasWoGroping}
            onCheckedChange={(checked) => {
              handleChangePatternParams({
                ...cuePatternParams,
                hasWoGroping: checked as boolean,
              });
            }}
          />
          <label className="text-sm">ヲ格</label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            checked={cuePatternParams.hasNiGroping}
            onCheckedChange={(checked) => {
              handleChangePatternParams({
                ...cuePatternParams,
                hasNiGroping: checked as boolean,
              });
            }}
          />
          <label className="text-sm">ニ格</label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            checked={cuePatternParams.hasNoneGroping}
            onCheckedChange={(checked) => {
              handleChangePatternParams({
                ...cuePatternParams,
                hasNoneGroping: checked as boolean,
              });
            }}
          />
          <label className="text-sm">なし</label>
        </div>

        {!cuePatternParams.hasWoGroping &&
          !cuePatternParams.hasNiGroping &&
          !cuePatternParams.hasNoneGroping && (
            <div style={{ fontSize: 12, color: "red" }}>
              １つ以上指定してださい
            </div>
          )}
      </div>
      <div style={{ display: "flex", alignItems: "center", columnGap: 16 }}>
        <div style={{ fontSize: 14, userSelect: "none" }}>格順</div>
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={cuePatternParams.hasStraightOrder}
            onCheckedChange={(checked) => {
              handleChangePatternParams({
                ...cuePatternParams,
                hasStraightOrder: checked as boolean,
              });
            }}
          />
          <label className="text-sm">正順</label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            checked={cuePatternParams.hasInvertOrder}
            onCheckedChange={(checked) => {
              handleChangePatternParams({
                ...cuePatternParams,
                hasInvertOrder: checked as boolean,
              });
            }}
          />
          <label className="text-sm">逆順</label>
        </div>

        {!cuePatternParams.hasStraightOrder &&
          !cuePatternParams.hasInvertOrder && (
            <div style={{ fontSize: 12, color: "red" }}>
              １つ以上指定してださい
            </div>
          )}
      </div>
      <div style={{ display: "flex", alignItems: "center", columnGap: 16 }}>
        <div style={{ fontSize: 14, userSelect: "none" }}>肯否</div>
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={cuePatternParams.hasPositive}
            onCheckedChange={(checked) => {
              handleChangePatternParams({
                ...cuePatternParams,
                hasPositive: checked as boolean,
              });
            }}
          />
          <label className="text-sm">肯定</label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            checked={cuePatternParams.hasNegative}
            onCheckedChange={(checked) => {
              handleChangePatternParams({
                ...cuePatternParams,
                hasNegative: checked as boolean,
              });
            }}
          />
          <label className="text-sm">否定</label>
        </div>

        {!cuePatternParams.hasPositive && !cuePatternParams.hasNegative && (
          <div style={{ fontSize: 12, color: "red" }}>
            １つ以上指定してださい
          </div>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center", columnGap: 16 }}>
        <div style={{ fontSize: 14, userSelect: "none" }}>
          主題と分類の重複指定
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={cuePatternParams.hasGroupingTopic}
            onCheckedChange={(checked) => {
              handleChangePatternParams({
                ...cuePatternParams,
                hasGroupingTopic: checked as boolean,
              });
            }}
          />
          <label className="text-sm">許可</label>
        </div>

        {cuePatternParams.hasGroupingTopic && (
          <div style={{ fontSize: 12, color: "red" }}>
            主題と分類の重複指定が許可されました
          </div>
        )}
      </div>
    </div>
  );
};

export default PatternListSwitchesPane;
