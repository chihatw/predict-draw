import { RootState } from "@/main";
import { Container } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ICuePattern } from "@/application/cuePattern/core/0-interface";
import { cueWorkoutCueActions } from "@/application/cueWorkoutCue/framework/0-reducer";
import { cueWorkoutParamsActions } from "@/application/cueWorkoutParams/framework/0-reducer";
import TimeDisplay from "../TimeDisplay";
import ColorList from "./CardList/ColorList";
import CuePane from "./CuePane";
import PlayButton from "./PlayButton";

const UserCueWorkoutPane = () => {
  const dispatch = useDispatch();

  const { isRunning, time, colors } = useSelector(
    (state: RootState) => state.cueWorkoutParams,
  );
  const { cuePatternParams, cuePattern, cueWorkoutCue } = useSelector(
    (state: RootState) => state,
  );

  const [miliSeconds, setMiliSeconds] = useState(0);

  const startAtRef = useRef(0);
  const loopIdRef = useRef(0);

  useEffect(() => {
    if (isRunning) return;
    const miliSeconds = time * 1000;

    setMiliSeconds(miliSeconds);
  }, [time, isRunning]);

  const start = async () => {
    startAtRef.current = performance.now();
    timerLoop();
    dispatch(cueWorkoutParamsActions.start());
  };

  const timerLoop = () => {
    const elapsedTime = performance.now() - startAtRef.current;
    const miliSeconds = time * 1000 - elapsedTime;
    if (miliSeconds > 0) {
      setMiliSeconds(miliSeconds);
      loopIdRef.current = window.requestAnimationFrame(timerLoop);
      return;
    }
    stopTimer();
  };

  const next = async () => {
    dispatch(cueWorkoutCueActions.updateCueStart({ colors, cuePatternParams }));
    dispatch(cueWorkoutParamsActions.next());
  };

  const stopTimer = async () => {
    setMiliSeconds(0);
    window.cancelAnimationFrame(loopIdRef.current);
    dispatch(cueWorkoutParamsActions.stop());
  };

  const handleClick = () => {
    isRunning ? next() : start();
  };

  return (
    <Container maxWidth="sm" sx={{ paddingTop: 0 }}>
      <div style={{ display: "grid", rowGap: 8 }}>
        <ColorList />
        <TimeDisplay miliSeconds={miliSeconds} />
        <div style={{ margin: "16px 0", height: 300 }}>
          {isRunning && (
            <CuePane cueWorkoutCue={cueWorkoutCue} cuePattern={cuePattern} />
          )}
        </div>
        <PlayButton handleClick={handleClick} />
      </div>
    </Container>
  );
};

export default UserCueWorkoutPane;

const isContinue = (
  currentPattern: ICuePattern,
  updatedPattern: ICuePattern,
) => {
  return isSamePattern(currentPattern, updatedPattern);
};

const isSamePattern = (
  currentPattern: ICuePattern,
  updatedPattern: ICuePattern,
) => {
  return JSON.stringify(updatedPattern) === JSON.stringify(currentPattern);
};
