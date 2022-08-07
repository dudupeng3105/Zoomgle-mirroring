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
  top: 25vh;
  left: 30vw;
  width: 40vw;
  height: 40vh;
  & video {
    cursor: initial;
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

const TestContainer = styled.div`
  color: white;
  & p {
    font-size: 2rem;
  }
`

const UserVideoComponentContainer = styled.div`
  width: 10vmin;
  height: 10vmin;
  border: 3px solid white;
  cursor: pointer;
  position: absolute;
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
  &.testPos {
    margin-left: 2vw;
  }
`



const OpenViduSession = ({
  handleMainVideoStream,
  switchCamera,
  leaveSession,
  mySessionIdValue,
  myUserNameValue,
  mainStreamManager,
  publisher,
  subscribers,
  session
}) => {

  const [posNum, setPosNum] = useState(1);
  console.error("구독자 누구있냐", subscribers[0])

  session.on('signal:gameStateChanged', (data) => {
    // {"nextPosNum":2} 스트링이라 parse해줌    
    const nextPos = JSON.parse(data.data).nextPosNum;    
    console.log("주사위바뀐거 받음", nextPos);
    setPosNum(nextPos)
  })

  return (
    <OpenViduSessionBlock>
      <h1>{myUserNameValue}</h1>
      <TestContainer>
        {subscribers.map((sub, i) => (
          <p key={i}>{sub.stream.connection.data} {i}번쨰 유저</p>
        ))}
        {/* <p>{publisher.stream.connection.data}</p> */}
      </TestContainer>
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
        <MainVideo>
          {/* <p>메인스트리머</p> */}
          <UserVideoComponent streamManager={mainStreamManager} mainStreamer={"mainStreamer"}/>
          
        </MainVideo>
      ) : null}

      <SwitchCameraBtn            
        onClick={() => {
          switchCamera();
      }}>Switch Camera</SwitchCameraBtn>
      {/* 비디오 컨테이너 */}
      {/* <VideoContainer> */}
        {publisher !== undefined ? (
          <UserVideoComponentContainer            
            onClick={() => handleMainVideoStream(publisher)}
            className={`pos${posNum} testPos`}
            
          >
            <UserVideoComponent streamManager={publisher} mainStreamer={"publisher"}/>
          </UserVideoComponentContainer>
        ) : null}
        {subscribers.map((sub, i) => (
          <UserVideoComponentContainer
            className={`pos${posNum+i}`}
            key={i}            
            onClick={() => handleMainVideoStream(sub)}
          >
            <UserVideoComponent streamManager={sub} mainStreamer={"sub"}/>
          </UserVideoComponentContainer>
        ))}
      {/* </VideoContainer> */}
      {/* 주사위 */}
      <DiceRoller session={session} posNum={posNum} setPosNum={setPosNum}></DiceRoller>
    </OpenViduSessionBlock>
  );
};

export default OpenViduSession;