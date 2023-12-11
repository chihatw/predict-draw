import { cueWorkoutParamsActions } from "@/application/cueWorkoutParams/framework/0-reducer";
import { Input } from "@/components/ui/input";
import { RootState } from "@/main";
import { useDispatch, useSelector } from "react-redux";

const SetTime = () => {
  const dispatch = useDispatch();
  const { time } = useSelector((state: RootState) => state.cueWorkoutParams);
  const handleChangeTime = async (time: number) => {
    dispatch(cueWorkoutParamsActions.setTime(time));
  };
  return (
    <div>
      <h4>Time</h4>
      <Input
        type="number"
        value={time}
        onChange={(e) => handleChangeTime(Number(e.target.value))}
      />
    </div>
  );
};

export default SetTime;
