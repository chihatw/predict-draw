import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { updateIsRaw } from "../../services/firebase";

const GaWoNiIsRaw = ({ isRaw }: { isRaw: boolean }) => {
  const [value, setValue] = useState(isRaw);

  useEffect(() => {
    if (typeof value === "boolean") return;
    setValue(isRaw);
  }, [value, isRaw]);

  const handleChange = (checked: boolean) => {
    setValue(checked);
    updateIsRaw(checked);
  };

  return (
    <div className="flex items-center space-x-2">
      <label className="text-sm">is Raw</label>
      <Checkbox checked={value} onCheckedChange={handleChange} />
    </div>
  );
};

export default GaWoNiIsRaw;
