import { Navigate, Route, Routes } from 'react-router-dom';

import TopPage from '../pages/TopPage';
import LisanPage from '../pages/LiSanPage';
import KouSanPage from '../pages/KouSanPage';
import ManageLiSanPage from '../pages/ManageLiSanPage';
import ManageKouSanPage from '../pages/ManageKouSanPage';
import NotesPage from '../pages/NotesPage';
import ManageNotesPage from '../pages/ManageNotesPage';
import SandBox from '../components/SandBox';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<TopPage />} />
      <Route path='/liSan' element={<LisanPage />} />
      <Route path='/kouSan' element={<KouSanPage />} />
      <Route path='/mng/liSan' element={<ManageLiSanPage />} />
      <Route path='/mng/kouSan' element={<ManageKouSanPage />} />
      <Route path='/notes' element={<NotesPage />} />
      <Route path='/mng/notes' element={<ManageNotesPage />} />
      <Route path='/dev' element={<SandBox />} />
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
};

export default AppRoutes;
