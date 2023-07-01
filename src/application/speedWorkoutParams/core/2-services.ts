export const calcBpm = ({
  beatCount,
  miliSeconds,
}: {
  beatCount: number;
  miliSeconds: number;
}) => {
  const seconds = miliSeconds / 1000;
  return Math.floor((beatCount / seconds) * 60);
};
