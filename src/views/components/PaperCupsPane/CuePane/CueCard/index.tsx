import SentencePitchLine from "@/views/components/SentencePitchLine";
import CardCellContainer from "./CardCellContainer";

const CueCard = ({ label, pitchStr }: { label: string; pitchStr: string }) => {
  return (
    <div className="box-border grid h-12 grid-cols-[1fr_1fr] rounded-lg border-2 border-[#52a2aa]">
      <CardCellContainer>{label}</CardCellContainer>
      <CardCellContainer>
        <SentencePitchLine pitchStr={pitchStr} />
      </CardCellContainer>
    </div>
  );
};

export default CueCard;
