import React, { useContext, useEffect, useState } from 'react';
import Layout from '../Layout';
import { InputPitchList } from '@chihatw/lang-gym-h.form.input-pitch-list';
import { Button, Container } from '@mui/material';
import AppContext from '../services/context';

const InputPitchesPage = () => {
  const { handleUpdatePitchList, note1PitchList } = useContext(AppContext);
  const [pitchListProps, setPitchListProps] = useState<{
    pitchList: [string, string[][][]][];
  }>({
    pitchList: [],
  });

  const handleSubmit = () => {
    const pitchList = pitchListProps.pitchList;
    handleUpdatePitchList({ pitchList, note: 'note1' });
  };

  return (
    <Layout color='blue' label='Input Pitches'>
      <Container maxWidth='sm'>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div style={{ display: 'grid', rowGap: 8 }}>
            <Button
              color='secondary'
              variant='contained'
              onClick={handleSubmit}
            >
              更新
            </Button>
            <InputPitchList superSetPitchListProps={setPitchListProps} />
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default InputPitchesPage;
