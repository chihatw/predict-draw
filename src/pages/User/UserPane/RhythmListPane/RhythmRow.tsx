import downpitch_120 from '../../../../assets/audios/downpitch_120.mp3';
import { SentencePitchLine } from '@chihatw/pitch-line.sentence-pitch-line';
import { Card, CardContent } from '@mui/material';
import React, { useContext } from 'react';
import string2PitchesArray from 'string2pitches-array';
import { AppContext } from '../../../../App';
import { PitchCard } from '../../../../Model';
import { createSourceNode } from '../../../../services/utils';

const RhythmRow = ({
  card,
  handleTapped,
}: {
  card: PitchCard;
  handleTapped: (id: string) => void;
}) => {
  const { state } = useContext(AppContext);
  const blob = state.blobs[downpitch_120];

  const handleClick = () => {
    handleTapped(card.id);
    play();
  };
  const play = async () => {
    if (!state.audioContext || !blob) return;
    const sourceNode = await createSourceNode(blob, state.audioContext);
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
          height: '100%',
          display: 'flex',
          position: 'relative',
          paddingTop: 3,
          justifyContent: 'center',
        }}
      >
        <SentencePitchLine pitchesArray={string2PitchesArray(card.pitchStr)} />
      </CardContent>
    </Card>
  );
};

export default RhythmRow;
