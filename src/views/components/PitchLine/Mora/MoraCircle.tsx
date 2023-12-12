import React from "react";
import { green, height, width } from "../constants";

const MoraCircle: React.FC<{ isHigh: boolean; isMute?: boolean }> = ({
  isHigh,
  isMute,
}) => {
  return (
    <div className="box-content" style={{ width, height }}>
      <div className="box-content" style={{ height: isHigh ? 4 : 13 }} />
      <div className="flex justify-center">
        <div
          className="z-[2px] box-content h-1 w-1 rounded bg-white"
          style={{ border: `2px solid ${isMute ? "lightgrey" : green}` }}
        />
      </div>
    </div>
  );
};

export default MoraCircle;
