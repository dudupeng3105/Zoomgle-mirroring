import React, { useEffect } from 'react';
import styled from 'styled-components';
import UserVideoComponent from './UserVideoComponent';
import MainUserVideoComponent from './MainUserVideoComponent'; // 미니게임 중앙화면용
import DiceRoller from '../../components/utils/DiceRoller';
import ReactAudioPlayer from '../utils/reactAudioPlayer';
import gameStartSound from '../../media/sounds/08_gameStart.wav';
import gameBgmSound from '../../media/sounds/09_gameBgm.wav';
import myTurnSound from '../../media/sounds/10_myTurn.wav';
import { useState } from 'react';
import RankingTable from '../../media/images/RankingTable.png';
import diceImg1 from '../../media/images/dice1.jpg'
import diceImg2 from '../../media/images/dice2.jpg'
import diceImg3 from '../../media/images/dice3.jpg'
import diceImg4 from '../../media/images/dice4.jpg'

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
`;

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
`;

const MainVideo = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  font-size: 2rem;
  position: absolute;
  top: 10vh;
  left: 26vw;
  width: 55vw;
  height: 55vh;
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
  color: black;
  :hover {
    background-color: #adff45;
  }
`;

const TestContainer = styled.div`
  color: white;
`;

const PlayerList = styled.div`
  background: url(${RankingTable});
  background-size: 15vw 30vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 15vw;
  height: 30vh;
  font-size: 3.5vmin;
  padding-top: 4.5vh;
  color: black; /* background-color: white; */
`;

const PlayerRankingTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5.5vh;
  width: 12vw;
  font-size: 5vmin;
  padding-bottom: 4.5vh;
  color: white;
`;

const PlayerRankingTag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 6.1vh;
  width: 13vw;
  font-size: 3vmin;
  margin-bottom: 1vh;
`;

const ShowDiceModal = styled.div`
  display: flex;
  position: absolute;
  z-index: 5;
  width: 15vmin;
  height: 15vmin;
  top: 50vh;
  left: 5vw;      
  &.dice-1 {
    @keyframes leaves-1 {
      0% {
          transform: scale(0);
      }
      100% {
          transform: scale(1);
      }
    }
    animation: leaves-1 2.5s ease-in-out;    
    background: url(${diceImg1}) no-repeat center;
    background-size: 10vmin 10vmin;
  }

  &.dice-2 {
    @keyframes leaves-2 {
      0% {
          transform: scale(0);
      }
      100% {
          transform: scale(1);
      }
    }
    animation: leaves-2 2.5s ease-in-out;      
    background: url(${diceImg2}) no-repeat center;
    background-size: 10vmin 10vmin;
  }

  &.dice-3 {
    @keyframes leaves-3 {
      0% {
          transform: scale(0);
      }
      100% {
          transform: scale(1);
      }
    }
    animation: leaves-3 2.5s ease-in-out;    
    background: url(${diceImg3}) no-repeat center;
    background-size: 10vmin 10vmin;
  }

  &.dice-4 {
    @keyframes leaves-4 {
      0% {
          transform: scale(0);
      }
      100% {
          transform: scale(1);
      }
    }
    animation: leaves-4 2.5s ease-in-out;  
    background: url(${diceImg4}) no-repeat center;
    background-size: 10vmin 10vmin;
  }
