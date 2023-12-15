import { isArray } from "lodash";
import { useEffect, useState } from "react";
import { GaWoNiProps } from "../../../schema";
import { updateGaWoNiProps } from "../../../services/firebase";
import ItemPool from "./ItemPool";

const GaWoNiPools = ({ props }: { props: GaWoNiProps }) => {
  const [value, setValue] = useState(props);

  useEffect(() => {
    if (isArray(value.ga_pool)) return;
    setValue(props);
  }, [value, props]);

  const handleChange = (
    type: string,
    index: number,
    label: string,
    rate: number,
  ) => {
    const cloned = { ...value };
    switch (type) {
      case "が":
        const target_ga = cloned.ga_pool[index];
        if (!target_ga) return;
        cloned.ga_pool[index] = { label, rate };
        break;
      case "を":
        const target_wo = cloned.wo_pool[index];
        if (!target_wo) return;
        cloned.wo_pool[index] = { label, rate };
        break;
      case "に":
        const target_ni = cloned.ni_pool[index];
        if (!target_ni) return;
        cloned.ni_pool[index] = { label, rate };
        break;
      default:
        return;
    }
    setValue(cloned);
    updateGaWoNiProps(cloned);
  };

  const addPoolItem = (type: string) => {
    const cloned = { ...value };
    switch (type) {
      case "が":
        cloned.ga_pool[cloned.ga_pool.length] = { label: "", rate: 1 };
        break;
      case "を":
        cloned.wo_pool[cloned.wo_pool.length] = { label: "", rate: 1 };
        break;
      case "に":
        cloned.ni_pool[cloned.ni_pool.length] = { label: "", rate: 1 };
        break;
      default:
        return;
    }
    setValue(cloned);
    updateGaWoNiProps(cloned);
  };

  const removePoolItem = (type: string, index: number) => {
    const cloned = { ...value };
    switch (type) {
      case "が":
        cloned.ga_pool = [...cloned.ga_pool].filter((_, i) => i !== index);
        break;
      case "を":
        cloned.wo_pool = [...cloned.wo_pool].filter((_, i) => i !== index);
        break;
      case "に":
        cloned.ni_pool = [...cloned.ni_pool].filter((_, i) => i !== index);
        break;
      default:
        return;
    }
    setValue(cloned);
    updateGaWoNiProps(cloned);
  };

  return (
    <div className="space-y-4">
      <ItemPool
        label="が"
        items={value.ga_pool}
        handleChange={handleChange}
        addPoolItem={addPoolItem}
        removePoolItem={removePoolItem}
      />
      <ItemPool
        label="を"
        items={value.wo_pool}
        handleChange={handleChange}
        addPoolItem={addPoolItem}
        removePoolItem={removePoolItem}
      />
      <ItemPool
        label="に"
        items={value.ni_pool}
        handleChange={handleChange}
        addPoolItem={addPoolItem}
        removePoolItem={removePoolItem}
      />
    </div>
  );
};

export default GaWoNiPools;
