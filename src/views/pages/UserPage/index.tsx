import { PAGES } from "@/application/pageStates/core/1-constants";
import { USER_LAYOUTS } from "@/application/userPage/core/1-constants";
import { RootState } from "@/main";
import Layout from "@/views/Layout";
import { useSelector } from "react-redux";
import PaperCupsPane from "../../components/PaperCupsPane";
import SokudokuCuePane from "../../components/SokudokuCuePane";
import SokudokuRenshuPane from "../../components/SokudokuRenshuPane";
import SokudokuSoloPane from "../../components/SokudokuSolo";
import UserMicPane from "../../components/UserMicPane";
import UserNotePane from "../../components/UserNotePane";

const UserPage = ({ user }: { user: string }) => {
  const userPageStates = useSelector(
    (state: RootState) => state.pageStates.entities[user]?.state,
  );

  const content = (() => {
    switch (userPageStates) {
      case PAGES.sokudokuSolo:
        return <SokudokuSoloPane />;
      case PAGES.sokudokuRenshu:
        return <SokudokuRenshuPane />;
      case PAGES.sokudokuCue:
        return <SokudokuCuePane />;
      case PAGES.paperCups:
        return <PaperCupsPane />;
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
