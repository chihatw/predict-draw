import audioBuffers from 'application/audioBuffers/framework/0-reducer';
import cuePattern from 'application/cuePattern/framework/0-reducer';
import cuePatternParams from 'application/cuePatternParams/framework/0-reducer';
import cueWorkoutCue from 'application/cueWorkoutCue/framework/0-reducer';
import cueWorkoutParams from 'application/cueWorkoutParams/framework/0-reducer';
import note from 'application/note/framework/0-reducer';
import pageStates from 'application/pageStates/framework/0-reducer';
import recordVoiceAssets from 'application/recordVoiceAssets/framework/0-reducer';
import recordVoiceParams from 'application/recordVoiceParams/framework/0-reducer';
import recordedAudio from 'application/recordedAudio/framework/0-reducer';
import speedWorkoutEditPage from 'application/speedWorkoutEditPage/framework/0-reducer';
import speedWorkoutItems from 'application/speedWorkoutItems/framework/0-reducer';
import speedWorkoutParams from 'application/speedWorkoutParams/framework/0-reducer';
import speedWorkouts from 'application/speedWorkouts/framework/0-reducer';

export default {
  pageStates,
  speedWorkoutParams,
  speedWorkoutItems,
  speedWorkouts,
  speedWorkoutEditPage,
  cueWorkoutParams,
  cuePatternParams,
  cueWorkoutCue,
  cuePattern,
  note,
  recordedAudio,
  audioBuffers,
  recordVoiceParams,
  recordVoiceAssets,
};
