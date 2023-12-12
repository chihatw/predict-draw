import { RootState } from "@/main";
import { useSelector } from "react-redux";

function BpmPane() {
  const { bpm } = useSelector((state: RootState) => state.speedWorkoutParams);

  return (
    <div className="font-lato flex items-end justify-center text-[60px] font-[900] text-gray-700">
      <div className="font-lato pb-[6px] pr-5 text-[36px] font-[100]">BPM</div>
      <div>{bpm > 0 ? bpm : "--"}</div>
    </div>
  );
}

export default BpmPane;
