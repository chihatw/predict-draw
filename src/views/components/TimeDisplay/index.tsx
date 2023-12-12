const WIDTH = 200;

const TimeDisplay = ({ miliSeconds }: { miliSeconds: number }) => {
  const width = WIDTH;
  const seconds = String(Math.floor(miliSeconds / 1000));
  const underDecimalPoint = String(Math.floor((miliSeconds % 1000) / 100));
  return (
    <div className="flex justify-center">
      <div
        className="font-lato flex justify-center font-[900] text-gray-700"
        style={{
          width,
          height: (width || 120) * 0.6,
          fontSize: (width || 120) * 0.5,
        }}
      >
        <>
          <div className="text-end">{seconds}</div>
          <div>.</div>
          <div>{underDecimalPoint}</div>
        </>
      </div>
    </div>
  );
};

export default TimeDisplay;
