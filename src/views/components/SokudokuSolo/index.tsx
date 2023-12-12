import { calcBpm } from "@/application/speedWorkoutParams/core/2-services";
import { speedWorkoutParamsActions } from "@/application/speedWorkoutParams/framework/0-reducer";
import { RootState } from "@/main";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BPMCulcLabel from "./BPMCulcLabel";

import BpmPane from "./BpmPane";
import ResetButton from "./ResetButton";
import TimePane from "./TimePane";
import TimerButton from "./TimerButton";

const SokudokuSoloPane = () => {
  const dispatch = useDispatch();
  const { selectedId, isRunning, bpm } = useSelector(
    (state: RootState) => state.speedWorkoutParams,
  );
  const speedWorkout = useSelector(
    (state: RootState) => state.speedWorkouts.entities[selectedId],
  );

  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (!bpm) {
      setElapsedTime(0);
    }
  }, [bpm]);

  const loopIdRef = useRef(0);
  const startAtRef = useRef(0);

  const start = () => {
    dispatch(speedWorkoutParamsActions.startWorkout());
    startAtRef.current = performance.now();
    loopIdRef.current = requestAnimationFrame(loop);
  };
  const loop = () => {
    const elapsedTime = Math.floor(performance.now() - startAtRef.current);
    setElapsedTime(elapsedTime);
    loopIdRef.current = requestAnimationFrame(loop);
  };
  const stop = () => {
    if (!speedWorkout) return;
    const elapsedTime = Math.floor(performance.now() - startAtRef.current);

    cancelAnimationFrame(loopIdRef.current);

    const bpm = calcBpm({
      miliSeconds: elapsedTime,
      beatCount: speedWorkout.beatCount,
    });

    dispatch(speedWorkoutParamsActions.stopWorkout(bpm));
  };

  const handleClick = () => {
    if (isRunning) {
      stop();
    } else {
      start();
    }
  };

  if (!speedWorkout) return <></>;
  return (
    <div className="mt-6 grid gap-10">
      <BPMCulcLabel />
      <div>
        <BpmPane />
        <TimePane miliSeconds={elapsedTime} />
      </div>
      <TimerButton handleClick={handleClick} />
      <ResetButton />
    </div>
  );
};

export default SokudokuSoloPane;
