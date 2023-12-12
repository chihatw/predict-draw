import { RootState } from "@/main";
import { useSelector } from "react-redux";

const Points = () => {
  const { points } = useSelector((state: RootState) => state.cueWorkoutParams);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div>
          <span className="font-lato text-[100px] font-[900] text-gray-700">
            {points}
          </span>
          <span className="font-mPlusRounded text-gray-700,text-[24px] font-[300]">
            Points
          </span>
        </div>
      </div>
    </div>
  );
};

export default Points;
