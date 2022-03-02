import { Container } from '@mui/material';
import { doc, onSnapshot } from '@firebase/firestore';
import { useEffect, useState } from 'react';

import { db } from './repositories/firebase';

function App() {
  const [data, setData] = useState('');
  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, 'test', 'jwkfF2XUw0GO71f6ruVp'),
      (doc) => {
        const { text } = doc.data() || { text: '' };
        setData(text);
      },
      (error) => {
        console.warn(error);
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <Container maxWidth='sm'>
      <div>{data}</div>
    </Container>
  );
}

export default App;
