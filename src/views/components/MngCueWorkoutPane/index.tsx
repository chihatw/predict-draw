import { useEffect, useState } from "react";

import SelectColors from "./SelectColors";
import SetTime from "./SetTime";
import ShowStatus from "./ShowStatus";

import { Button } from "@/components/ui/button";
import PatternList from "./PatternList";

const LOCAL_STATE = "cueWorkout";

const MngCueWorkoutPane = () => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const value = localStorage.getItem(LOCAL_STATE);
    setOpen(value === String(true));
  }, []);
  const handleClickTitle = () => {
    const updatedOpen = !open;
    setOpen(updatedOpen);
    localStorage.setItem(LOCAL_STATE, String(updatedOpen));
  };
  return (
    <div>
      <Button
        variant="ghost"
        className="w-full justify-start"
        onClick={handleClickTitle}
      >
        <h3>紙コップ(CueWorkout)</h3>
      </Button>
      {open && (
        <div className="grid gap-2 px-8">
          <ShowStatus />
          <SetTime />
          <SelectColors />
          <PatternList />
        </div>
      )}
    </div>
  );
};

export default MngCueWorkoutPane;
