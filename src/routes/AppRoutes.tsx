import { Navigate, Route, Routes } from 'react-router-dom';

import TopPage from '../pages/TopPage';
import LisanPage from '../pages/LiSanPage';
import KouSanPage from '../pages/KouSanPage';
import MngPage from '../pages/MngPage';
import NotePage from '../pages/NotePage';
import MngNotePage from '../pages/MngNotePage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<TopPage />} />
      <Route path='/liSan' element={<LisanPage />} />
      <Route path='/kouSan' element={<KouSanPage />} />
      <Route path='/mng' element={<MngPage />} />
      <Route path='/note' element={<NotePage />} />
      <Route path='/mng/note' element={<MngNotePage />} />
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
};

export default AppRoutes;
