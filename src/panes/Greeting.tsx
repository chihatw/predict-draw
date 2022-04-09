import { css, keyframes } from '@emotion/css';
import React from 'react';

const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(0, -0.3em, 0);
  }

  70% {
    transform: translate3d(0, -0.12em, 0);
  }

  90% {
    transform: translate3d(0,-0.04px,0);
  }
`;

const Greeting = () => {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          color: '#aaa',
          display: 'flex',
          fontSize: 48,
          fontWeight: 'bold',
        }}
      >
        {'こんにちは'.split('').map((letter, index) => (
          <Letter key={index} label={letter} delay={index * 50} />
        ))}
      </div>
    </div>
  );
};

export default Greeting;

const Letter = ({ label, delay }: { label: string; delay: number }) => (
  <div
    className={css`
      animation: ${bounce} 1s infinite;
      animation-delay: ${delay}ms;
    `}
  >
    {label}
  </div>
);
