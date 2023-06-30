import { Card, CardContent } from '@mui/material';
import { useContext } from 'react';
import SentencePitchLine from 'views/components/SentencePitchLine';
import { AppContext } from '../../../../App';
import { PitchCard } from '../../../../Model';
import downpitch_120 from '../../../../assets/audios/downpitch_120.mp3';
import { createSourceNode } from '../../../../services/utils';

const RhythmRow = ({
  card,
  index,
  handleTapped,
}: {
  index: number;
  card: PitchCard;
  handleTapped: (id: string) => void;
}) => {
  const { state } = useContext(AppContext);
  const audioBuffer = state.audioBuffers[downpitch_120];

  const handleClick = () => {
    handleTapped(card.id);
    play();
  };
  const play = async () => {
    if (!state.audioContext || !audioBuffer) return;
    const sourceNode = createSourceNode(audioBuffer, state.audioContext);
    sourceNode.start(0, card.start, card.end - card.start);
  };
  return (
    <Card
      sx={{ cursor: 'pointer', height: 80, background: '#eee' }}
      elevation={1}
      onClick={handleClick}
    >
      <CardContent
        sx={{
          // height: '100%',
          display: 'flex',
          position: 'relative',
          paddingTop: 3,
          justifyContent: 'center',
        }}
      >
        <div style={{ display: 'flex', columnGap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', fontSize: 12 }}>
            {index + 1}
          </div>
          <SentencePitchLine pitchStr={card.pitchStr} />
        </div>
      </CardContent>
    </Card>
  );
};

export default RhythmRow;
