import { shuffle } from "lodash";
import { GaWoNiProps, PoolItem } from "../schema";

const ORDER = ["が", "を", "に"];

export const buildSentence = (props: GaWoNiProps): string => {
  const gaItem = getPoolItem(props.ga_pool);
  const woItem = getPoolItem(
    props.wo_pool.filter((item) => item.label !== gaItem),
  );
  const niItem = getPoolItem(
    props.ni_pool.filter(
      (item) => item.label !== gaItem && item.label !== woItem,
    ),
  );

  const result: string[] = [];
  const shuffled = props.isRandomOrder ? shuffle(ORDER) : ORDER;

  for (const item of shuffled) {
    switch (item) {
      case "が":
        result.push(gaItem + "が");
        break;
      case "を":
        result.push(woItem + "を");
        break;
      case "に":
        result.push(niItem + "に");
        break;
      default:
    }
  }
  result.push("いれる");

  return result.join("　");
};

const getPoolItem = (poolItems: PoolItem[]) => {
  // rate で加重をつける
  const pool: string[] = [];
  for (const item of poolItems) {
    for (let i = 0; i < item.rate; i++) {
      pool.push(item.label);
    }
  }

  // シャッフル
  const shuffled = shuffle(pool);
  return shuffled[0];
};
