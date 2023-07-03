import { Container } from '@mui/material';
import { RootState } from 'main';
import { useSelector } from 'react-redux';
import SentencePitchLine from 'views/components/SentencePitchLine';

const UserNotePane = () => {
  const note = useSelector((state: RootState) => state.note);

  return (
    <Container maxWidth='sm' sx={{ paddingTop: 5 }}>
      <div style={{ display: 'grid', rowGap: 8 }}>
        {note.texts.map((text, index) => (
          <div
            key={index}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              columnGap: 16,
            }}
          >
            <div style={{ textAlign: 'right' }}>{text}</div>
            <SentencePitchLine pitchStr={note.pitchStrs[index] || ''} />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default UserNotePane;
