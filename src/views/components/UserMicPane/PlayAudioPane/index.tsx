import { useRef, useState } from "react";
import { useSelector } from "react-redux";

import {
  pauseSourceNode,
  playAudioBufferAndSetSourceNode,
} from "@/application/audioBuffers/core/2-services";
import { RAW_PATH } from "@/application/recordVoiceParams/core/1-constants";
import { Button } from "@/components/ui/button";
import { RootState } from "@/main";

import { PlayCircle, StopCircle } from "lucide-react";

const PlayAudioPane = () => {
  const rawAudioBuffer = useSelector(
    (state: RootState) => state.audioBuffers.entities[RAW_PATH],
  );
  const sourceNodeRef = useRef<AudioBufferSourceNode | undefined>(undefined);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = () => {
    if (!rawAudioBuffer || !rawAudioBuffer.audioBuffer) return;
    setIsPlaying(true);
    playAudioBufferAndSetSourceNode(
      rawAudioBuffer.audioBuffer,
      0,
      rawAudioBuffer.audioBuffer.duration,
      sourceNodeRef,
      () => setIsPlaying(false),
    );
  };

  const pause = () => {
    setIsPlaying(false);
    pauseSourceNode(sourceNodeRef);
  };

  const handleClick = () => {
    if (isPlaying) {
      pause();
      return;
    }
    play();
  };

  if (!rawAudioBuffer || !rawAudioBuffer.audioBuffer) return <></>;

  return (
    <div className="flex h-[136px] items-center justify-center">
      <Button
        variant={"ghost"}
        size="icon"
        onClick={handleClick}
        className="h-[120px] w-[120px]"
      >
        {isPlaying ? (
          <StopCircle size={120} color="#52a2aa" />
        ) : (
          <PlayCircle size={120} color="#52a2aa" />
        )}
      </Button>
    </div>
  );
};

export default PlayAudioPane;
