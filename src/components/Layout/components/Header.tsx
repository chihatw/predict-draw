import { Button } from '@mui/material';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AppContext } from '../../../App';

const displaynames: { [key: string]: string } = {
  'li-san': '李さん',
  'kou-san': '黄さん',
};

const Header: React.FC<{
  user: string;
  buttonLabel?: string;
  handleLogout: () => void;
  handleNavigate?: () => void;
}> = ({ user, buttonLabel, handleLogout, handleNavigate }) => {
  return (
    <div
      style={{
        height: 60,
        display: 'flex',
        alignItems: 'center',
        background: '#52a2aa',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ marginLeft: 20 }}>
        {buttonLabel && (
          <Button variant='contained' onClick={handleNavigate}>
            <span style={{ color: 'white' }}>{buttonLabel}</span>
          </Button>
        )}
      </div>
      <div style={{ marginRight: 20 }}>
        <Button variant='contained' onClick={handleLogout}>
          <span
            style={{ color: 'white' }}
          >{`${displaynames[user]}、こんにちは`}</span>
        </Button>
      </div>
    </div>
  );
};

export default Header;
