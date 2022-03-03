import React from 'react';

import Header from './components/Header';

const Layout: React.FC<{
  user: string;
  buttonLabel?: string;
  handleLogout: () => void;
  handleNavigate?: () => void;
}> = ({ children, buttonLabel, user, handleLogout, handleNavigate }) => {
  return (
    <div>
      <Header
        user={user}
        buttonLabel={buttonLabel}
        handleLogout={handleLogout}
        handleNavigate={handleNavigate}
      />
      <div style={{ height: 8 }} />
      {children}
    </div>
  );
};

export default Layout;
