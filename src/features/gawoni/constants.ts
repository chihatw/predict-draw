import { GaWoNiProps } from "./schema";

export const GAWONI_COLLECTION = "gawoni";
export const GAWONI_DOC_ID = "props";

export const INITIAL_GAWONI_PROPS: GaWoNiProps = {
  sentence: "",
  isRandomOrder: false,
  ga_rate: 100,
  ga_pool: [],
  wo_pool: [],
  ni_pool: [],
};
