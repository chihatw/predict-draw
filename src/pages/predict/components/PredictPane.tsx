import { css } from '@emotion/css';
import { CustomLabel } from '@chihatw/lang-gym-h.ui.custom-label';
import { Collapse, Switch } from '@mui/material';
import React, { useEffect, useState } from 'react';

import Smoke from './Smoke';
import DoubleCard from './DoubleCard';

const STRIPE_COLOR = '#5dbec4';

const PredictPane: React.FC<{
  opponent: string;
  newGameAt: number;
  cardWidth: number;
  superPredict?: string;
  showPredictPane: boolean;
  isManagementMode: boolean;
  superShowPredictPane: boolean;
  yesImage: any;
  noImage: any;
  handlePredict: (value: string) => void;
  handleShowPredict: (checked: boolean) => void;
}> = ({
  yesImage,
  noImage,
  opponent,
  newGameAt,
  cardWidth,
  superPredict,
  showPredictPane,
  isManagementMode,
  superShowPredictPane,
  handlePredict,
  handleShowPredict,
}) => {
  if (isManagementMode) {
    return (
      <div>
        <div>
          <Switch
            size="small"
            checked={showPredictPane}
            onChange={(e) => handleShowPredict(e.target.checked)}
          />
        </div>
        <div
          style={{
            position: 'relative',
            pointerEvents: 'none',
          }}
        >
          <PredictPaneContext
            opponent={opponent}
            newGameAt={newGameAt}
            cardWidth={cardWidth}
            superPredict={superPredict}
            isManagementMode={true}
            handlePredict={handlePredict}
            yesImage={yesImage}
            noImage={noImage}
          />
          {!superShowPredictPane && <Smoke />}
        </div>
      </div>
    );
  } else {
    return (
      <Collapse in={!!superShowPredictPane}>
        <PredictPaneContext
          opponent={opponent}
          cardWidth={cardWidth}
          newGameAt={newGameAt}
          handlePredict={handlePredict}
          yesImage={yesImage}
          noImage={noImage}
        />
      </Collapse>
    );
  }
};

export default PredictPane;

const PredictPaneContext: React.FC<{
  opponent: string;
  newGameAt: number;
  cardWidth: number;
  superPredict?: string;
  isManagementMode?: boolean;
  handlePredict: (value: string) => void;
  yesImage: any;
  noImage: any;
}> = ({
  opponent,
  newGameAt,
  cardWidth,
  superPredict,
  isManagementMode,
  handlePredict,
  yesImage,
  noImage,
}) => (
  <>
    <CustomLabel label={`${opponent}は何をしていた？`} />
    <div style={{ height: 24 }} />
    <Predictx
      cardWidth={cardWidth}
      newGameAt={newGameAt}
      superPredict={superPredict}
      isManagementMode={isManagementMode}
      handlePredict={handlePredict}
      yesImage={yesImage}
      noImage={noImage}
    />
  </>
);

// 初期は「はい・いいえ」が見えて
// open で「柄面」、close で「はい・いいえ」になる

const Predictx: React.FC<{
  newGameAt: number;
  cardWidth: number;
  superPredict?: string;
  isManagementMode?: boolean;
  yesImage: any;
  noImage: any;
  handlePredict: (value: string) => void;
}> = ({
  cardWidth,
  newGameAt,
  superPredict,
  isManagementMode,
  yesImage,
  noImage,
  handlePredict,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [openedAts, setOpenedAts] = useState([0, 0]);
  const [closedAts, setClosedAts] = useState([0, 0]);

  useEffect(() => {
    if (!isManagementMode) return;
    let _closeAts = [...closedAts];
    let _openedAts = [...openedAts];
    switch (superPredict) {
      case 'yes':
        // 「はい」を見せて
        _closeAts[0] = Date.now();
        // 「いいえ」は「柄面」を見せる
        _openedAts[1] = Date.now();
        break;
      case 'no':
        // 「いいえ」を見せて
        _closeAts[1] = Date.now();
        // 「はい」は「柄面」をみせる
        _openedAts[0] = Date.now();
        break;
      default:
        // 未選択の場合、「はい・いいえ」を見せる
        _closeAts = new Array(2).fill(Date.now());
    }
    setOpenedAts(_openedAts);
    setClosedAts(_closeAts);
  }, [isManagementMode, superPredict]);

  // newGameAt が更新されれば、「はい・いいえ」を見せる
  useEffect(() => {
    setClosedAts(new Array(2).fill(Date.now()));
  }, [newGameAt]);

  const handleClick = (index: number) => {
    // 選択キャンセルの場合（すでに選択されたものをクリック）
    if (selectedIndex === index) {
      setSelectedIndex(-1);
      handlePredict('');

      // 選択されていなかったカードを「はい・いいえ」にする
      const _closeAts = [...closedAts];
      _closeAts[index === 0 ? 1 : 0] = Date.now();
      setClosedAts(_closeAts);
    }
    // 選択の場合
    else {
      setSelectedIndex(index);
      handlePredict(index === 0 ? 'yes' : 'no');

      // 選択していないカードを「柄面」にする
      const _openedAts = [...openedAts];
      _openedAts[index === 0 ? 1 : 0] = Date.now();
      setOpenedAts(_openedAts);

      // 選択したカードが「柄面」の場合
      if (selectedIndex > -1) {
        // 選択したカードを「はい・いいえ」にする
        const _closeAts = [...closedAts];
        _closeAts[index] = Date.now();
        setClosedAts(_closeAts);
      }
    }
  };
  return (
    <div
      className={css({
        display: 'flex',
        padding: 8,
        justifyContent: 'center',
      })}
    >
      <div
        style={{
          display: 'grid',
          columnGap: 8,
          gridTemplateColumns: `${cardWidth}px ${cardWidth}px`,
        }}
      >
        {[0, 1].map((index) => (
          <DoubleCard
            key={index}
            width={cardWidth}
            isYes={index === 0}
            openedAt={openedAts[index]}
            closedAt={closedAts[index]}
            stripeColor={STRIPE_COLOR}
            handleClick={() => handleClick(index)}
            yesImage={yesImage}
            noImage={noImage}
          />
        ))}
      </div>
    </div>
  );
};
