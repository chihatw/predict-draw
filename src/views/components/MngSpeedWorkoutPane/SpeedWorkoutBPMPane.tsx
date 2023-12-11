import { speedWorkoutParamsActions } from "@/application/speedWorkoutParams/framework/0-reducer";
import { Button } from "@/components/ui/button";
import { RootState } from "@/main";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const SpeedWorkoutBPMPane = () => {
  const dispatch = useDispatch();
  const { isRunning, bpm } = useSelector(
    (state: RootState) => state.speedWorkoutParams,
  );

  const handleReset = () => {
    dispatch(speedWorkoutParamsActions.reset());
  };

  return (
    <div
      style={{
        height: 22,
        display: "flex",
        flexBasis: 200,
        alignItems: "center",
        columnGap: 8,
      }}
    >
      <h5 style={{ flexBasis: 80 }}>bpm</h5>
      {isRunning ? <div>計測中</div> : <div>{bpm}</div>}
      <Button variant="ghost" size="icon" onClick={handleReset}>
        <X />
      </Button>
    </div>
  );
};

export default SpeedWorkoutBPMPane;
