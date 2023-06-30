import { Container } from '@mui/material';
import { useContext } from 'react';
import SentencePitchLine from 'views/components/SentencePitchLine';
import { AppContext } from '../../../App';

const NotePane = () => {
  const { state } = useContext(AppContext);

  return (
    <Container maxWidth='sm' sx={{ paddingTop: 5 }}>
      <div style={{ display: 'grid', rowGap: 8 }}>
        {state.note.texts.map((text, index) => (
          <div
            key={index}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              columnGap: 16,
            }}
          >
            <div style={{ textAlign: 'right' }}>{text}</div>
            <SentencePitchLine pitchStr={state.note.pitches[index] || ''} />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default NotePane;
