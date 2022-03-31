import { CustomLabel } from '@chihatw/lang-gym-h.ui.custom-label';
import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';

import SingleCard from './components/SingleCard';

const STRIPE_COLOR = '#5dbec4';

const SINGLE_CARD_WIDTH = 240;

export type DrawProps = {
  yesRatio: number;
  newGameAt: number;
  superDrawn?: 'yes' | 'no' | '';
  isManagementMode?: boolean;
  superHandleDrawn?: (value: string) => void;
  yesImage: any;
  noImage: any;
};

export function Draw({
  yesRatio,
  newGameAt,
  superDrawn,
  isManagementMode,
  superHandleDrawn,
  yesImage,
  noImage,
}: DrawProps) {
  const [drawn, setDrawn] = useState<'yes' | 'no' | ''>('no');
  const [preDrawn, setPreDrawn] = useState<'yes' | 'no' | ''>('no');
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

  return (
    <Container maxWidth='sm'>
      <div style={{ display: 'grid', rowGap: 8 }}>
        <CustomLabel label={`地震発生時間`} />
        <div style={{ padding: '16px 8px' }}>
          <Ratio progress={yesRatio} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              pointerEvents: isManagementMode ? 'none' : 'auto',
            }}
          >
            <SingleCard
              width={SINGLE_CARD_WIDTH}
              isYes={drawn === 'yes'}
              closedAt={closedAt}
              opendeAt={openedAt}
              stripeColor={STRIPE_COLOR}
              handleClick={() => handleSelect(selectedIndex === -1 ? 0 : -1)}
              yesImage={yesImage}
              noImage={noImage}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}

const Ratio: React.FC<{ progress: number }> = ({ progress }) => {
  // 2000-01-01 20:00:00 は iOS でエラー
  const start = new Date('2000/01/01 20:00:00');
  const date = new Date(start.getTime() + 10 * 60 * 60 * 8 * progress);

  return (
    <div style={{ whiteSpace: 'nowrap' }}>
      <span style={{ fontSize: 32, paddingRight: 4 }}>{date.getHours()}</span>
      <span>時</span>
      <span style={{ fontSize: 32, paddingRight: 4 }}>
        {String(date.getMinutes()).padStart(2, '0')}
      </span>
      <span>分</span>
    </div>
  );
};
