import React, { useRef } from 'react';

const CountDown = ({ display, label }: { display: string; label: number }) => {
  const countDownDivRef = useRef<HTMLDivElement | null>(null);
  return (
    <div
      ref={countDownDivRef}
      style={{
        display,
        width: '100%',
        height: '100%',
        opacity: 0.2,
        position: 'absolute',
        fontSize: 120,
        alignItems: 'center',
        fontWeight: 'bolder',
        background: 'white',
        pointerEvents: 'none',
        justifyContent: 'center',
      }}
    >
      {label}
    </div>
  );
};

export default CountDown;
