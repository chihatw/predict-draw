import { Navigate } from 'react-router-dom';
import React, { useContext } from 'react';

import { AppContext } from '../../App';

const GuestRoute = ({ children }: { children: React.ReactElement }) => {
  const { user } = useContext(AppContext);
  return !!user ? <Navigate to='/' /> : children;
};

export default GuestRoute;
