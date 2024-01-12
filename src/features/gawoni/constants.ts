import { GaWoNiProps } from "./schema";

export const GAWONI_COLLECTION = "gawoni";
export const GAWONI_DOC_ID = "props";

export const GAWONI_ORDER = ["が", "を", "に"];

export const INITIAL_GAWONI_PROPS: GaWoNiProps = {
  isRaw: false,
  sentence: "",
  isRandomOrder: false,
  ga_pool: [],
  wo_pool: [],
  ni_pool: [],
};
