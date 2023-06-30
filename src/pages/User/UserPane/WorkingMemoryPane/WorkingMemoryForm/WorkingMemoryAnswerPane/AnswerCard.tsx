import Check from '@mui/icons-material/Check';
import SentencePitchLine from 'views/components/SentencePitchLine';

const AnswerCard = ({
  selected,
  pitchStr,
  handleClick,
}: {
  selected: boolean;
  pitchStr: string;
  handleClick: () => void;
}) => {
  return (
    <div
      style={{
        width: 240,
        border: `1px solid ${selected ? '#52a2aa' : '#ccc'}`,
        padding: 4,
        borderRadius: 4,
        cursor: 'pointer',
        WebkitTapHighlightColor: 'transparent',
      }}
      onClick={handleClick}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            flexBasis: 40,
            textAlign: 'center',
            color: selected ? '#52a2aa' : '#ccc',
          }}
        >
          <Check />
        </div>
        <div
          style={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <SentencePitchLine pitchStr={pitchStr} />
        </div>
      </div>
    </div>
  );
};

export default AnswerCard;
