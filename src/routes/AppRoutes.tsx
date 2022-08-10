import { Navigate, Route, Routes } from 'react-router-dom';

import TopPage from '../pages/TopPage';
import LisanPage from '../pages/User/LiSanPage';
import KouSanPage from '../pages/User/KouSanPage';
import MngPage from '../pages/MngPage';
import NotePage from '../pages/Note/NotePage';
import MngNotePage from '../pages/Note/MngNotePage';
import RandomWorkoutEditPage from '../pages/RandomWorkoutEditPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<TopPage />} />
      <Route path='/liSan' element={<LisanPage />} />
      <Route path='/kouSan' element={<KouSanPage />} />
      <Route path='note' element={<NotePage />} />
      <Route path='/mng'>
        <Route index element={<MngPage />} />
        <Route path='note' element={<MngNotePage />} />
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
