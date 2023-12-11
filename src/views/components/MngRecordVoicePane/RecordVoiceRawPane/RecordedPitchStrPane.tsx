import { recordVoiceParamsActions } from "@/application/recordVoiceParams/framework/0-reducer";
import { TextField } from "@mui/material";

import { RootState } from "@/main";
import { useDispatch, useSelector } from "react-redux";

const RecordedPitchStrPane = () => {
  const dispatch = useDispatch();
  const recordedPitchStr = useSelector(
    (state: RootState) => state.recordVoiceParams.recordedPitchStr,
  );
  const handleChange = (value: string) => {
    dispatch(recordVoiceParamsActions.changeRecordedPitchStr(value));
  };
  return (
    <TextField
      sx={{ flexGrow: 1 }}
      size="small"
      value={recordedPitchStr}
      label="recordedPitchStr"
      onChange={(e) => handleChange(e.target.value)}
      autoComplete="off"
    />
  );
};

export default RecordedPitchStrPane;
