import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { PoolItem } from "../../../schema";

const ItemPool = ({
  label,
  items,
  handleChange,
  addPoolItem,
  removePoolItem,
}: {
  label: string;
  items: PoolItem[];
  handleChange: (
    type: string,
    index: number,
    label: string,
    rate: number,
  ) => void;
  addPoolItem: (type: string) => void;
  removePoolItem: (type: string, index: number) => void;
}) => {
  const _handleChange = (
    index: number,
    itemLabel: string,
    itemRate: number,
  ) => {
    handleChange(label, index, itemLabel, Math.floor(itemRate));
  };

  return (
    <div>
      <div className="text-sm">{label}</div>
      <div className="mx-2 space-y-2 text-sm">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              value={item.label}
              onChange={(e) => _handleChange(index, e.target.value, item.rate)}
            />
            <Input
              value={item.rate}
              type="number"
              min={0}
              onChange={(e) =>
                _handleChange(index, item.label, Number(e.target.value))
              }
            />
            <Button
              size="icon"
              variant={"ghost"}
              onClick={() => removePoolItem(label, index)}
            >
              <X color="red" />
            </Button>
          </div>
        ))}
        <Button onClick={() => addPoolItem(label)}>追加</Button>
      </div>
    </div>
  );
};

export default ItemPool;
