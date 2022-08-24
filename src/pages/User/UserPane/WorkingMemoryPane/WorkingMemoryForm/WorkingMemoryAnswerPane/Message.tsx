import React from 'react';
import { WorkingMemoryFormState } from '../../Model';

const Message = ({ state }: { state: WorkingMemoryFormState }) => {
  return (
    <div
      style={{
        paddingTop: 40,
        paddingBottom: 16,
        display: 'flex',
        justifyContent: 'center',
        color: '#555',
      }}
    >
      <div>
        <div>
          <span>請</span>
          <span style={{ fontWeight: 'bold', margin: '0 2px' }}>點觸</span>
          <span>{`前${state.offset}項的語音`}</span>
        </div>
        {state.currentIndex < state.cueCount && (
          <div>
            <span>請</span>
            <span style={{ fontWeight: 'bold', margin: '0 2px' }}>記住</span>
            <span>點出時播放的語音</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
