import { Clear } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import { speedWorkoutParamsActions } from "@/application/speedWorkoutParams/framework/0-reducer";
import { RootState } from "@/main";
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
      <IconButton size="small" onClick={handleReset}>
        <Clear color="warning" />
      </IconButton>
    </div>
  );
};

export default SpeedWorkoutBPMPane;
