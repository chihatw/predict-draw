import { buildNoteStr } from "@/application/note/core/2-services";
import { noteActions } from "@/application/note/framework/0-reducer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RootState } from "@/main";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const LOCAL_STORAGE = "notePane";

const MngNotePane = () => {
  const dispatch = useDispatch();
  const note = useSelector((state: RootState) => state.note);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    const value = localStorage.getItem(LOCAL_STORAGE);
    setOpen(value === String(true));
  }, []);

  useEffect(() => {
    if (!!value) return;
    setValue(buildNoteStr(note));
  }, [value, note]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    dispatch(noteActions.update(e.target.value));
  };

  const handleClickTitle = () => {
    const updatedOpen = !open;
    setOpen(updatedOpen);
    localStorage.setItem(LOCAL_STORAGE, String(updatedOpen));
  };
  return (
    <div style={{ display: "grid", rowGap: 8 }}>
      <Button
        variant="ghost"
        className="justify-start"
        onClick={handleClickTitle}
      >
        <h3>Note</h3>
      </Button>

      {open && (
        <Textarea
          className="mx-8"
          rows={20}
          value={value}
          onChange={handleChange}
        />
      )}
    </div>
  );
};

export default MngNotePane;
