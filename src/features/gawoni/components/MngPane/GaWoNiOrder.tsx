import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { updateIsRandomOrder } from "../../services/firebase";

const GaWoNiOrder = ({ isRandomOrder }: { isRandomOrder: boolean }) => {
  const [value, setValue] = useState(isRandomOrder);

  useEffect(() => {
    if (typeof value === "boolean") return;
    setValue(isRandomOrder);
  }, [value, isRandomOrder]);

  const handleChange = (checked: boolean) => {
    setValue(checked);
    updateIsRandomOrder(checked);
  };

  return (
    <div className="flex items-center space-x-2">
      <label className="text-sm">助詞並び ランダム</label>
      <Checkbox checked={isRandomOrder} onCheckedChange={handleChange} />
    </div>
  );
};

export default GaWoNiOrder;
