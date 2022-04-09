import React from 'react';
import { css } from '@emotion/css';

const Clock = ({ time }: { time: Date }) => {
  return (
    <div
      className={css({
        color: '#555',
        width: 300,
        height: 300,
        fontSize: 24,
        boxShadow: '0 2px 30px rgba(0, 0, 0, 0.2)',
        textAlign: 'center',
        borderRadius: '50%',
        position: 'relative',
        background: '#fff',
        '&:after': {
          background: '#aaa',
          content: '""',
          width: 12,
          height: 12,
          borderRadius: '50%',
          position: 'absolute',
          zIndex: 2,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          border: '2px solid #fff',
        },
      })}
    >
      <div
        style={{
          position: 'absolute',
          width: 6,
          height: 60,
          background: '#222',
          top: '30%',
          left: '49%',
          transformOrigin: 'bottom',
          transform: `rotateZ(${
            time.getHours() * 30 + time.getMinutes() * 0.5
          }deg)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 4,
          height: 80,
          background: '#444',
          top: '22.5%',
          left: '49%',
          transformOrigin: 'bottom',
          transform: `rotateZ(${time.getMinutes() * 6}deg)`,
        }}
      />
      <span style={{ top: 10, left: '46%', position: 'absolute' }}>12</span>
      <span style={{ top: '10%', right: '26%', position: 'absolute' }}>1</span>
      <span style={{ top: '25%', right: '10%', position: 'absolute' }}>2</span>
      <span style={{ top: '46%', right: 10, position: 'absolute' }}>3</span>
      <span style={{ top: '67%', right: 30, position: 'absolute' }}>4</span>
      <span style={{ top: '80%', right: 78, position: 'absolute' }}>5</span>
      <span style={{ bottom: 10, left: '48%', position: 'absolute' }}>6</span>
      <span style={{ top: '82%', left: 80, position: 'absolute' }}>7</span>
      <span style={{ top: '67%', left: 30, position: 'absolute' }}>8</span>
      <span style={{ top: '46%', left: 10, position: 'absolute' }}>9</span>
      <span style={{ top: '25%', left: '10%', position: 'absolute' }}>10</span>
      <span style={{ top: '10%', left: '26%', position: 'absolute' }}>11</span>
    </div>
  );
};

export default Clock;
