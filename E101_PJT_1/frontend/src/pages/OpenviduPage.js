import React from 'react';
import OpenViduBlock from '../components/openvidutest/OpenViduBlock';
import { useLocation } from 'react-router-dom';

const OpenviduPage = () => {
  const location = useLocation();
  const sessionNickname = location.state.sessionNickname;
  const sessionRoomId = location.state.sessionRoomId;
  // const {sessionNickname, sessionRoomId} = location.state;

  return (
    <OpenViduBlock
      sessionNickname={sessionNickname}
      sessionRoomId={sessionRoomId}
    >      
    </OpenViduBlock>
  );
};

export default OpenviduPage;
