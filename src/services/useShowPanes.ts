import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../repositories/firebase';

const SHOW_SCORE_PANE = 'showScorePane';
const SHOW_RATIO_PANE = 'showRatioPane';
const SHOW_PREDICT_PANE = 'showPredictPane';

const useShowPanes = () => {
  const [showScorePane, setShowScorePane] = useState(false);
  const [showRatioPane, setShowRatioPane] = useState(false);
  const [showPredictPane, setShowPredictPane] = useState(false);

  // showScorePaneの監視
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, 'game', SHOW_SCORE_PANE),
      (doc) => {
        console.log(`fetch ${SHOW_SCORE_PANE}`);
        const { visible } = (doc.data() as { visible: boolean }) || {
          visible: false,
        };
        console.log(visible);
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
      doc(db, 'game', SHOW_RATIO_PANE),
      (doc) => {
        console.log(`fetch ${SHOW_RATIO_PANE}`);
        const { visible } = (doc.data() as { visible: boolean }) || {
          visible: false,
        };
        console.log(visible);
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
      doc(db, 'game', SHOW_PREDICT_PANE),
      (doc) => {
        console.log(`fetch ${SHOW_PREDICT_PANE}`);
        const { visible } = (doc.data() as { visible: boolean }) || {
          visible: false,
        };
        console.log(visible);
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
      setDoc(doc(db, 'game', docId), { visible });
    } else {
      console.log(`incorrect docId: ${docId}`);
    }
  };

  return { showScorePane, showRatioPane, showPredictPane, handleShowPane };
};
export default useShowPanes;
