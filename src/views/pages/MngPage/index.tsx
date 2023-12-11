import { RootState } from "@/main";
import { Container, Divider } from "@mui/material";
import { useSelector } from "react-redux";
import Layout from "../../Layout";
import MngCueWorkoutPane from "../../components/MngCueWorkoutPane";
import MngNotePane from "../../components/MngNotePane";
import MngPageStatePane from "../../components/MngPageStatePane";
import MngRecordVoicePane from "../../components/MngRecordVoicePane";
import MngSpeedWorkoutPane from "../../components/MngSpeedWorkoutPane";

const MngPage = () => {
  const { ids: users, entities: pageStates } = useSelector(
    (state: RootState) => state.pageStates,
  );

  const userPageStates = users.map((user, index) => (
    <MngPageStatePane
      key={index}
      user={user as string}
      value={pageStates[user]?.state}
    />
  ));

  return (
    <Layout color="red" label="MngPage">
      <Container maxWidth="sm">
        <div style={{ display: "grid", rowGap: 16, padding: "8px 0" }}>
          <div style={{ display: "grid" }}>{userPageStates}</div>
          <Divider />
          <div style={{ display: "grid", rowGap: 0, paddingBottom: 80 }}>
            <MngSpeedWorkoutPane />
            <MngCueWorkoutPane />
            <MngRecordVoicePane />
            <MngNotePane />
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default MngPage;
