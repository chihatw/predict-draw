import Check from '@mui/icons-material/Check';
import SentencePitchLine from 'views/components/SentencePitchLine';

const PitchWorkoutPracticeRow = ({
  pitchStr,
  isSelected,
  handleClickRow,
}: {
  pitchStr: string;
  isSelected: boolean;
  handleClickRow: () => void;
}) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        cursor: 'pointer',
        WebkitTapHighlightColor: 'transparent',
      }}
      onClick={handleClickRow}
    >
      <div
        style={{
          width: 240,
          display: 'flex',
          borderRadius: 4,
          border: `1px solid ${isSelected ? '#52a2aa' : '#ccc'}`,
          background: isSelected ? 'rgba(82,162,170,0.05)' : '#eee',
        }}
      >
        <div
          style={{
            flexBasis: 40,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: isSelected ? '#52a2aa' : '#ccc',
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

export default PitchWorkoutPracticeRow;
