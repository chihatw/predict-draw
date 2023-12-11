import { buildNoteStr } from "@/application/note/core/2-services";
import { noteActions } from "@/application/note/framework/0-reducer";
import { RootState } from "@/main";
import { Button, TextField } from "@mui/material";
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        fullWidth
        sx={{ color: "black", justifyContent: "flex-start" }}
        onClick={handleClickTitle}
      >
        <h3>Note</h3>
      </Button>

      {open && (
        <TextField multiline rows={20} value={value} onChange={handleChange} />
      )}
    </div>
  );
};

export default MngNotePane;
