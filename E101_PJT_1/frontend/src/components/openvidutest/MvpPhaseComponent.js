import React, { useEffect } from 'react';
import styled from "styled-components";
import UserVideoComponent from './UserVideoComponent';
import MainUserVideoComponent from './MainUserVideoComponent'; // 미니게임 중앙화면용
import { useState } from 'react';

const MvpPhaseComponentBlock = styled.div`
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

const TestContainer = styled.div`
  color: white;  
`;

const PlayerList = styled.div`
  width: 15vw;
  height: 30vh;
  font-size: 1rem;
  color:black;
  background-color: white;
  & p {
    font: 0.5rem;
    margin: 0;
  }
`

const MvpShowUsersContainer = styled.div`
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
`

const MvpPhaseComponent = ({
  setIsGameDone,
  isGameDone,
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
  setMinigameType
}) => {
  // const [posNum, setPosNum] = useState(1);
  // 게임 진행 관련 변수들
  // console.warn("퍼블리셔는?",publisher);
  const playerNum = players.length; // 몇 명에서 하는지  
  const myTurnNum = players.indexOf(myUserNameValue);

  useEffect(() => {
    if (nextPlayer === myUserNameValue){
      handleMainVideoStream(publisher)
    } else {
      const temp = subscribers.filter((sub) => JSON.parse(sub.stream.connection.data).clientData === nextPlayer)[0];
      handleMainVideoStream(temp);
    }

  }, [nextPlayer])

  return (
    <MvpPhaseComponentBlock>
      <h1>{myUserNameValue}</h1>
      <TestContainer>
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
      {/*!! 지금 턴인 사람 표시 !!*/}
      {mainStreamManager !== undefined ? (
        <MainVideo>
          {/* <p>메인스트리머</p> */}
          <MainUserVideoComponent
            isGameDone={isGameDone}
            isRoll={isRoll}
            streamManager={mainStreamManager}
            mainStreamer={'mainStreamer'}
            myTurnNum={myTurnNum}
            playerNum={playerNum}
            players={players}
            mySessionIdValue={mySessionIdValue}
            turnNum={turnNum}
            nextPlayer={nextPlayer}
            isVote={isVote}
            setIsVote={setIsVote}
            vote={vote}
            setVote={setVote}
            posList={posList}
            minigameType={minigameType}
          />
        </MainVideo>
      ) : null}
      
      {publisher !== undefined ? (
        <MvpShowUsersContainer className={`pos${posList[myTurnNum]}`}>
          {/* onClick={() => handleMainVideoStream(publisher)} */}
          <UserVideoComponent
            streamManager={publisher}
            mainStreamer={'publisher'}
            status={'mvpshow'}
          />
        </MvpShowUsersContainer>
      ) : null}
      {subscribers.map((sub, i) => (
        <MvpShowUsersContainer className={`pos${i + 1}`} key={`mvpshow${i}`}>
          {/* onClick={() => handleMainVideoStream(sub) */}
          <UserVideoComponent
            streamManager={sub}
            mainStreamer={'sub'}
            status={'mvpshow'}
          />
        </MvpShowUsersContainer>
      ))}
    </MvpPhaseComponentBlock>
  );
};

export default MvpPhaseComponent;