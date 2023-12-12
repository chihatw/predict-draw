const WorkoutLabel = ({
  label,
  beatCount,
}: {
  label: string;
  beatCount: number;
}) => {
  return (
    <div className="flex justify-center">
      <div className="font-mPlusRounded space-x-2 text-[24px] font-[300] text-gray-700">
        <span>{label}</span>
        <span className="pl-2 text-[16px]">{`(${beatCount} beats)`}</span>
      </div>
    </div>
  );
};

export default WorkoutLabel;
