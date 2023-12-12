import { speedWorkoutParamsActions } from "@/application/speedWorkoutParams/framework/0-reducer";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";

function ResetButton() {
  const dispatch = useDispatch();
  const handleReset = () => {
    dispatch(speedWorkoutParamsActions.reset());
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Button variant="outline" className="w-[260px]" onClick={handleReset}>
        RESET
      </Button>
    </div>
  );
}

export default ResetButton;
