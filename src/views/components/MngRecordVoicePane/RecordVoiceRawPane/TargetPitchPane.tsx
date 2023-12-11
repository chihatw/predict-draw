import { recordVoiceParamsActions } from "@/application/recordVoiceParams/framework/0-reducer";
import { Input } from "@/components/ui/input";
import { RootState } from "@/main";
import { useDispatch, useSelector } from "react-redux";

const TargetPitchPane = () => {
  const dispatch = useDispatch();
  const rawPitchStr = useSelector(
    (state: RootState) => state.recordVoiceParams.rawPitchStr,
  );

  const handleChangeInput = (input: string) => {
    dispatch(recordVoiceParamsActions.changeRawPitchStr(input));
  };
  return (
    <Input
      value={rawPitchStr}
      placeholder="rawPitchStr"
      onChange={(e) => handleChangeInput(e.target.value)}
    />
  );
};

export default TargetPitchPane;
