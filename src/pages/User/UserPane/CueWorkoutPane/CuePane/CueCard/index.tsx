import SentencePitchLine from 'views/components/SentencePitchLine';
import CardCellContainer from './CardCellContainer';

const CueCard = ({ label, pitchStr }: { label: string; pitchStr: string }) => {
  return (
    <div
      style={{
        height: 48,
        boxSizing: 'border-box',
        border: '2px solid #52a2aa',
        borderRadius: 8,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
      }}
    >
      <CardCellContainer>
        <span style={{ fontSize: 16 }}>{label}</span>
      </CardCellContainer>
      <CardCellContainer>
        <SentencePitchLine pitchStr={pitchStr} />
      </CardCellContainer>
    </div>
  );
};

export default CueCard;
