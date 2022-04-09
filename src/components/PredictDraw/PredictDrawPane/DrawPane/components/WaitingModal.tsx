import React, { useEffect, useRef, useState } from 'react';

const LABELS = ['', '.', '..', '...'];

const WaitingModal: React.FC<{ predict: string }> = ({ predict }) => {
  const [labelIndex, setLabelIndex] = useState(0);
  const timerRef = useRef(0);
  useEffect(() => {
    timerRef.current = window.setInterval(() => {
      const _lablelIndex = (labelIndex + 1) % 4;
      setLabelIndex(_lablelIndex);
    }, 300);
    return () => {
      window.clearInterval(timerRef.current);
    };
  }, [labelIndex]);

  if (!predict) {
    return (
      <div
        style={{
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255,255,255,0.85)',
        }}
      >
        <div
          style={{
            width: '3em',
            color: '#52a2aa',
            opacity: 0.4,
            fontSize: 110,
            fontWeight: 'bolder',
          }}
        >{`Wait${LABELS[labelIndex]}`}</div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default WaitingModal;
