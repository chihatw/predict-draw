import { Navigate, Route, Routes } from 'react-router-dom';

import TopPage from '../pages/TopPage';
import LisanPage from '../pages/LiSanPage';
import KouSanPage from '../pages/KouSanPage';
import MngLiSanPage from '../pages/MngLiSanPage';
import MngKouSanPage from '../pages/MngKouSanPage';
import NotesPage from '../pages/NotesPage';
import MngNotesPage from '../pages/MngNotesPage';
import SandBox from '../components/SandBox';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<TopPage />} />
      <Route path='/liSan' element={<LisanPage />} />
      <Route path='/kouSan' element={<KouSanPage />} />
      <Route path='/mng/liSan' element={<MngLiSanPage />} />
      <Route path='/mng/kouSan' element={<MngKouSanPage />} />
      <Route path='/notes' element={<NotesPage />} />
      <Route path='/mng/notes' element={<MngNotesPage />} />
      <Route path='/dev' element={<SandBox />} />
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
};

export default AppRoutes;
