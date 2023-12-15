import { Button } from "@/components/ui/button";
import { db } from "@/infrastructure/firebase";
import { cn } from "@/lib/utils";
import SentencePitchLine from "@/views/components/SentencePitchLine";
import { doc, onSnapshot } from "@firebase/firestore";
import { RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import {
  GAWONI_COLLECTION,
  GAWONI_DOC_ID,
  INITIAL_GAWONI_PROPS,
} from "../../constants";
import { buildGawoniProps, updateGaWoNiProps } from "../../services/firebase";
import { buildGaWoNiSentence } from "../../services/utils";

const GaWoNiPane = () => {
  const [value, setValue] = useState(INITIAL_GAWONI_PROPS);
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, GAWONI_COLLECTION, GAWONI_DOC_ID),
      (snapshot) => {
        const props = buildGawoniProps(snapshot);
        setValue(props);
      },
    );
    return () => unsub();
  }, []);

  const handleClick = () => {
    const cloned = { ...value };
    let temp = buildGaWoNiSentence(cloned);
    while (temp === cloned.sentence) {
      temp = buildGaWoNiSentence(cloned);
    }
    cloned.sentence = temp;
    updateGaWoNiProps(cloned);
  };

  return (
    <div className="mx-auto max-w-sm space-y-20 pt-20">
      <div className="grid h-60 gap-4">
        {value.sentence
          .split("　")
          .filter(Boolean)
          .map((item, index) => (
            <div
              key={index}
              className={cn(
                "flex h-12 items-center justify-center rounded-lg border-2 border-[#52a2aa]",
                item.includes("きーろ") ? "bg-yellow-50" : "",
                item.includes("あ＼か") ? "bg-red-50" : "",
                item.includes("み＼どり") ? "bg-green-50" : "",
                item.includes("あ＼お") ? "bg-blue-50" : "",
                item.includes("おんな＼のこ") ? "bg-pink-50" : "",
                item.includes("おとこ＼のこ") ? " bg-purple-50" : "",
                item.includes("おば＼ーさん") ? " bg-orange-50" : "",
              )}
            >
              <SentencePitchLine pitchStr={item} />
            </div>
          ))}
      </div>
      <div className="flex items-center justify-center">
        <Button
          size="icon"
          variant={"ghost"}
          className="h-32 w-32"
          onClick={handleClick}
        >
          <RefreshCw size={80} color="#52a2aa" />
        </Button>
      </div>
    </div>
  );
};

export default GaWoNiPane;