`;


const UserVideoComponentContainer = styled.div`
  width: 11vmin;
  height: 11vmin;
  cursor: pointer;
  position: absolute;
  border: 3px solid white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  &.pos0 {
    top: 80vh;
    left: 8.5vw;
    @keyframes moveToRight-0 {
      0% {
        transform: translateX(-10vw);
      }
      100% {
        transform: translateX(0vw);
      }
    }
    animation: moveToRight-0 2s ease;
  }

  &.pos1 {
    top: 85vh;
    left: 23vw;
    @keyframes moveToRight-1 {
      0% {
        transform: translateX(-10vw);
      }
      100% {
        transform: translateX(0vw);
      }
    }
    animation: moveToRight-1 2s ease;
  }

  &.pos2 {
    top: 85vh;
    left: 33vw;
    @keyframes moveToRight-2 {
      0% {
        transform: translateX(-10vw);
      }
      100% {
        transform: translateX(0vw);
      }
    }
    animation: moveToRight-2 2s ease;
  }

  &.pos3 {
    top: 85vh;
    left: 45vw;
    @keyframes moveToRight-3 {
      0% {
        transform: translateX(-10vw);
      }
      100% {
        transform: translateX(0vw);
      }
    }
    animation: moveToRight-3 2s ease;
  }

  &.pos4 {
    top: 85vh;
    left: 55vw;
    @keyframes moveToRight-4 {
      0% {
        transform: translateX(-10vw);
      }
      100% {
        transform: translateX(0vw);
      }
    }
    animation: moveToRight-4 2s ease;
  }

  &.pos5 {
    top: 85vh;
    left: 65vw;
    @keyframes moveToRight-5 {
      0% {
        transform: translateX(-10vw);
      }
      100% {
        transform: translateX(0vw);
      }
    }
    animation: moveToRight-5 2s ease;
  }

  &.pos6 {
    top: 85vh;
    left: 77vw;
    @keyframes moveToRight-6 {
      0% {
        transform: translateX(-10vw);
      }
      100% {
        transform: translateX(0);
      }
    }
    animation: moveToRight-6 2s ease;
  }

  &.pos7 {
    top: 68vh;
    left: 81vw;
    @keyframes moveToRight-7 {
      0% {
        transform: translate(-4vw, 10vh);
      }
      100% {
        transform: translate(0, 0);
      }
    }
    animation: moveToRight-7 2s ease;
  }

  &.pos8 {
    top: 50vh;
    left: 85vw;
    @keyframes moveToRight-8 {
      0% {
        transform: translate(-4vw, 10vh);
      }
      100% {
        transform: translate(0, 0);
      }
    }
    animation: moveToRight-8 2s ease;
  }

  &.pos9 {
    top: 23vh;
    left: 86vw;
    @keyframes moveToRight-9 {
      0% {
        transform: translate(-4vw, 10vh);
      }
      100% {
        transform: translate(0, 0);
      }
    }
    animation: moveToRight-9 2s ease;
  }

  &.pos10 {
    top: 3vh;
    left: 81vw;
    @keyframes moveToRight-10 {
      0% {
        transform: translate(4vw, 10vh);
      }
      100% {
        transform: translate(0, 0);
      }
    }
    animation: moveToRight-10 2s ease;
  }

  &.pos11 {
    top: 4vh;
    left: 71vw;
    @keyframes moveToRight-11 {
      0% {
        transform: translateX(10vw);
      }
      100% {
        transform: translateX(0);
      }
    }
    animation: moveToRight-11 2s ease;
  }

  &.pos12 {
    top: 3.5vh;
    left: 60vw;
    @keyframes moveToRight-12 {
      0% {
        transform: translateX(10vw);
      }
      100% {
        transform: translateX(0);
      }
    }
    animation: moveToRight-12 2s ease;
  }

  &.pos13 {
    top: 2.5vh;
    left: 48vw;
    @keyframes moveToRight-13 {
      0% {
        transform: translateX(10vw);
      }
      100% {
        transform: translateX(0);
      }
    }
    animation: moveToRight-13 2s ease;
  }

  &.pos14 {
    top: 3vh;
    left: 35.5vw;
    @keyframes moveToRight-14 {
      0% {
        transform: translateX(10vw);
      }
      100% {
        transform: translateX(0);
      }
    }
    animation: moveToRight-14 2s ease;
  }

  &.pos15 {
    top: 3vh;
    left: 22vw;
    @keyframes moveToRight-15 {
      0% {
        transform: translateX(10vw);
      }
      100% {
        transform: translateX(0);
      }
    }
    animation: moveToRight-15 2s ease;
  }

  &.pos16 {
    top: 16vh;
    left: 17vw;
    @keyframes moveToRight-16 {
      0% {
        transform: translate(5vw, -5vh);
      }
      100% {
        transform: translate(0);
      }
    }
    animation: moveToRight-16 2s ease;
  }

  &.pos17 {
    top: 30vh;
    left: 13vw;
    @keyframes moveToRight-17 {
      0% {
        transform: translate(5vw, -5vh);
      }
      100% {
        transform: translate(0);
      }
    }
    animation: moveToRight-17 2s ease;
  }

  &.pos18 {
    top: 40vh;
    left: 16vw;
    @keyframes moveToRight-18 {
      0% {
        transform: translate(-5vw, -5vh);
      }
      100% {
        transform: translate(0);
      }
    }
    animation: moveToRight-18 2s ease;
  }

  &.pos19 {
    top: 50vh;
    left: 14vw;
    @keyframes moveToRight-19 {
      0% {
        transform: translate(3vw, -5vh);
      }
      100% {
        transform: translate(0);
      }
    }
    animation: moveToRight-19 2s ease;
  }
  &.testPos {
    margin-left: 2vw;
  }
