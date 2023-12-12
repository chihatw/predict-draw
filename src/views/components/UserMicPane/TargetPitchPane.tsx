import { RootState } from "@/main";
import SentencePitchLine from "@/views/components/SentencePitchLine";
import { useSelector } from "react-redux";

const TargetPitchPane = () => {
  const rawPitchStr = useSelector(
    (state: RootState) => state.recordVoiceParams.rawPitchStr,
  );
  return (
    <div className="flex h-10 justify-center">
      <SentencePitchLine pitchStr={rawPitchStr} />
    </div>
  );
};

export default TargetPitchPane;
