import { RootState } from "@/main";
import SentencePitchLine from "@/views/components/SentencePitchLine";
import { Container } from "@mui/material";
import { useSelector } from "react-redux";

const UserNotePane = () => {
  const note = useSelector((state: RootState) => state.note);

  return (
    <Container maxWidth="sm" sx={{ paddingTop: 5 }}>
      <div style={{ display: "grid", rowGap: 8 }}>
        {note.texts.map((text, index) => (
          <div
            key={index}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              columnGap: 16,
            }}
          >
            <div style={{ textAlign: "right" }}>{text}</div>
            <SentencePitchLine pitchStr={note.pitchStrs[index] || ""} />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default UserNotePane;
