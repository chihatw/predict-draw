import { cueWorkoutParamsActions } from "@/application/cueWorkoutParams/framework/0-reducer";
import { RootState } from "@/main";

import { useDispatch, useSelector } from "react-redux";

import { cueWorkoutCueActions } from "@/application/cueWorkoutCue/framework/0-reducer";
import { COLORS } from "@/application/cueWorkoutParams/core/1-constants";
import { toggleElement } from "@/application/cueWorkoutParams/core/2-services";
import { Button } from "@/components/ui/button";

const SelectColors = () => {
  const dispatch = useDispatch();
  const { colors } = useSelector((state: RootState) => state.cueWorkoutParams);
  const cuePatternParams = useSelector(
    (state: RootState) => state.cuePatternParams,
  );

  const handleClickColor = async (color: string) => {
    const updatedColors = toggleElement([...colors], color);
    dispatch(cueWorkoutParamsActions.setColors(updatedColors));
    dispatch(
      cueWorkoutCueActions.updateCueStart({
        colors: updatedColors,
        cuePatternParams,
      }),
    );
  };

  return (
    <>
      <h4>色</h4>
      <div
        style={{
          display: "grid",
          columnGap: 8,
          gridTemplateColumns: "repeat(6, 80px)",
        }}
      >
        {COLORS.map((color) => (
          <Button
            key={color}
            variant="ghost"
            className={
              colors.includes(color) ? "text-green-600" : "text-purple-600"
            }
            onClick={() => handleClickColor(color)}
          >
            {color}
          </Button>
        ))}
      </div>
    </>
  );
};

export default SelectColors;
