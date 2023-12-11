import React, { useMemo } from 'react';
import PitchLine from '../PitchLine';

import { buildWordPitchStrs } from '@/application/utils/utils';

const SentencePitchLine = ({ pitchStr }: { pitchStr: string }) => {
  const wordPitchStrs = useMemo(() => buildWordPitchStrs(pitchStr), [pitchStr]);

  const pitchLines = wordPitchStrs.map((wordPitchStr, index) => (
    <PitchLine key={index} wordPitchStr={wordPitchStr} />
  ));

  return <div style={{ display: 'flex', flexWrap: 'wrap' }}>{pitchLines}</div>;
};

export default React.memo(SentencePitchLine);
