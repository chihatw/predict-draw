import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { updateIsRandomReadOrder } from "../services/firebase";

const GaWoNiReadOrder = ({
  isRandomReadOrder,
}: {
  isRandomReadOrder: boolean;
}) => {
  const [value, setValue] = useState(isRandomReadOrder);

  useEffect(() => {
    if (typeof value === "boolean") return;
    setValue(isRandomReadOrder);
  }, [value, isRandomReadOrder]);

  const handleChange = (checked: boolean) => {
    setValue(checked);
    updateIsRandomReadOrder(checked);
  };

  return (
    <div className="flex items-center space-x-2">
      <label className="text-sm">読み並び ランダム</label>
      <Checkbox checked={isRandomReadOrder} onCheckedChange={handleChange} />
    </div>
  );
};

export default GaWoNiReadOrder;