`;

const OpenViduSession = ({
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
  setMinigameType,
  whatDiceNum,
  setWhatDiceNum
}) => {
  // const [posNum, setPosNum] = useState(1);
  // 게임 진행 관련 변수들
  // console.warn("퍼블리셔는?",publisher);
  const playerNum = players.length; // 몇 명에서 하는지
  const myTurnNum = players.indexOf(myUserNameValue);
  const [backSoundPlay, setBackSoundPlay] = useState(false);
  const [top2Players, setTop2Players] = useState([]);
  const [showDiceToggle, setShowDiceToggle] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setBackSoundPlay(true);
    }, 8500);
  }, []);

  useEffect(() => {    
    if (whatDiceNum===0) {
      return
    }
    setShowDiceToggle(true);
    setTimeout(() => {
      setShowDiceToggle(false);
      setWhatDiceNum(0);
    }, 4500);
  }, [whatDiceNum]);

  useEffect(() => {
    if (nextPlayer === myUserNameValue) {
      playSound(myTurnSound);
      handleMainVideoStream(publisher);
    } else {
      const temp = subscribers.filter(
        (sub) =>
          JSON.parse(sub.stream.connection.data).clientData === nextPlayer,
      )[0];
      handleMainVideoStream(temp);
    }
  }, [nextPlayer]);

  useEffect(() => {
    if (posList.length === 0) {
      return;
    } else {
      let temp = [...posList];
      let tempArr = [];
      console.warn(temp);
      const first = Math.max.apply(null, temp);
      const firstIndex = temp.indexOf(first);
      temp[firstIndex] = 0;
      tempArr.push(players[firstIndex]);
      console.warn(temp);
      const secondMax = Math.max.apply(null, temp);
      const secondIndex = temp.indexOf(secondMax);
      tempArr.push(players[secondIndex]);
      setTop2Players([...tempArr]);
    }
  }, [posList]);

  function playSound(soundName) {
    var audio = new Audio(soundName);
    audio.play();
  }

  return (
    <OpenViduSessionBlock>
      <ReactAudioPlayer
        urlSound={gameStartSound}
        isLoop={false}
        isPlaying={!backSoundPlay}
        volumeNum={0.4}
      ></ReactAudioPlayer>
      <ReactAudioPlayer
        urlSound={gameBgmSound}
        isLoop={true}
        isPlaying={backSoundPlay}
        volumeNum={0.15}
      ></ReactAudioPlayer>
      <TestContainer>
        <PlayerList>
          <PlayerRankingTitle>순위</PlayerRankingTitle>
          {top2Players.length === 0 ? (
            ''
          ) : (
            <>
              <PlayerRankingTag>1등: {top2Players[0]}</PlayerRankingTag>
              <PlayerRankingTag>2등: {top2Players[1]}</PlayerRankingTag>
            </>
          )}
          {/* <p>내 턴번호: {myTurnNum}</p>
          <p>포지션리스트: {posList}</p>
          <p>플레이어 리스트</p>
          <p>사람수: {playerNum}</p>
          <p>누구턴: {turnNum}</p>
          <p>니이름: {myUserNameValue}</p>
          <p>누구냐:{players}</p> */}
          {/* {players.map((playerName, i) => (
            <p key={i}>
              {i}번쨰: {playerName}
            </p>
          ))} */}
        </PlayerList>
        {/* {subscribers.map((sub, i) => (
          <p key={i}>{sub.stream.connection.data} {i}번쨰 유저</p>
        ))} */}
        {/* <p>{publisher.stream.connection.data}</p> */}
      </TestContainer>
      <OpenViduSessionHeader>
        {/* <p>{mySessionIdValue}번 방</p> */}
        {/* <OpenViduSessionLeaveBtn
          onClick={() => {
            leaveSession();
          }}
          value="Leave session"
        >
          Leave session
        </OpenViduSessionLeaveBtn> */}
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
      {/* 비디오 컨테이너 */}
      {/* <VideoContainer> */}
      {publisher !== undefined ? (
        <UserVideoComponentContainer className={`pos${posList[myTurnNum]}`}>
          {/* onClick={() => handleMainVideoStream(publisher)} */}
          <UserVideoComponent
            streamManager={publisher}
            mainStreamer={'publisher'}
            status={'gaming'}
          />
        </UserVideoComponentContainer>
      ) : null}
      {subscribers.map((sub, i) => (
        <UserVideoComponentContainer
          className={`pos${
            posList[
              players.indexOf(JSON.parse(sub.stream.connection.data).clientData)
            ]
          }`}
          key={i}
        >
          {/* onClick={() => handleMainVideoStream(sub) */}
          <UserVideoComponent
            streamManager={sub}
            mainStreamer={'sub'}
            status={'gaming'}
          />
        </UserVideoComponentContainer>
      ))}
      {/* </VideoContainer> */}
      {/* 주사위 */}
      {/* 턴 일 때만 보임 */}
      {!isRoll & (myTurnNum === turnNum) ? (
        <DiceRoller
          players={players}
          isRoll={isRoll}
          posList={posList}
          playerNum={playerNum}
          myTurnNum={myTurnNum}
          mySessionIdValue={mySessionIdValue}
        ></DiceRoller>
      ) : (
        ''
      )}
      {showDiceToggle ? (
        <ShowDiceModal className={`dice-${whatDiceNum}`}>
        </ShowDiceModal>
      ) : (
        ''
      )}
    </OpenViduSessionBlock>
  );
};

export default OpenViduSession;
