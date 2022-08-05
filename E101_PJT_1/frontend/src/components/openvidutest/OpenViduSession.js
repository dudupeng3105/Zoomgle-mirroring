import React from 'react';
import styled from "styled-components";
import UserVideoComponent from './UserVideoComponent';
import DiceRoller from '../../components/utils/DiceRoller'
import { useState } from 'react';

const OpenViduSessionBlock = styled.div`
  width: 100vw;
  height: 100vh;
`;

const OpenViduSessionHeader = styled.div`
  width: 100vw;
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 2rem;
  color: white;
  padding-left: 5vw;
`

const OpenViduSessionLeaveBtn = styled.div`
  cursor: pointer;
  width: 10vw;
  height: 5vh;
  background-color: white;
  border: 3px solid black;
  color: black;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  :hover {
    background-color: #adff45;
  }
`

const MainVideo = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  font-size: 2rem;
  position: absolute;

  & video {
    cursor: initial;
  }

  &.pos0 {
    top: 80vh;
    left: 8.5vw;
  }

  &.pos1 {
    top: 85vh;
    left: 23vw;
  }

  &.pos2 {
    top: 85vh;
    left: 33vw;
  }

  &.pos3 {
    top: 85vh;
    left: 45vw;
  }

  &.pos4 {
    top: 85vh;
    left: 55vw;
  }

  &.pos5 {
    top: 85vh;
    left: 65vw;
  }

  &.pos6 {
    top: 85vh;
    left: 77vw;
  }

  &.pos7 {
    top: 68vh;
    left: 81vw;
  }

  &.pos8 {
    top: 50vh;
    left: 85vw;
  }

  &.pos9 {
    top: 23vh;
    left: 86vw;
  }

  &.pos10 {
    top: 3vh;
    left: 81vw;
  }

  &.pos11 {
    top: 4vh;
    left: 71vw;
  }

  &.pos12 {
    top: 3.5vh;
    left: 60vw;
  }

  &.pos13 {
    top: 2.5vh;
    left: 48vw;
  }

  &.pos14 {
    top: 3vh;
    left: 35.5vw;
  }

  &.pos15 {
    top: 3vh;
    left: 22vw;
  }

  &.pos16 {
    top: 16vh;
    left: 17vw;
  }

  &.pos17 {
    top: 30vh;
    left: 13vw;
  }

  &.pos18 {
    top: 40vh;
    left: 16vw;
  }

  &.pos19 {
    top: 50vh;
    left: 14vw;
  }
`;

const SwitchCameraBtn = styled.div`  
  cursor: pointer;
  width: 15vmin;
  height: 5vh;
  background-color: white;
  border: 2px solid black;
  color:black;
  :hover {
    background-color:#adff45;
  }
`

const VideoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80vw;
  height: 50vh;
  border: 3px solid white;

`

const UserVideoComponentContainer = styled.div`
  width: 10vmin;
  height: 10vmin;
  border: 3px solid white;
  cursor: pointer;
`

const OpenViduSession = ({
  handleMainVideoStream,
  switchCamera,
  leaveSession,
  mySessionIdValue,
  mainStreamManager,
  publisher,
  subscribers,
}) => {

  const [posNum, setPosNum] = useState(1);


  return (
    <OpenViduSessionBlock>
      <OpenViduSessionHeader>
        <p>{mySessionIdValue}번 방</p>
        <OpenViduSessionLeaveBtn
          onClick={() => {
            leaveSession();
          }}
          value="Leave session"
        >
          Leave session
        </OpenViduSessionLeaveBtn>
      </OpenViduSessionHeader>
      {/* 그 중심에 뜨는 사람 일단 필요없음*/}
      {mainStreamManager !== undefined ? (
        <MainVideo className={"pos" + posNum}>
          {/* <p>메인스트리머</p> */}
          <UserVideoComponent streamManager={mainStreamManager} />
          
        </MainVideo>
      ) : null}

      <SwitchCameraBtn            
        onClick={() => {
          switchCamera();
      }}>Switch Camera</SwitchCameraBtn>
      {/* 비디오 컨테이너 */}
      <VideoContainer>
        {publisher !== undefined ? (
          <UserVideoComponentContainer            
            onClick={() => handleMainVideoStream(publisher)}
          >
            <UserVideoComponent streamManager={publisher} />
          </UserVideoComponentContainer>
        ) : null}
        {subscribers.map((sub, i) => (
          <UserVideoComponentContainer
            key={i}            
            onClick={() => handleMainVideoStream(sub)}
          >
            <UserVideoComponent streamManager={sub} />
          </UserVideoComponentContainer>
        ))}
      </VideoContainer>
      <DiceRoller posNum={posNum} setPosNum={setPosNum}></DiceRoller>
    </OpenViduSessionBlock>
  );
};

export default OpenViduSession;