import gojuuon from '../../../../assets/audios/gojuuon.mp3';
import { Button, Container } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../../App';
import { KANAS } from '../../../../kana';
import TouchMe from '../RandomWorkoutPane/RecordingPane/TouchMe';
import {
  createSourceNode,
  getUpdatedStateWithAssetPath,
} from '../../../../services/utils';
import { KanaCards, State } from '../../../../Model';
import { ActionTypes } from '../../../../Update';
import { setKanaCards } from '../../../../services/kanaCard';

const KanaCardsPane = () => {
  const { state, dispatch } = useContext(AppContext);
  const [initialize, setInitialize] = useState(true);

  useEffect(() => {
    if (!initialize) return;

    const fetchData = async () => {
      const updatedState = await getUpdatedStateWithAssetPath(state, gojuuon);
      dispatch({ type: ActionTypes.setState, payload: updatedState });
      setInitialize(false);
    };
    fetchData();
  }, [initialize]);

  if (!state.audioContext) return <TouchMe />;
  return (
    <Container maxWidth={'xs'} sx={{ paddingTop: 10 }}>
      <div
        style={{
          display: 'grid',
          rowGap: 16,
          columnGap: 16,
          gridTemplateRows: 'repeat(5, 1fr)',
          gridAutoFlow: 'column',
        }}
      >
        {state.kanaCards.kanas.map((kana, index) => {
          const card = Object.values(KANAS).find((item) =>
            [item.hira, item.kata].includes(kana)
          ) || { id: '', start: 0, end: 0, hira: '', kata: '' };

          return (
            <KanaCell
              key={index}
              start={card.start}
              end={card.end}
              kana={!!card.id ? kana : ''}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default KanaCardsPane;

const KanaCell = ({
  start,
  end,
  kana,
}: {
  start: number;
  end: number;
  kana: string;
}) => {
  const { state } = useContext(AppContext);
  const audioBuffer = state.audioBuffers[gojuuon];

  const handleClick = () => {
    const updatedTapped = [...state.kanaCards.tapped];
    updatedTapped.push(kana);
    const updatedKanaCards: KanaCards = {
      ...state.kanaCards,
      tapped: updatedTapped,
    };
    setKanaCards(updatedKanaCards);
    play();
  };
  const play = async () => {
    if (!state.audioContext || !audioBuffer) return;
    const sourceNode = createSourceNode(audioBuffer, state.audioContext);
    sourceNode.start(0, start, end - start);
  };
  return (
    <Button
      sx={{
        color: '#555',
        height: 80,
        fontSize: 24,
        border: '1px solid #555',
      }}
      disabled={!kana}
      variant='outlined'
      onClick={handleClick}
    >
      {kana}
    </Button>
  );
};
