import MoraCircle from "./MoraCircle";

const Mora = ({
  mora,
  isMute,
  pitchLevel,
  isAccentCore,
}: {
  mora: string;
  pitchLevel: boolean;
  isAccentCore: boolean;
  isMute?: boolean;
}) => {
  const _isMute = isMute || ["っ", "ッ"].includes(mora);
  return (
    <div className="relative">
      <div className="absolute left-[15px] z-[-1] ml-[-1px] h-10" />
      <MoraCircle isHigh={pitchLevel} isMute={_isMute} />
      <div className="box-border flex h-5 w-[15px] flex-col items-center pl-[1px] pt-[1px]">
        <div
          className="ml-[-1px] origin-left scale-x-[0.8] select-none whitespace-nowrap text-center text-[11px] tracking-[-2px]"
          style={{ color: isAccentCore ? "red" : "inherit" }}
        >
          {mora}
        </div>
      </div>
    </div>
  );
};

export default Mora;
