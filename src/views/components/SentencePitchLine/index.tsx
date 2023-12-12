import React, { useMemo } from "react";
import PitchLine from "../PitchLine";

import { buildWordPitchStrs } from "@/application/utils/utils";

const SentencePitchLine = ({ pitchStr }: { pitchStr: string }) => {
  const wordPitchStrs = useMemo(() => buildWordPitchStrs(pitchStr), [pitchStr]);

  return (
    <div className="flex flex-wrap">
      {wordPitchStrs.map((wordPitchStr, index) => (
        <PitchLine key={index} wordPitchStr={wordPitchStr} />
      ))}
    </div>
  );
};

export default React.memo(SentencePitchLine);
