import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import RecordVoiceAssetsPane from "./RecordVoiceAssetsPane";
import RecordVoiceRawPane from "./RecordVoiceRawPane";

const LOCAL_STORAGE = "recordVoice";

const MngRecordVoicePane = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const value = localStorage.getItem(LOCAL_STORAGE);
    setOpen(value === String(true));
  }, []);

  const handleClickTitle = () => {
    const updatedOpen = !open;
    setOpen(updatedOpen);
    localStorage.setItem(LOCAL_STORAGE, String(updatedOpen));
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={handleClickTitle}
        >
          <h3>Record Voice</h3>
        </Button>
      </div>
      {open && (
        <div className="grid gap-2 px-8 ">
          <h4>Raw</h4>
          <RecordVoiceRawPane />
          <h4>Assets</h4>
          <RecordVoiceAssetsPane />
        </div>
      )}
    </div>
  );
};

export default MngRecordVoicePane;
