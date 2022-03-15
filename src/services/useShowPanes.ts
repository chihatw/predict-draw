import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../repositories/firebase';

const COLLECTION = 'shows';

const SHOW_SCORE_PANE = 'scorePane';
const SHOW_RATIO_PANE = 'ratioPane';
const SHOW_PREDICT_PANE = 'predictPane';

const useShowPanes = () => {
  const [showScorePane, setShowScorePane] = useState(false);
  const [showRatioPane, setShowRatioPane] = useState(false);
  const [showPredictPane, setShowPredictPane] = useState(false);

  // showScorePaneの監視
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, COLLECTION, SHOW_SCORE_PANE),
      (doc) => {
        console.log(`fetch ${SHOW_SCORE_PANE}`);
        const { visible } = (doc.data() as { visible: boolean }) || {
          visible: false,
        };
        setShowScorePane(visible);
      },
      (error) => {
        console.warn(error);
      }
    );
    return () => unsub();
  }, []);
  // showRasioPaneの監視
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, COLLECTION, SHOW_RATIO_PANE),
      (doc) => {
        console.log(`fetch ${SHOW_RATIO_PANE}`);
        const { visible } = (doc.data() as { visible: boolean }) || {
          visible: false,
        };
        setShowRatioPane(visible);
      },
      (error) => {
        console.warn(error);
      }
    );
    return () => unsub();
  }, []);
  // showPredictPaneの監視
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, COLLECTION, SHOW_PREDICT_PANE),
      (doc) => {
        console.log(`fetch ${SHOW_PREDICT_PANE}`);
        const { visible } = (doc.data() as { visible: boolean }) || {
          visible: false,
        };
        setShowPredictPane(visible);
      },
      (error) => {
        console.warn(error);
      }
    );
    return () => unsub();
  }, []);

  const handleShowPane = ({
    docId,
    visible,
  }: {
    docId: string;
    visible: boolean;
  }) => {
    if ([SHOW_SCORE_PANE, SHOW_RATIO_PANE, SHOW_PREDICT_PANE].includes(docId)) {
      setDoc(doc(db, COLLECTION, docId), { visible });
    } else {
      console.log(`incorrect docId: ${docId}`);
    }
  };

  return { showScorePane, showRatioPane, showPredictPane, handleShowPane };
};
export default useShowPanes;
