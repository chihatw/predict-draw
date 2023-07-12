import { RootState } from 'main';
import { useSelector } from 'react-redux';
import SentencePitchLine from 'views/components/SentencePitchLine';

const TargetPitchPane = () => {
  const rawPitchStr = useSelector(
    (state: RootState) => state.recordVoiceParams.rawPitchStr
  );
  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: 40 }}>
      <SentencePitchLine pitchStr={rawPitchStr} />
    </div>
  );
};

export default TargetPitchPane;
