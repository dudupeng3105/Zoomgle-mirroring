import React, { useEffect } from 'react';
import styled from "styled-components";
import UserVideoComponent from './UserVideoComponent';
import MainUserVideoComponent from './MainUserVideoComponent'; // 미니게임 중앙화면용
import { useDispatch } from 'react-redux';
import { gameRoomActions } from '../../store/gameRoom-slice';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from '../../../node_modules/react-router-dom/index';
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
  top: 20vh;
  left: 30vw;
  width: 40vw;
  height: 40vh;
  & video {
    cursor: initial;
  }
`;

const MvpSpeechSkipBtn = styled.div`
  cursor: pointer;
  position: absolute;
  left: 47vw;
  top: 15vh;
  display: flex;
  justify-content: center;
  width: 10vw;
  height: 5vh;
  align-items: center;
  background-color: #4E5180;
  color: white;
  border-radius: 5px;
  border: 2px solid white;  
  font-size: 3vmin;
  text-align: center;
  &:hover {
    background-color: white;
    border: 2px solid #4E5180;
    color: #4E5180;
  }
`

const PictureSelectBoard = styled.div`  
  position: absolute;
  display: flex;
  top: 17vh;
  left: 25vw;
  width: 54vw;
  height: 60vh;
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
  justify-content: center;
  background-color: #c9a959;
  border: 2px solid black;
  border-radius: 5px;
  padding-bottom: 5vh;  
`;

const PictureContainer = styled.div`
  /* display: flex; */
  width: 15vw;
  height: 17vh;
  margin: 1vh 1vw;
  border-radius: 5px;  
  :active {
    transform: scale(0.95);
  }    
`;

const PictureCountDisplay = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2vw;
  height: 3vh;
  left: 1vw;
  top: 4vh;
  font-size: 3vmin;
  color: black;
  border-radius: 50%;
  background-color: white;
`

const PictureImgBox = styled.div`
  width: 15vw;  
  height: 17vh;
  background: ${props => `url(${props.backImg}) no-repeat center`};  
  background-size: 15vw 17vh; 
  border: 3px solid #adff45;
  border-radius: 5px;
  &.vote-color-1 { 
    border: 3px solid red;
  }
  &.vote-color-2 {
    border: 3px solid yellow;
  }
  &.vote-color-3 {
    border: 3px solid pink;
  }
  &.vote-color-4 {
    border: 3px solid purple;
  }
  &.vote-color-5 {
    border: 3px solid blue;
  }
  &.vote-color-6 {
    border: 3px solid green;
  }     
`

const MvpShowUsersContainer = styled.div`
  width: 25vw;
  height: 25vh;
  cursor: pointer;
  position: absolute;
  &.pos0 {
    top: 10vh;
    left: 0vw;
  }

  &.pos1 {
    top: 40vh;
    left: 0vw;
  }

  &.pos2 {
    top: 70vh;
    left: 0vw;
  }

  &.pos3 {
    top: 10vh;
    right: 0vw;
  }

  &.pos4 {
    top: 40vh;
    right: 0vw;
  }

  &.pos5 {
    top: 70vh;
    right: 0vw;
  }
`

const GameOverLoading = styled.div`  
  position: absolute;
  display: flex;
  top: 17vh;
  left: 25vw;
  width: 54vw;
  height: 60vh;  
  background-color: grey;
  border: 2px solid black;
  border-radius: 5px;
  padding-bottom: 5vh;
`;

