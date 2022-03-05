import { useTheme } from '@mui/system';
import React, { useMemo } from 'react';

import Header from './components/Header';

const Layout: React.FC<{ user: string }> = ({ children, user }) => {
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
    <div>
      <Header backgroundColor={backgroundColor} />
      <div style={{ height: 8 }} />
      {children}
    </div>
  );
};

export default Layout;
