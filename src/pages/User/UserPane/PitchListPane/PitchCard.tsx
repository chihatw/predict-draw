import ta_pitches_120 from '../../../../assets/audios/ta_pitches_120.mp3';
import { SentencePitchLine } from '@chihatw/pitch-line.sentence-pitch-line';
import { Card, CardContent } from '@mui/material';
import React, { useContext } from 'react';
import string2PitchesArray from 'string2pitches-array';
import { AppContext } from '../../../../App';
import { PitchListState, Schedule } from '../../../../Model';
import { setPitchList } from '../../../../services/pitchList';
import { createSourceNode } from '../../../../services/utils';

const PitchCard = ({
  schedules,
  index,
  pitchStr,
}: {
  index: number;
  pitchStr: string;
  schedules: Schedule[];
}) => {
  const { state } = useContext(AppContext);
  const blob = state.blobs[ta_pitches_120];

  const handleClick = () => {
    const updatedTapped = [...state.pitchList.tapped];
    updatedTapped.push(pitchStr);
    const updatedPitchList: PitchListState = {
      ...state.pitchList,
      tapped: updatedTapped,
    };
    setPitchList(updatedPitchList);
    play();
  };

  const play = async () => {
    if (!state.audioContext || !blob) return;
    const currentTime = state.audioContext.currentTime;
    const sourceNodes: AudioBufferSourceNode[] = [];
    await Promise.all(
      schedules.map(async (_) => {
        const sourceNode = await createSourceNode(blob, state.audioContext!);
        sourceNodes.push(sourceNode);
      })
    );
    schedules.forEach((item, index) => {
      const sourceNode = sourceNodes[index];
      sourceNode.start(currentTime + item.offset, item.start);
      sourceNode.stop(currentTime + item.stop);
    });
  };
  return (
    <Card
      sx={{ cursor: 'pointer', height: 80, background: '#eee' }}
      elevation={1}
      onClick={handleClick}
    >
      <CardContent
        sx={{
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
          <SentencePitchLine pitchesArray={string2PitchesArray(pitchStr)} />
        </div>
      </CardContent>
    </Card>
  );
};

export default PitchCard;
