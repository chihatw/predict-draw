import SentencePitchLine from "@/views/components/SentencePitchLine";

import { RootState } from "@/main";
import { useSelector } from "react-redux";
import Layout from "../../Layout";

const NotePage = () => {
  const note = useSelector((state: RootState) => state.note);

  return (
    <Layout color="blue" label="單詞">
      <div className="mx-auto max-w-2xl">
        <div className="mt-4 ">
          <div>
            {note.texts.map((text, index) => (
              <div key={index} className="grid w-full grid-cols-2 bg-blue-100">
                <div className="flex items-center bg-yellow-50 p-2 text-xl">
                  {text}
                </div>

                <div className="flex items-center bg-rose-50 p-2">
                  <div className="scale-110 pl-2">
                    <SentencePitchLine pitchStr={note.pitchStrs[index] || ""} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotePage;
