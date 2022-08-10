import React, { useEffect } from 'react';
import styled from 'styled-components';
import UserVideoComponent from './UserVideoComponent';
import MainUserVideoComponent from './MainUserVideoComponent'; // 미니게임 중앙화면용
import DiceRoller from '../../components/utils/DiceRoller';
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
    left: 0vw;
  }

  &.pos1 {
    top: 40vh;
    left: 0vw;
  }

  &.pos2 {
    top: 65vh;
    left: 0vw;
  }

  &.pos3 {
    top: 15vh;
    right: 0vw;
  }

  &.pos4 {
    top: 40vh;
    right: 0vw;
  }

  &.pos5 {
    top: 65vh;
    right: 0vw;
  }
`;

const ManualBox = styled.div`
  width: 45vw;
  height: 45vh;
  margin-top: 20vh;
  border: 3px solid white;
`;

const GameStartBtn = styled.div`
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
      {/* <h1>여기 대기실임: {myUserNameValue}</h1> */}
      {/* <TestContainer>
        <PlayerList>
          <p>내 턴번호: {myTurnNum}</p>
          <p>포지션리스트: {posList}</p>
          <p>플레이어 리스트</p>
          <p>사람수: {playerNum}</p>
          <p>누구턴: {turnNum}</p>
          <p>니이름: {myUserNameValue}</p>
          <p>누구냐:{players}</p>
          {players.map((playerName, i) => (
            <p key={i}>
              {i}번쨰: {playerName}
            </p>
          ))}
        </PlayerList>
      </TestContainer> */}
      <OpenViduSessionHeader>
        {mySessionIdValue}번 방
      </OpenViduSessionHeader>
      <ManualBox></ManualBox>
      {sessionHost === myUserNameValue ? (
        playerNum === sessionCapacity ? (
          <GameStartBtn onClick={() => onClickStartGame()}>
            게임시작
          </GameStartBtn>
        ) : (
          <GameStartBtn className='waitingBtn'>
            대기중 ({playerNum}명/{sessionCapacity})
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
        <WaitingUserVideoContainer className={`pos${i + 1}`} key={i}>
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
