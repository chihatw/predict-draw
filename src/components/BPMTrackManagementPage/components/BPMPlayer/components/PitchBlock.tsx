const RED = '#f50057';
const GREEN = '#52a2aa';
const LIGHT_RED = '#fee0eb';
const LIGHT_GREEN = '#eaf4f5';

const PitchBlock = ({
  label,
  height,
  isAccent,
  isHighPitch,
  hasRightMergin,
  isTextHighlight,
  isBackGroundHighlight,
}: {
  label: string;
  height: number;
  isAccent: boolean;
  isHighPitch: boolean;
  isTextHighlight: boolean;
  isBackGroundHighlight: boolean;
  hasRightMergin?: boolean;
}) => (
  <div
    style={{
      width: Math.floor(height / 2),
      height,
      border: '1px solid #eee',
      display: 'flex',
      boxSizing: 'border-box',
      textAlign: 'center',
      paddingTop: isHighPitch ? 0 : height * 0.3,
      background: isBackGroundHighlight
        ? isAccent
          ? LIGHT_RED
          : LIGHT_GREEN
        : 'white',
      justifyContent: 'center',
      paddingBottom: isHighPitch ? height * 0.3 : 0,
      marginRight: hasRightMergin ? 2 : 0,
    }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span
        style={{
          color: isTextHighlight ? (isAccent ? RED : GREEN) : 'inherit',
          fontSize: height * 0.3,
          whiteSpace: 'nowrap',
          transform: 'scaleX(0.8)',
          transformOrigin: 'center center',
        }}
      >
        {label}
      </span>
    </div>
  </div>
);

export default PitchBlock;
