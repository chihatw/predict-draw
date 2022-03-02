import { css } from '@emotion/css';
import { Modal, Button } from '@mui/material';
import React, { useContext } from 'react';

import { AppContext } from '../../App';

const LoginPage = () => {
  const { user, handleSetUser } = useContext(AppContext);
  return (
    <Modal open={!user}>
      <div
        className={css({
          top: '50%',
          left: '50%',
          width: 240,
          rowGap: 20,
          padding: 20,
          display: 'grid',
          position: 'absolute',
          transform: 'translate(-50%,-50%)',
          borderRadius: 20,
          backgroundColor: 'white',
        })}
      >
        <div
          className={css({
            display: 'flex',
            justifyContent: 'center',
          })}
        >
          自分の名前を選んでください
        </div>
        <div>
          <Button
            variant='contained'
            fullWidth
            onClick={() => handleSetUser('li-san')}
          >
            <span style={{ color: 'white' }}>李さん</span>
          </Button>
        </div>
        <div>
          <Button
            variant='contained'
            fullWidth
            onClick={() => handleSetUser('kou-san')}
          >
            <span style={{ color: 'white' }}>黄さん</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default LoginPage;
