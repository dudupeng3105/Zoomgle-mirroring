import React, { useEffect } from 'react';
import styled from 'styled-components';
import UserVideoComponent from './UserVideoComponent';
import ReactAudioPlayer from '../utils/reactAudioPlayer';
import waitingRoomSound from '../../media/sounds/06_waitingRoom.wav'
import waitingRoomManual1 from '../../media/images/waitingRoomManual1.png'
import waitingRoomManual2 from '../../media/images/waitingRoomManual2.png'
import waitingRoomManual3 from '../../media/images/waitingRoomManual3.png'
import useInterval from '../utils/useIntervals';
import { useState } from 'react';

import playerEnterSound from '../../media/sounds/07_playerEnter.wav';

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
    top: 70vh;
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
    top: 70vh;
    right: 2vw;
  }
`;

const ManualBox = styled.div`
  width: 45vw;
  height: 50vh;
  margin-top: 15vh;
  margin-right: 5vw;
  /* border: 3px solid white;   */
  /* background: url(${waitingRoomManual1});
  background-size: 45vw 50vh; */
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
  &.manual-1 {
    background: url(${waitingRoomManual1});
    background-size: 45vw 50vh;    
  }
  &.manual-2 {
    background: url(${waitingRoomManual2});
    background-size: 45vw 50vh;
  }
  &.manual-3 {
    background: url(${waitingRoomManual3});
    background-size: 45vw 50vh;
  }
`;

const GameStartBtn = styled.div`
  cursor: pointer;
  width: 20vw;
  height: 12vh;
  margin-top: 5vh;
  border: 2px solid green;
  background-color: green;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  &.waitingBtn {
    background-color: grey;
    color: white;
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
  const [manualNum, setManualNum] = useState(0);

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
      <ManualBox className={`manual-${manualNum}`}></ManualBox>
      {sessionHost === myUserNameValue ? (
        (playerNum === Number(sessionCapacity)) ? (
          <GameStartBtn onClick={() => onClickStartGame()}>
            게임시작
          </GameStartBtn>
        ) : (
          <GameStartBtn className='waitingBtn' onClick={() => onClickStartGame()}>
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
