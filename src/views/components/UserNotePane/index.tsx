import { RootState } from "@/main";
import SentencePitchLine from "@/views/components/SentencePitchLine";
import { useSelector } from "react-redux";

const UserNotePane = () => {
  const note = useSelector((state: RootState) => state.note);

  return (
    <div className="mx-auto max-w-xl pt-5">
      <div className="grid gap-2">
        {note.texts.map((text, index) => (
          <div key={index} className="grid grid-cols-[1fr_1fr] gap-4">
            <div className="flex items-center ">{text}</div>
            <SentencePitchLine pitchStr={note.pitchStrs[index] || ""} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserNotePane;
