import { Button } from '@mui/material';
import { useContext } from 'react';

import Layout from '../../components/Layout';
import AppContext from '../../services/context';

const TopPage = () => {
  const { handleNavigate, user, handleLogout } = useContext(AppContext);
  return (
    <Layout user={user} handleLogout={handleLogout}>
      <div
        style={{ marginTop: 160, display: 'flex', justifyContent: 'center' }}
      >
        <div style={{ display: 'grid', rowGap: 40, width: 300 }}>
          <Button
            variant='contained'
            sx={{ height: 120 }}
            onClick={() => handleNavigate('/predict')}
          >
            <span style={{ color: 'white', fontSize: 24 }}>質問する</span>
          </Button>
          <Button
            variant='contained'
            sx={{ height: 120 }}
            onClick={() => handleNavigate('/draw')}
          >
            <span style={{ color: 'white', fontSize: 24 }}>返答する</span>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default TopPage;
