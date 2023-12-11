import { cuePatternActions } from "@/application/cuePattern/framework/0-reducer";
import { ICuePatternParams } from "@/application/cuePatternParams/core/0-interface";
import { Services } from "@/infrastructure/services";
import { RootState } from "@/main";
import { AnyAction, Middleware } from "@reduxjs/toolkit";
import { updateCue } from "../core/2-services";
import { cueWorkoutCueActions } from "./0-reducer";

const cueWorkoutCueMiddleware =
  (services: Services): Middleware =>
  ({ dispatch, getState }) =>
  (next) =>
  async (action: AnyAction) => {
    next(action);
    switch (action.type) {
      case "cueWorkoutCue/updateCueStart": {
        const {
          cuePattern: currentCuePattern,
          cueWorkoutCue: currentCueWorkoutCue,
        } = getState() as RootState;
        const { colors, cuePatternParams } = action.payload as {
          colors: string[];
          cuePatternParams: ICuePatternParams;
        };
        const { cuePattern, cueWorkoutCue } = updateCue(
          colors,
          cuePatternParams,
          currentCuePattern,
          currentCueWorkoutCue,
        );
        dispatch(cuePatternActions.setProps(cuePattern));
        dispatch(cueWorkoutCueActions.setProps(cueWorkoutCue));

        services.api.cueWorkoutCue.setCueWorkoutCue(cueWorkoutCue, cuePattern);
        return;
      }
      default:
    }
  };

export default [cueWorkoutCueMiddleware];
