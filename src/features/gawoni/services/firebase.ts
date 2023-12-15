import { db } from "@/infrastructure/firebase";
import { DocumentData, doc, updateDoc } from "@firebase/firestore";
import { GAWONI_COLLECTION, GAWONI_DOC_ID } from "../constants";
import { GaWoNiProps } from "../schema";

export const buildGawoniProps = (doc: DocumentData): GaWoNiProps => {
  const {
    sentence,
    ga_rate,
    isRandomOrder,
    ga_pool,
    wo_pool,
    ni_pool,
    readOrder,
    isRandomReadOrder,
  } = doc.data();
  return {
    sentence,
    ga_rate,
    isRandomOrder,
    ga_pool,
    wo_pool,
    ni_pool,
    readOrder,
    isRandomReadOrder,
  };
};

export const updateGaRate = (ga_rate: number) => {
  console.log(`%cupdate ${GAWONI_COLLECTION}`, "color:red");
  updateDoc(doc(db, GAWONI_COLLECTION, GAWONI_DOC_ID), { ga_rate });
};

export const updateIsRandomOrder = (isRandomOrder: boolean) => {
  console.log(`%cupdate ${GAWONI_COLLECTION}`, "color:red");
  updateDoc(doc(db, GAWONI_COLLECTION, GAWONI_DOC_ID), { isRandomOrder });
};

export const updateIsRandomReadOrder = (isRandomReadOrder: boolean) => {
  console.log(`%cupdate ${GAWONI_COLLECTION}`, "color:red");
  updateDoc(doc(db, GAWONI_COLLECTION, GAWONI_DOC_ID), { isRandomReadOrder });
};

export const updateGaWoNiProps = (gawoniProps: GaWoNiProps) => {
  console.log(`%cupdate ${GAWONI_COLLECTION}`, "color:red");
  updateDoc(doc(db, GAWONI_COLLECTION, GAWONI_DOC_ID), { ...gawoniProps });
};
