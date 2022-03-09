import { useTheme } from '@mui/system';
import React, { useMemo } from 'react';

import Header from './components/Header';

const HEADER_HEIGHT = 60;
const PADDING_TOP = 8;

const Layout: React.FC<{ user: string; label?: string }> = ({
  user,
  label,
  children,
}) => {
  const theme = useTheme();
  const backgroundColor = useMemo(() => {
    let result = '';
    switch (user) {
      case 'liSan':
        result = theme.palette.primary.main;
        break;
      case 'kouSan':
        result = theme.palette.secondary.main;
      default:
    }

    return result;
  }, []);
  return (
    <div style={{ height: '100%' }}>
      <Header
        label={label}
        height={HEADER_HEIGHT}
        backgroundColor={backgroundColor}
      />
      <div style={{ height: PADDING_TOP }} />
      <div style={{ height: `calc(100% - ${HEADER_HEIGHT + PADDING_TOP}px)` }}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
