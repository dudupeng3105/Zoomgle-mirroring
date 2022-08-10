import React from 'react';
import OpenViduBlock from '../components/openvidutest/OpenViduBlock';
import { useLocation } from 'react-router-dom';

const OpenviduPage = () => {
  const location = useLocation();
  const sessionNickname = location.state.sessionNickname;
  const sessionRoomId = location.state.sessionRoomId;
  const sessionCapacity = location.state.sessionCapacity;
  const sessionHost = location.state.sessionHost;
  // const {sessionNickname, sessionRoomId} = location.state;

  return (
    <OpenViduBlock
      sessionNickname={sessionNickname}
      sessionRoomId={sessionRoomId}
      sessionCapacity={sessionCapacity}
      sessionHost={sessionHost}
    >      
    </OpenViduBlock>
  );
};

export default OpenviduPage;
