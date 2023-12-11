import { ICuePattern } from "@/application/cuePattern/core/0-interface";
import { TARGET } from "@/application/cuePattern/core/1-constants";
import { Clear } from "@mui/icons-material";

function PatternRow({
  index,
  pattern,
}: {
  index: number;
  pattern: ICuePattern;
}) {
  const topicCell =
    pattern.topic === TARGET.none ? (
      <Clear sx={{ fontSize: 12 }} />
    ) : pattern.topic === TARGET.wo ? (
      "ヲ格"
    ) : (
      "ニ格"
    );
  const groupingCell =
    pattern.grouping === TARGET.none ? (
      <Clear sx={{ fontSize: 12 }} />
    ) : pattern.grouping === TARGET.wo ? (
      "ヲ格"
    ) : (
      "ニ格"
    );
  return (
    <div className="grid grid-cols-8 py-2 text-sm">
      <div className="flex items-center justify-center ">{index + 1}</div>
      <div className="col-span-3 flex items-center justify-center">
        {pattern.sentence}
      </div>
      <div className="flex items-center justify-center text-sm">
        {topicCell}
      </div>
      <div className="flex items-center justify-center text-sm">
        {groupingCell}
      </div>
      <div className="flex items-center justify-center text-sm">
        {pattern.isWoFirst ? "正" : "逆"}
      </div>
      <div className="flex items-center justify-center text-sm">
        {pattern.isNegative ? "否" : "肯"}
      </div>
    </div>
  );
}

export default PatternRow;
