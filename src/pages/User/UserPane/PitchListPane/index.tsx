import * as R from 'ramda';
import ta_pitches_120 from '../../../../assets/audios/ta_pitches_120.mp3';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../../App';
import { getBlobFromAssets } from '../../../../services/utils';
import { State } from '../../../../Model';
import { ActionTypes } from '../../../../Update';
import { Container } from '@mui/material';
import PitchCard from './PitchCard';
import { PITCH_WORKOUT_ITEMS } from '../../../../pitchWorkoutItems';
import TouchMe from '../RandomWorkoutPane/RecordingPane/TouchMe';

const PitchListPane = () => {
  const { state, dispatch } = useContext(AppContext);
  const [items, setItems] = useState<
    {
      pitchStr: string;
      schedules: {
        offset: number;
        start: number;
        stop: number;
      }[];
    }[]
  >([]);
  const [initialize, setInitialize] = useState(true);

  /** asset から blob 作成 */
  useEffect(() => {
    if (!initialize) return;
    const fetchData = async () => {
      const blob = state.blobs[ta_pitches_120]
        ? state.blobs[ta_pitches_120]
        : await getBlobFromAssets(ta_pitches_120);

      const updatedState = R.assocPath<Blob | null, State>(
        ['blobs', ta_pitches_120],
        blob
      )(state);
      dispatch({ type: ActionTypes.setState, payload: updatedState });
      setInitialize(false);
    };
    fetchData();
  }, [initialize]);

  useEffect(() => {
    const items = Object.values(PITCH_WORKOUT_ITEMS)
      .filter((item) => item.id.length === state.pitchList.mora)
      .map(({ pitchStr, schedules }) => ({ pitchStr, schedules }));

    setItems(items);
  }, [state.pitchList.mora]);

  if (!state.audioContext) return <TouchMe />;
  return (
    <Container maxWidth={'xs'} sx={{ paddingTop: 10 }}>
      <div
        style={{
          display: 'grid',
          rowGap: 16,
          columnGap: 16,
        }}
      >
        {items.map((item, index) => (
          <PitchCard
            key={index}
            index={index}
            pitchStr={item.pitchStr}
            schedules={item.schedules}
          />
        ))}
      </div>
    </Container>
  );
};

export default PitchListPane;
