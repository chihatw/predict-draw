import React, { useEffect, useState } from 'react';
import usePredict from '../../../services/usePredict';

import DrawPageComponent from './components/DrawPageComponent';

const STRIPE_COLOR = '#5dbec4';
const SINGLE_CARD_WIDTH = 240;

export function Draw({ isManagementMode }: { isManagementMode?: boolean }) {
  const {
    drawn: superDrawn,
    yesRatio,
    newGameAt,
    updateDrawn: superHandleDrawn,
  } = usePredict();

  const [drawn, setDrawn] = useState('no');
  const [preDrawn, setPreDrawn] = useState('no');
  const [closedAt, setClosedAt] = useState(Date.now());
  const [openedAt, setOpenedAt] = useState(Date.now());
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // 管理ページは、superDrawnが変更されれば、カードをopenする
  useEffect(() => {
    if (!isManagementMode) return;
    if (!superDrawn) return;
    setDrawn(superDrawn);
    if (['yes', 'no'].includes(superDrawn)) {
      setOpenedAt(Date.now());
    } else {
      setClosedAt(Date.now());
    }
  }, [isManagementMode, superDrawn]);

  // newGameAt が更新されたら、カードを裏返す
  useEffect(() => {
    setSelectedIndex(-1);
    setClosedAt(Date.now());
    setPreDrawn('');
  }, [newGameAt]);

  const handleSelect = (_selectedIndex: number) => {
    setSelectedIndex(_selectedIndex);

    let _drawn: 'yes' | 'no' | '' = '';
    // 選択された場合
    if (_selectedIndex > -1) {
      const newYesRatio =
        yesRatio > 80 || yesRatio < 20
          ? yesRatio
          : // yesRatio が　20〜80の時、前回と反対になる確率を高くする
            yesRatio +
            20 *
              // yesRation が 50に近いほど補正が大きくなる
              ((30 - Math.abs(50 - yesRatio)) / 30) *
              (preDrawn === 'yes' ? -1 : preDrawn === 'no' ? 1 : 0);
      console.log(newYesRatio);
      _drawn = Math.floor(Math.random() * 101) < newYesRatio ? 'yes' : 'no';
      setPreDrawn(_drawn);
    }
    setDrawn(_drawn);

    !!superHandleDrawn && superHandleDrawn(_drawn);
  };

  const handleClick = () => {
    handleSelect(selectedIndex === -1 ? 0 : -1);
  };

  return (
    <DrawPageComponent
      drawn={drawn}
      width={SINGLE_CARD_WIDTH}
      yesRatio={yesRatio}
      closedAt={closedAt}
      openedAt={openedAt}
      stripeColor={STRIPE_COLOR}
      isManagementMode={isManagementMode || false}
      handleClick={handleClick}
    />
  );
}
