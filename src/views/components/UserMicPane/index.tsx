import { useEffect, useState } from "react";

import { audioBuffersActions } from "@/application/audioBuffers/framework/0-reducer";
import { RAW_PATH } from "@/application/recordVoiceParams/core/1-constants";
import { useDispatch } from "react-redux";
import PlayAudioPane from "./PlayAudioPane";
import RecButton from "./RecButton";
import TargetPitchPane from "./TargetPitchPane";

const UserMicPane = () => {
  const dispatch = useDispatch();
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    if (!initializing) return;
    dispatch(audioBuffersActions.getAudioBufferStart(RAW_PATH));
    setInitializing(false);
  }, [initializing]);

  return (
    <div className="mx-auto max-w-lg">
      <div className="grid gap-10 pt-20">
        <div>
          <TargetPitchPane />
          <RecButton />
        </div>
        <PlayAudioPane />
      </div>
    </div>
  );
};

export default UserMicPane;
