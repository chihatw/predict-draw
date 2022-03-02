import { Route, Routes } from 'react-router-dom';

import TopPage from '../../pages/TopPage';
import DrawPage from '../../pages/DrawPage';
import PredictPage from '../../pages/PredictPage';
import LoginPage from '../../pages/LoginPage';
import PrivateRoute from '../routes/PrivateRoute';
import GuestRoute from '../routes/GuestRoute';

const AppComponent = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <PrivateRoute>
            <TopPage />
          </PrivateRoute>
        }
      />
      <Route
        path='/predict'
        element={
          <PrivateRoute>
            <PredictPage />
          </PrivateRoute>
        }
      />
      <Route
        path='/draw'
        element={
          <PrivateRoute>
            <DrawPage />
          </PrivateRoute>
        }
      />
      <Route
        path='/login'
        element={
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        }
      />
    </Routes>
  );
};

export default AppComponent;
