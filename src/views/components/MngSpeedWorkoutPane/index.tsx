import { useEffect, useState } from "react";

import { speedWorkoutParamsActions } from "@/application/speedWorkoutParams/framework/0-reducer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RootState } from "@/main";
import { useDispatch, useSelector } from "react-redux";
import SpeedWorkoutBPMPane from "./SpeedWorkoutBPMPane";
import SpeedWorkoutRow from "./SpeedWorkoutRow";

const LOCAL_STORAGE = "speedWorkkout";

const MngSpeedWorkoutPane = () => {
  const dispatch = useDispatch();
  const speedWorkoutIds = useSelector(
    (state: RootState) => state.speedWorkouts.ids,
  );
  const totalRounds = useSelector(
    (state: RootState) => state.speedWorkoutParams.totalRounds,
  );

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const value = localStorage.getItem(LOCAL_STORAGE);
    setOpen(value === String(true));
  }, []);

  const handleChangeTotalRounds = (totalRounds: number) => {
    dispatch(speedWorkoutParamsActions.changeTotalRounds(totalRounds));
  };

  const handleClickTitle = () => {
    const updatedOpen = !open;
    setOpen(updatedOpen);
    localStorage.setItem(LOCAL_STORAGE, String(updatedOpen));
  };

  return (
    <div style={{ display: "grid", rowGap: 8 }}>
      <Button
        variant="ghost"
        className="w-full justify-start text-black"
        onClick={handleClickTitle}
      >
        <h3>速読練習</h3>
      </Button>
      {open && (
        <div className="grid gap-2 px-8">
          <div className="flex items-center justify-between gap-2">
            <SpeedWorkoutBPMPane />
            <Input
              className="w-[120px]"
              type="number"
              placeholder="totalRounds"
              value={totalRounds}
              onChange={(e) => handleChangeTotalRounds(Number(e.target.value))}
              autoComplete="off"
            />
          </div>
          <div>
            {speedWorkoutIds.map((speedWorkoutId, index) => (
              <SpeedWorkoutRow
                key={index}
                speedWorkoutId={speedWorkoutId as string}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MngSpeedWorkoutPane;
