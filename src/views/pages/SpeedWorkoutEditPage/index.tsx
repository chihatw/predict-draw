import { useParams } from "react-router-dom";

import SpeedWorkoutForm from "./SpeedWorkoutForm";

const SpeedWorkoutEditPage = () => {
  const { workoutId } = useParams();

  if (!workoutId) return <></>;

  return <SpeedWorkoutForm workoutId={workoutId} />;
};

export default SpeedWorkoutEditPage;
