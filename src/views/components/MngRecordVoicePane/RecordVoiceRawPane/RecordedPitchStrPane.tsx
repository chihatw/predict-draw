import { recordVoiceParamsActions } from "@/application/recordVoiceParams/framework/0-reducer";
import { Input } from "@/components/ui/input";

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
    <Input
      value={recordedPitchStr}
      placeholder="recordedPitchStr"
      onChange={(e) => handleChange(e.target.value)}
      autoComplete="off"
    />
  );
};

export default RecordedPitchStrPane;
