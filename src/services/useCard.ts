import { useEffect, useState } from 'react';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';

import { db } from '../repositories/firebase';
import { Cards, INITIAL_CARDS } from './context';

const useCards = () => {
  const [cards, setCards] = useState(INITIAL_CARDS);
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, 'game', 'cards'),
      (doc) => {
        const _cards = (doc.data() as Cards) || INITIAL_CARDS;
        setCards(_cards);
      },
      (error) => {
        console.warn(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);

  const handleUpdateDeck = async (cards: Cards) => {
    await updateDoc(doc(db, 'game', 'cards'), cards);
  };

  return { cards, handleUpdateDeck };
};
export default useCards;