const MvpPhaseComponent = ({
  isGameOver,
  sessionHost,
  pictureVote,
  isMvpSpeechDone,
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
  const navigate = useNavigate();
  // const [posNum, setPosNum] = useState(1);
  // 게임 진행 관련 변수들
  // console.warn("퍼블리셔는?",publisher);
  const playerNum = players.length; // 몇 명에서 하는지  
  const myTurnNum = players.indexOf(myUserNameValue);
  const dispatch = useDispatch();
  const pictureList = useSelector((state) => state.gameRoom.gameTotalPicture);  
  const [timeLeft, setTimeLeft] = useState(10);

  const calculateTimeLeft = () => {
    console.log(timeLeft);
    if (timeLeft > 0) {    
      if (!isGameOver)  {
        return 5;
      }
      return timeLeft - 1;
    } else {            
      // timeLeft = 0
      // 나가고
      leaveSession()
      // 마이페이지로 이동
      navigate('/MyPage');
    }
  };

  useEffect(() => {
    if (nextPlayer === myUserNameValue){
      handleMainVideoStream(publisher)
    } else {
      const temp = subscribers.filter((sub) => JSON.parse(sub.stream.connection.data).clientData === nextPlayer)[0];
      handleMainVideoStream(temp);
    }

  }, [nextPlayer])

  useEffect(() => {
    if (isMvpSpeechDone) {
      dispatch(gameRoomActions.getPictureStart(mySessionIdValue));
    }
  }, [isMvpSpeechDone])

  // 카운트 다운 작성
  useEffect(() => {    
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  }, [timeLeft]);
  
  // 게임 종료 5초 로딩phase 시작
  useEffect(() => {
    if (isGameOver) {
      setTimeLeft(5); // 종료 로딩 타임
    } else {
      return;
    }    
  }, [isGameOver])

  const onClickNextPhase = () => {
    const sendData = {
      session: mySessionIdValue,
      to: [], // all user
      data: JSON.stringify({      
        nextIsMvpSpeechDone: true, // 이제 사진 고르러감        
      }),
      type: 'SPEECH_DONE',
    };
  
    fetch('https://i7e101.p.ssafy.io:4443/openvidu/api/signal', {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + btoa('OPENVIDUAPP:e101ssafy71'),
        'Content-type': 'application/json',
      },
      body: JSON.stringify(sendData),
    });    
  }
  
  const onClickPictureVote = (pictureIdx, pictureLength) => {
    
    let temp = []
    if (pictureVote.length === 0) {
      temp = new Array(pictureLength).fill(0);
      temp[pictureIdx] += 1;      
      console.error('템프(처음에)', temp);
    } else {
      temp = [...pictureVote];
      temp[pictureIdx] += 1;
      console.error('템프(이미있을때)', temp);
    }

    const sendData = {
      session: mySessionIdValue,
      to: [], // all user
      data: JSON.stringify({      
        nextPictureVote: temp, // 다음 vote 상황        
      }),
      type: 'PICTURE_VOTE',
    };
  
    fetch('https://i7e101.p.ssafy.io:4443/openvidu/api/signal', {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + btoa('OPENVIDUAPP:e101ssafy71'),
        'Content-type': 'application/json',
      },
      body: JSON.stringify(sendData),
    }); 
  }

  const onClickGameOver = () => {
    console.log(pictureVote);
    const pictureCountArr = pictureVote.map((picCnt, idx) => {
      return [picCnt, idx];
    })
    const sortedPicture = pictureCountArr.sort().reverse().slice(0, 6);
    const selectedPicture = sortedPicture.map((pic) => {
      return pictureList[pic[1]].photo_Url;
    })    
    const selectedPicInfo = {
      photoUrls: selectedPicture,
      roomSeq: mySessionIdValue,
    }
    const mvpName = nextPlayer;
    dispatch(gameRoomActions.postSelectedPicStart({selectedPicInfo, mvpName}));
    // 게임 종료 알림
    const sendData = {
      session: mySessionIdValue,
      to: [], // all user
      data: JSON.stringify({      
        nextIsGameOver: true, // 다음 vote 상황        
      }),
      type: 'GAME_OVER',
    };
  
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
    <MvpPhaseComponentBlock>
      {mainStreamManager !== undefined ? (
        isGameOver ? (
          <GameOverLoading>{timeLeft}</GameOverLoading>
        ) : isMvpSpeechDone ? (
          <PictureSelectBoard>
            {pictureList.map((picture, idx) => (
              <PictureContainer
                onClick={() => onClickPictureVote(idx, pictureList.length)}
              >
                <PictureCountDisplay>{pictureVote[idx]}</PictureCountDisplay>
                <PictureImgBox
                  className={`vote-color-${Math.floor(pictureVote[idx] / 5)}`}
                  key={`gameimage${idx}`}
                  backImg={picture.photo_Url}
                ></PictureImgBox>
              </PictureContainer>
            ))}
          </PictureSelectBoard>
        ) : (
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
        )
      ) : null}

      {publisher !== undefined ? (
        <MvpShowUsersContainer className={`pos${0}`}>
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
      {(nextPlayer === myUserNameValue) & !isMvpSpeechDone ? (
        <MvpSpeechSkipBtn onClick={() => onClickNextPhase()}>
          소감종료
        </MvpSpeechSkipBtn>
      ) : (
        ''
      )}
      {isMvpSpeechDone ? (
        <MvpSpeechSkipBtn onClick={() => onClickGameOver()}>
          사진선택 종료
        </MvpSpeechSkipBtn>
      ) : (
        ''
      )}
    </MvpPhaseComponentBlock>
  );
};

export default MvpPhaseComponent;