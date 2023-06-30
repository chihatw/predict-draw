import { useContext } from 'react';
import { AppContext } from '../../../../..';

const Card = ({ cardId, isActive }: { cardId: string; isActive: boolean }) => {
  const { state } = useContext(AppContext);
  const { cueWorkout, blobURLs } = state;
  const { cards } = cueWorkout;
  const card = cards[cardId];
  const blobURL = blobURLs[card.imagePath] || '';
  return (
    <div
      style={{
        height: 40,
        border: `2px solid${isActive ? '#52a2aa' : '#eee'} `,
        borderRadius: 8,
        display: 'flex',
        position: 'relative',
        justifyContent: 'center',
      }}
    >
      {blobURL && (
        <img src={blobURL} width={40} height={40} style={{ borderRadius: 8 }} />
      )}

      <div
        style={{
          visibility: isActive ? 'hidden' : 'visible',
          position: 'absolute',
          background: 'white',
          opacity: 0.8,
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          zIndex: 1000,
          borderRadius: 8,
        }}
      />
    </div>
  );
};

export default Card;
