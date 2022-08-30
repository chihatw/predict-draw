import * as R from 'ramda';
import gojuuon from '../../../../assets/audios/gojuuon.mp3';
import { Button, Card, CardContent, Container } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../../App';
import { KanaCard, KANAS } from '../../../../kana';
import TouchMe from '../RandomWorkoutPane/RecordingPane/TouchMe';
import {
  createSourceNode,
  getBlobFromAssets,
} from '../../../../services/utils';
import { KanaCards, State } from '../../../../Model';
import { ActionTypes } from '../../../../Update';
import { setKanaCards } from '../../../../services/kanaCard';

// const dummyIds = 'あいうxおかきくけこ'.split('');

const KanaCardsPane = () => {
  const { state, dispatch } = useContext(AppContext);
  const [initialize, setInitialize] = useState(true);

  useEffect(() => {
    if (!initialize) return;
    const fetchData = async () => {
      const _blob = state.blobs[gojuuon]
        ? state.blobs[gojuuon]
        : await getBlobFromAssets(gojuuon);
      const updatedState = R.assocPath<Blob | null, State>(
        ['blobs', gojuuon],
        _blob
      )(state);
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
  const blob = state.blobs[gojuuon];

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
    if (!state.audioContext || !blob) return;
    const sourceNode = await createSourceNode(blob, state.audioContext);
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
