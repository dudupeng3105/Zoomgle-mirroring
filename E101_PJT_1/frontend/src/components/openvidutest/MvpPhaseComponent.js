import React, { useEffect } from 'react';
import styled from "styled-components";
import UserVideoComponent from './UserVideoComponent';
import MainUserVideoComponent from './MainUserVideoComponent'; // 미니게임 중앙화면용
import { useDispatch } from 'react-redux';
import { gameRoomActions } from '../../store/gameRoom-slice';
import { useSelector } from 'react-redux';

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
  left: 45vw;
  top: 21vh;
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
  width: 40vw;
  height: 50vh;
  position: absolute;
  top: 25vh;
  left: 30vw;
  width: 40vw;
  height: 40vh;
  display: flex;
  flex-wrap: wrap;
`;

const PictureImgBox = styled.div`
  width: 13vw;
  height: 24vh;
  background: ${props => `url(${props.backImg}) no-repeat center`};  
  background-size: 13vw 24vh;
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

const MvpPhaseComponent = ({
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
  // const [posNum, setPosNum] = useState(1);
  // 게임 진행 관련 변수들
  // console.warn("퍼블리셔는?",publisher);
  const playerNum = players.length; // 몇 명에서 하는지  
  const myTurnNum = players.indexOf(myUserNameValue);
  const dispatch = useDispatch();
  const pictureList = useSelector((state) => state.gameRoom.gameTotalPicture);

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
  

  return (
    <MvpPhaseComponentBlock>      
      {mainStreamManager !== undefined ? (
        isMvpSpeechDone ? (
          <PictureSelectBoard>
            {pictureList.map((picture, idx) => (
              <PictureImgBox key={`gameimage${idx}`} backImg={picture.photo_Url}></PictureImgBox>
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
      {nextPlayer===myUserNameValue ? <MvpSpeechSkipBtn onClick={() => onClickNextPhase()}>소감종료</MvpSpeechSkipBtn> : ''}
    </MvpPhaseComponentBlock>
  );
};

export default MvpPhaseComponent;