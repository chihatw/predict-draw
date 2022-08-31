import Check from '@mui/icons-material/Check';
import React from 'react';

const KanaWorkoutAnswerRow = ({
  kana,
  isSelected,
  handleClickRow,
}: {
  kana: string;
  isSelected: boolean;
  handleClickRow: () => void;
}) => {
  return (
    <div
      style={{
        display: 'flex',
        pointerEvents: kana ? 'auto' : 'none',
        cursor: 'pointer',
        justifyContent: 'center',
        WebkitTapHighlightColor: 'transparent',
      }}
      onClick={handleClickRow}
    >
      <div
        style={{
          maxWidth: 240,
          flexGrow: 1,
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
            fontSize: 24,
          }}
        >
          {kana}
        </div>
      </div>
    </div>
  );
};

export default KanaWorkoutAnswerRow;
