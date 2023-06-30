import { Navigate, Route, Routes } from 'react-router-dom';

import MngPage from '../views/pages/MngPage';
import MngNotePage from '../views/pages/Note/MngNotePage';
import NotePage from '../views/pages/Note/NotePage';
import RandomWorkoutEditPage from '../views/pages/RandomWorkoutEditPage';
import SpeedWorkoutEditPage from '../views/pages/SpeedWorkoutEditPage';
import TopPage from '../views/pages/TopPage';
import KouSanPage from '../views/pages/User/KouSanPage';
import LisanPage from '../views/pages/User/LiSanPage';
import ChinSanPage from '../views/pages/User/UserPane/ChinSanPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<TopPage />} />
      <Route path='/liSan' element={<LisanPage />} />
      <Route path='/kouSan' element={<KouSanPage />} />
      <Route path='/chinSan' element={<ChinSanPage />} />
      <Route path='note' element={<NotePage />} />
      <Route path='/mng'>
        <Route index element={<MngPage />} />
        <Route path='note' element={<MngNotePage />} />
        <Route path='speed'>
          <Route path='new' element={<SpeedWorkoutEditPage />} />
          <Route path=':workoutId' element={<SpeedWorkoutEditPage />} />
        </Route>
        <Route path='random'>
          <Route path='new' element={<RandomWorkoutEditPage />} />
          <Route path=':workoutId' element={<RandomWorkoutEditPage />} />
        </Route>
      </Route>
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
};

export default AppRoutes;
