import { speedWorkoutParamsActions } from "@/application/speedWorkoutParams/framework/0-reducer";
import { Button } from "@/components/ui/button";
import { RootState } from "@/main";
import { Check } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function SpeedWorkoutRow({ speedWorkoutId }: { speedWorkoutId: string }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const label = useSelector(
    (state: RootState) => state.speedWorkouts.entities[speedWorkoutId]?.label,
  );
  const selectedId = useSelector(
    (state: RootState) => state.speedWorkoutParams.selectedId,
  );
  const handleChangeSelectedId = (id: string) => {
    dispatch(speedWorkoutParamsActions.selectId(id !== selectedId ? id : ""));
  };

  const handleOpenEditor = (workoutId: string) => {
    navigate(`/mng/speed/${workoutId}`);
  };
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Button
        variant="ghost"
        className={
          selectedId === speedWorkoutId ? "text-green-600" : "text-gray-500"
        }
        onClick={() => handleChangeSelectedId(speedWorkoutId)}
      >
        <Check />
      </Button>

      <Button
        variant="ghost"
        className="justify-start"
        onClick={() => handleOpenEditor(speedWorkoutId)}
      >
        {label}
      </Button>
    </div>
  );
}

export default SpeedWorkoutRow;
