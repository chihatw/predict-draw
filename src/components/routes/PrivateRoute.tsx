import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../../App';

const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
  const { user } = useContext(AppContext);
  return !!user ? children : <Navigate to='/login' />;
};

export default PrivateRoute;
