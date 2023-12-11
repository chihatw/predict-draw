import { PAGES } from "@/application/pageStates/core/1-constants";
import { USER_LAYOUTS } from "@/application/userPage/core/1-constants";
import { RootState } from "@/main";
import Layout from "@/views/Layout";
import { useSelector } from "react-redux";
import UserCueWorkoutPane from "../../components/UserCueWorkoutPane";
import UserMicPane from "../../components/UserMicPane";
import UserNotePane from "../../components/UserNotePane";
import UserSpeedWorkoutCuePane from "../../components/UserSpeedWorkoutCuePane";
import UserSpeedWorkoutPane from "../../components/UserSpeedWorkoutPane";
import UserSpeedWorkoutReadPane from "../../components/UserSpeedWorkoutReadPane";

const UserPage = ({ user }: { user: string }) => {
  const userPageStates = useSelector(
    (state: RootState) => state.pageStates.entities[user]?.state,
  );

  const content = (() => {
    switch (userPageStates) {
      case PAGES.speedWorkoutSolo:
        return <UserSpeedWorkoutPane />;
      case PAGES.speedWorkoutRead:
        return <UserSpeedWorkoutReadPane />;
      case PAGES.speedWorkoutCue:
        return <UserSpeedWorkoutCuePane />;
      case PAGES.cueWorkout:
        return <UserCueWorkoutPane />;
      case PAGES.note:
        return <UserNotePane />;
      case PAGES.micTest:
        return <UserMicPane />;
      default:
        return <div></div>;
    }
  })();

  return <Layout {...USER_LAYOUTS[user]}>{content}</Layout>;
};

export default UserPage;
