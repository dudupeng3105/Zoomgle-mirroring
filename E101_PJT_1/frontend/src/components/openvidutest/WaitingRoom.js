import React, { useEffect } from 'react';
import styled from 'styled-components';
import UserVideoComponent from './UserVideoComponent';
import ReactAudioPlayer from '../utils/reactAudioPlayer';
import waitingRoomSound from '../../media/sounds/06_waitingRoom.wav'
import waitingRoomManual1 from '../../media/images/manualBox1.png'
import waitingRoomManual2 from '../../media/images/manualBox2.png'
import waitingRoomManual3 from '../../media/images/manualBox3.png'
import waitingRoomManual4 from '../../media/images/manualBox4.png'
import waitingRoomManual5 from '../../media/images/manualBox5.png'
import waitingStone from '../../media/images/waitingStone.png'
import waitingStartStone from '../../media/images/waitingStartStone.png'
import useInterval from '../utils/useIntervals';
import { useState } from 'react';

const WaitingRoomBlock = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  & h1 {
    margin: 0;
  }
`;
// 몇 번 방
const OpenViduSessionHeader = styled.div`
  width: 100vw;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4rem;
  color: white;
  padding-left: 5vw;
`;

const WaitingUserVideoContainer = styled.div`
  width: 25vw;
  height: 25vh;  
  cursor: pointer;
  position: absolute;
  &.pos0 {
    top: 15vh;
    left: 2vw;
  }

  &.pos1 {
    top: 45vh;
    left: 2vw;
  }

  &.pos2 {
    top: 75vh;
    left: 2vw;
  }

  &.pos3 {
    top: 15vh;
    right: 2vw;
  }

  &.pos4 {
    top: 45vh;
    right: 2vw;
  }

  &.pos5 {
    top: 75vh;
    right: 2vw;
  }
`;

const ManualBox = styled.div`
  width: 45vw;
  height: 50vh;
  margin-top: 15vh;
  margin-right: 8vw;  
  background: ${props => `url(${props.backImg}) no-repeat center`};
  background-size: 45vw 50vh;
  opacity: 0;
  @keyframes fadeOut {
    10% {
      opacity: 0;
      transform: translateX(0vw);
    }
    30% {
      opacity: 1;      
      transform: translateX(5vw);
    }  
    70% {
      opacity: 1;      
      transform: translateX(5vw);
    }  
    90% {
      opacity: 0;
      transform: translateX(10vw);
    }
    100% {
      opacity: 0;
      transform: translateX(0vw);
    }
  }
  animation: fadeOut;
  animation-duration: 10.4s;  
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;  
`;

const GameStartBtn = styled.div`
  cursor: pointer;
  width: 20vw;
  height: 12vh;
  margin-top: 5vh;
  background: url(${waitingStartStone});
  background-size: 20vw 12vh;  
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  padding-top: 4vh;
  &.waitingBtn {
    background: url(${waitingStone});
    background-size: 20vw 12vh;
    padding-top: 1vh;
    color: white;
  }
  :active {
    transform: scale(0.95);
  }
`;

const WaitingRoom = ({
  sessionHost,
  sessionCapacity,
  nextPlayer,
  setNextPlayer,
  isRoll,
  setIsRoll,
  isVote,
  setIsVote,
  vote,
  setVote,
  handleMainVideoStream,
  switchCamera,
  leaveSession,
  mySessionIdValue,
  myUserNameValue,
  mainStreamManager,
  publisher,
  players,
  subscribers,
  session,
  turnNum,
  setTurnNum,
  posList,
  setPosList,
  minigameType,
  setMinigameType,
}) => {
  // const [posNum, setPosNum] = useState(1);
  // 게임 진행 관련 변수들
  // console.warn("퍼블리셔는?",publisher);
  const playerNum = players.length; // 몇 명에서 하는지
  const myTurnNum = players.indexOf(myUserNameValue);
  const [manualNum, setManualNum] = useState(1);

  useInterval(() => {
    setManualNum((manualNum+1)%3 + 1);
  }, 10000);

  // 게임 시작
  const onClickStartGame = () => {    
    // 데이터 정리
    const nextTurnNum = Math.floor(Math.random() * playerNum);
    const nextNextPlayer = players[nextTurnNum];
    const nextPosList = new Array(playerNum).fill(0);
    const nextVote = [];
    const nextIsRoll = false;
    const nextIsVote = false;
    
    // emit
    const sendData = {
      session: mySessionIdValue,
      to: [], // all user
      data: JSON.stringify({
        nextTurnNum : nextTurnNum,
        nextNextPlayer : nextNextPlayer,
        nextPosList : nextPosList,
        nextVote : nextVote,
        nextIsRoll : nextIsRoll,
        nextIsVote : nextIsVote,
        nextIsGameStart : true
      }),
      type: 'GAME_STATE_START',
    };
    // console.log(JSON.stringify(sendData));
    fetch('https://i7e101.p.ssafy.io:4443/openvidu/api/signal', {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + btoa('OPENVIDUAPP:e101ssafy71'),
        'Content-type': 'application/json',
      },
      body: JSON.stringify(sendData),
    });    
  }

  return (
    <WaitingRoomBlock>
      <ReactAudioPlayer
        urlSound={waitingRoomSound}
        isLoop={true}
        isPlaying={true}
      ></ReactAudioPlayer>
      <OpenViduSessionHeader>
        {mySessionIdValue}번 방
      </OpenViduSessionHeader>
      {manualNum === 1 ?  <ManualBox backImg={waitingRoomManual1}></ManualBox> : ''}
      {manualNum === 2 ?  <ManualBox backImg={waitingRoomManual2}></ManualBox> : ''}
      {manualNum === 3 ?  <ManualBox backImg={waitingRoomManual3}></ManualBox> : ''}
      {manualNum === 4 ?  <ManualBox backImg={waitingRoomManual4}></ManualBox> : ''}
      {manualNum === 5 ?  <ManualBox backImg={waitingRoomManual5}></ManualBox> : ''}      
      {/* <ManualBox className={`manual-${manualNum}`}></ManualBox> */}
      {sessionHost === myUserNameValue ? (
        (playerNum === Number(sessionCapacity)) ? (
          <GameStartBtn onClick={() => onClickStartGame()}>
            게임시작
          </GameStartBtn>
        ) : (
          <GameStartBtn className='waitingBtn'>
            대기중 ({playerNum==0 ? 1 : playerNum}/{sessionCapacity}명)
          </GameStartBtn>
        )
      ) : (
        ''
      )}

      {publisher !== undefined ? (
        <WaitingUserVideoContainer className={`pos${0}`}>
          {/* onClick={() => handleMainVideoStream(publisher)} */}
          <UserVideoComponent
            streamManager={publisher}
            mainStreamer={'publisher'}
            status={'waiting'}
          />
        </WaitingUserVideoContainer>
      ) : null}
      {subscribers.map((sub, i) => (
        <WaitingUserVideoContainer className={`pos${i + 1}`} key={`waiting${i}`}>
          {/* onClick={() => handleMainVideoStream(sub) */}
          <UserVideoComponent
            streamManager={sub}
            mainStreamer={'sub'}
            status={'waiting'}
          />
        </WaitingUserVideoContainer>
      ))}
    </WaitingRoomBlock>
  );
};

export default WaitingRoom;
