import { Navigate, Route, Routes } from 'react-router-dom';

import TopPage from '../pages/TopPage';
import LisanPage from '../pages/LiSanPage';
import KouSanPage from '../pages/KouSanPage';
import ManageLiSanPage from '../pages/ManageLiSanPage';
import ManageKouSanPage from '../pages/ManageKouSanPage';
import NotesPage from '../pages/NotesPage';
import InputPitchesPage from '../pages/InputPitchesPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<TopPage />} />
      <Route path='/liSan' element={<LisanPage />} />
      <Route path='/kouSan' element={<KouSanPage />} />
      <Route path='/m/liSan' element={<ManageLiSanPage />} />
      <Route path='/m/kouSan' element={<ManageKouSanPage />} />
      <Route path='notes' element={<NotesPage />} />
      <Route path='inputPitches' element={<InputPitchesPage />} />
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
};

export default AppRoutes;
