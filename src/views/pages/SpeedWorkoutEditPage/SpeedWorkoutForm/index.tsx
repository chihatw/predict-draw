import { useEffect, useState } from "react";

import {
  buildSpeedWorkoutItems,
  buildSpeedWorkoutItemsStr,
} from "@/application/speedWorkoutEditPage/core/2-services";
import { speedWorkoutEditPageActions } from "@/application/speedWorkoutEditPage/framework/0-reducer";
import { CUE_TYPES } from "@/application/speedWorkouts/core/1-constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RootState } from "@/main";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import WorkoutItemRow from "./WorkoutItemRow";

const SpeedWorkoutForm = ({ workoutId }: { workoutId: string }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const speedWorkout = useSelector(
    (state: RootState) => state.speedWorkouts.entities[workoutId],
  );

  const speedWorkoutEditPage = useSelector(
    (state: RootState) => state.speedWorkoutEditPage,
  );

  const [value, setValue] = useState({ workoutItemsStr: "", cuesStr: "" });

  useEffect(() => {
    if (!!value.workoutItemsStr) return;
    const _input = buildSpeedWorkoutItemsStr(speedWorkoutEditPage.workoutItems);
    setValue((currentValue) => ({ ...currentValue, workoutItemsStr: _input }));
  }, [speedWorkoutEditPage.workoutItems, value.workoutItemsStr]);

  useEffect(() => {
    const workoutItems = buildSpeedWorkoutItems(value.workoutItemsStr);
    dispatch(speedWorkoutEditPageActions.setWorkoutItems(workoutItems));
  }, [value.workoutItemsStr]);

  useEffect(() => {
    if (!speedWorkout) return;
    dispatch(speedWorkoutEditPageActions.initiate(speedWorkout));
  }, [speedWorkout]);

  const handleChangeLabel = (label: string) => {
    dispatch(speedWorkoutEditPageActions.changeLabel(label));
  };

  const handleChangeCueType = (cueType: string) => {
    dispatch(speedWorkoutEditPageActions.changeCueType(cueType));
  };

  const handleSubmit = () => {
    if (!workoutId) return;
    dispatch(
      speedWorkoutEditPageActions.submit({ workoutId, speedWorkoutEditPage }),
    );
    navigate("/mng");
  };

  if (!speedWorkout) return;
  return (
    <div className="mx-auto max-w-lg py-40 pt-20">
      <div className="grid gap-2">
        <div>{`beatCount: ${speedWorkoutEditPage.beatCount}`}</div>
        <Input
          placeholder="label"
          value={speedWorkoutEditPage.label}
          onChange={(e) => handleChangeLabel(e.target.value)}
        />
        <div className="p-2.5 text-xs text-gray-700">
          <div>text</div>
          <div>chinese</div>
          <div>pitchStr</div>
          <div>cuePitchStr</div>
        </div>
        <Textarea
          rows={12}
          placeholder="workout items"
          value={value.workoutItemsStr}
          onChange={(e) =>
            setValue((currentValue) => ({
              ...currentValue,
              workoutItemsStr: e.target.value,
            }))
          }
        />

        <Select
          value={speedWorkoutEditPage.cueType}
          onValueChange={(value) => handleChangeCueType(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="type" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(CUE_TYPES).map((type, index) => (
              <SelectItem key={index} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="grid gap-4">
          {speedWorkoutEditPage.workoutItems.map((_, index) => (
            <WorkoutItemRow index={index} key={index} />
          ))}
        </div>
        <Button variant="outline" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default SpeedWorkoutForm;
