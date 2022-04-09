import { Navigate, Route, Routes } from 'react-router-dom';

import TopPage from '../pages/TopPage';
import LisanPage from '../pages/LiSanPage';
import KouSanPage from '../pages/KouSanPage';
import MngLiSanPage from '../pages/MngLiSanPage';
import MngKouSanPage from '../pages/MngKouSanPage';
import NotePage from '../pages/NotePage';
import MngNotePage from '../pages/MngNotePage';
import SandBoxPage from '../pages/SandBoxPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<TopPage />} />
      <Route path='/liSan' element={<LisanPage />} />
      <Route path='/kouSan' element={<KouSanPage />} />
      <Route path='/mng/liSan' element={<MngLiSanPage />} />
      <Route path='/mng/kouSan' element={<MngKouSanPage />} />
      <Route path='/note' element={<NotePage />} />
      <Route path='/mng/note' element={<MngNotePage />} />
      <Route path='/dev' element={<SandBoxPage />} />
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
};

export default AppRoutes;
