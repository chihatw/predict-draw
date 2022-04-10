import React, { useEffect, useMemo, useRef } from 'react';
import Note from './Note';

const NotesRow = ({
  height,
  noteIndex,
  xPosProgress,
  notePairCount,
  syncopationRatio,
}: {
  height: number;
  noteIndex: number;
  xPosProgress: number;
  notePairCount?: number;
  syncopationRatio: number;
}) => {
  const width = useMemo(() => height / 2, []);
  const noteCount = useMemo(() => (notePairCount || 2) * 2, [notePairCount]);

  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = width * noteCount;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctxRef.current = ctx;
  }, []);

  useEffect(() => {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!!xPosProgress) {
      let xPos = Math.floor(canvas.width * (xPosProgress / 100)) + width / 2;
      if (xPos > canvas.width) {
        xPos -= canvas.width;
      }

      ctx.lineWidth = 1;
      ctx.strokeStyle = 'red';
      ctx.beginPath();
      ctx.moveTo(xPos, 0);
      ctx.lineTo(xPos, canvas.height);
      ctx.stroke();
      ctx.closePath();
    }
  }, [xPosProgress]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div
        style={{
          width: width * noteCount,
          height,
          background: 'white',
        }}
      >
        <div style={{ position: 'relative' }}>
          {new Array(noteCount).fill(null).map((_, index) => {
            let left: number;
            if (index % 2) {
              left = index * width - (width * (100 - syncopationRatio)) / 100;
            } else {
              left = index * width;
            }
            return (
              <div key={index} style={{ position: 'absolute', top: 0, left }}>
                <Note height={height} isActive={noteIndex === index} />
              </div>
            );
          })}
          <canvas ref={canvasRef} />
        </div>
      </div>
    </div>
  );
};

export default NotesRow;
