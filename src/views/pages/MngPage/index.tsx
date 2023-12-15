import GaWoNiMngPane from "@/features/gawoni/components/GaWoNiMngPane";
import { RootState } from "@/main";
import { useSelector } from "react-redux";
import Layout from "../../Layout";
import MngNotePane from "../../components/MngNotePane";
import MngPageStatePane from "../../components/MngPageStatePane";
import MngPaperCupsPane from "../../components/MngPaperCupsPane";
import MngRecordVoicePane from "../../components/MngRecordVoicePane";
import MngSokudokuPane from "../../components/MngSokudokuPane";

const MngPage = () => {
  const { ids: users, entities: pageStates } = useSelector(
    (state: RootState) => state.pageStates,
  );

  return (
    <Layout color="red" label="MngPage">
      <div className="mx-auto max-w-xl ">
        <div className="grid gap-4 divide-y py-2">
          <div style={{ display: "grid" }}>
            {users.map((user, index) => (
              <MngPageStatePane
                key={index}
                user={user as string}
                value={pageStates[user]?.state}
              />
            ))}
          </div>
          <div style={{ display: "grid", rowGap: 0, paddingBottom: 80 }}>
            <MngSokudokuPane />
            <MngPaperCupsPane />
            <GaWoNiMngPane />
            <MngRecordVoicePane />
            <MngNotePane />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MngPage;
