import { useContext } from 'react';
import SentencePitchLine from 'views/components/SentencePitchLine';
import { AppContext } from '../..';

const TargetPitchPane = () => {
  const { state } = useContext(AppContext);
  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: 40 }}>
      <SentencePitchLine pitchStr={state.recordVoice.params.rawPitchStr} />
    </div>
  );
};

export default TargetPitchPane;
