import React, { useContext } from 'react';
import { Cue } from '../../../../../Model';

import AppContext from '../../../../../services/context';

const Card = React.memo(({ cue }: { cue: Cue }) => {
  const { label, imagePath } = cue;
  const { state } = useContext(AppContext);
  const { randomWorkout } = state;
  const { blobURLs } = randomWorkout;
  const blobURL = blobURLs[imagePath] || '';

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 320,
      }}
    >
      {imagePath ? (
        <img src={blobURL} width={320} height={320} />
      ) : (
        <div>{label}</div>
      )}
    </div>
  );
});

export default Card;
