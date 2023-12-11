import blue from '@/assets/images/blue.png';
import green from '@/assets/images/green.png';
import orange from '@/assets/images/orange.png';
import pink from '@/assets/images/pink.png';
import red from '@/assets/images/red.png';
import yellow from '@/assets/images/yellow.png';

const Card = ({ cardId, isActive }: { cardId: string; isActive: boolean }) => {
  const src = (() => {
    switch (cardId) {
      case 'red':
        return red;
      case 'blue':
        return blue;
      case 'green':
        return green;
      case 'orange':
        return orange;
      case 'pink':
        return pink;
      case 'yellow':
        return yellow;
      default:
        return blue;
    }
  })();
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
      <img src={src} width={40} height={40} style={{ borderRadius: 8 }} />

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
