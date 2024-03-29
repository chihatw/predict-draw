import React from "react";

import { ICuePattern } from "@/application/cuePattern/core/0-interface";
import { TARGET } from "@/application/cuePattern/core/1-constants";
import { ICueWorkoutCue } from "@/application/cueWorkoutCue/core/0-interface";
import CueCard from "./CueCard";

const CuePane = React.memo(
  ({
    cuePattern,
    cueWorkoutCue,
  }: {
    cuePattern: ICuePattern;
    cueWorkoutCue: ICueWorkoutCue;
  }) => {
    return (
      <div className="h-[200px]">
        <div className="grid flex-1 gap-4">
          {cuePattern.topic !== TARGET.none && (
            <CueCard
              label={cueWorkoutCue.header.label}
              pitchStr={cueWorkoutCue.header.pitchStr}
            />
          )}
          {cueWorkoutCue.nouns.map((cueCard, index) => (
            <CueCard
              key={index}
              label={cueCard.label}
              pitchStr={cueCard.pitchStr}
            />
          ))}
          <CueCard
            label={cueWorkoutCue.verb.label}
            pitchStr={cueWorkoutCue.verb.pitchStr}
          />
        </div>
      </div>
    );
  },
);

export default CuePane;
