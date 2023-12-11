import { RootState } from "@/main";
import { useSelector } from "react-redux";

import { PATTERNS } from "@/application/cuePattern/core/1-constants";
import { buildCurrentPatterns } from "@/application/cuePattern/core/2-services";
import PatternListSwitchesPane from "./PatternListSwitchesPane";
import PatternRow from "./PatternRow";

const PatternList = () => {
  const cuePatternParams = useSelector(
    (state: RootState) => state.cuePatternParams,
  );

  const tableContent = buildCurrentPatterns(PATTERNS, cuePatternParams).map(
    (pattern, index) => (
      <PatternRow key={index} index={index} pattern={pattern} />
    ),
  );

  return (
    <div>
      <PatternListSwitchesPane />
      <div className="mb-10">
        <div className="grid grid-cols-8 py-2">
          <div />
          <div className="col-span-3 flex items-center justify-center text-sm">
            例文
          </div>
          <div className="flex items-center justify-center text-sm">主題</div>
          <div className="flex items-center justify-center text-sm">分類</div>
          <div className="flex items-center justify-center text-sm">格順</div>
          <div className="flex items-center justify-center text-sm">肯否</div>
        </div>
        <div>
          {buildCurrentPatterns(PATTERNS, cuePatternParams).map(
            (pattern, index) => (
              <PatternRow key={index} index={index} pattern={pattern} />
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default PatternList;
