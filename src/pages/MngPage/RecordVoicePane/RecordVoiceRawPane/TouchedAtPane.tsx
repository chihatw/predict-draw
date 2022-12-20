import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../../App';

const TouchedAtPane = () => {
  const { state } = useContext(AppContext);
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    const remoteValue = state.recordVoice.logs.selected;

    const [id, touchedAt] = remoteValue.split(',');
    if (!touchedAt) return;

    const date = new Date(Number(touchedAt));
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const dateStr = `${id} - ${minute}:${second}`;

    setDateStr(dateStr);
  }, [state.recordVoice.logs.selected]);

  return <div>{`touchedAt: ${dateStr}`}</div>;
};

export default TouchedAtPane;
