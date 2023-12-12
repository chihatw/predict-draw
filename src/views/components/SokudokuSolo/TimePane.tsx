import { useMemo } from "react";

const TimePane = ({ miliSeconds }: { miliSeconds: number }) => (
  <div style={{ display: "flex", justifyContent: "center" }}>
    <StopWatch miliSeconds={miliSeconds} width={200} />
  </div>
);

export default TimePane;

const StopWatch = ({
  max,
  width,
  miliSeconds,
}: {
  max?: number;
  width?: number;
  miliSeconds: number;
}) => {
  const _max = Math.min(99999, max || 99999);

  const seconds = useMemo(() => {
    return String(Math.floor(miliSeconds / 1000));
  }, [miliSeconds]);

  const underDecimalPoint = useMemo(() => {
    const underDecimalPoint = Math.floor((miliSeconds % 1000) / 100);
    return String(underDecimalPoint);
  }, [miliSeconds]);

  return (
    <div
      className="font-lato flex justify-center font-[900] text-gray-700"
      style={{
        width,
        height: (width || 120) * 0.6,
        fontSize: (width || 120) * 0.5,
      }}
    >
      {miliSeconds > _max ? (
        <div className="flex-1 text-center">--</div>
      ) : (
        <>
          <div className="text-end">{seconds}</div>
          <div>.</div>
          <div>{underDecimalPoint}</div>
        </>
      )}
    </div>
  );
};
