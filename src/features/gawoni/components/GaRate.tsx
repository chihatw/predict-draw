import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { updateGaRate } from "../services/firebase";

const GaRate = ({ ga_rate }: { ga_rate: number }) => {
  const [value, setValue] = useState(ga_rate);

  // value に数字が設定されて"いない"場合、 ga_rate を設定
  useEffect(() => {
    if (!isNaN(value)) return;
    setValue(ga_rate);
  }, [ga_rate, value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setValue(value);

    updateGaRate(value);
  };
  return (
    <div className="flex items-center gap-2">
      <div className="whitespace-nowrap text-sm">”が”の割合</div>
      <Input
        type="number"
        className="basis-[80px]"
        min={0}
        max={100}
        step={50}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default GaRate;
