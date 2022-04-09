import React from 'react';
import { CustomLabel } from '@chihatw/lang-gym-h.ui.custom-label';
import { Collapse, Switch } from '@mui/material';

const ScorePane: React.FC<{
  user: string;
  points: number;
  opponent: string;
  opponentPoints: number;
  showScorePane: boolean;
  isManagementMode: boolean;
  superShowScorePane: boolean;
  handleShowScore: (value: boolean) => void;
}> = ({
  user,
  points,
  opponent,
  showScorePane,
  opponentPoints,
  isManagementMode,
  superShowScorePane,
  handleShowScore,
}) => {
  if (isManagementMode) {
    return (
      <div>
        <div>
          <Switch
            size='small'
            checked={showScorePane}
            onChange={(e) => {
              handleShowScore(e.target.checked);
            }}
          />
        </div>
        <div style={{ position: 'relative' }}>
          <Context
            user={user}
            points={points}
            opponent={opponent}
            opponentPoints={opponentPoints}
          />
        </div>
      </div>
    );
  } else {
    return (
      <Collapse in={!!superShowScorePane}>
        <Context
          user={user}
          points={points}
          opponent={opponent}
          opponentPoints={opponentPoints}
        />
      </Collapse>
    );
  }
};

export default ScorePane;

const Context: React.FC<{
  user: string;
  points: number;
  opponent: string;
  opponentPoints: number;
}> = ({ user, points, opponent, opponentPoints }) => (
  <>
    <CustomLabel label='得点' />
    <div
      style={{
        padding: '16px 8px',
        display: 'grid',
        gridTemplateColumns: '120px 120px',
      }}
    >
      <UserScore user={user} points={points} />
      <UserScore user={opponent} points={opponentPoints} />
    </div>
  </>
);

const UserScore: React.FC<{ user: string; points: number }> = ({
  user,
  points,
}) => (
  <div>
    <span>{`${user}: `}</span>
    <span style={{ fontSize: 32, paddingRight: 4 }}>{points}</span>
    <span>点</span>
  </div>
);
