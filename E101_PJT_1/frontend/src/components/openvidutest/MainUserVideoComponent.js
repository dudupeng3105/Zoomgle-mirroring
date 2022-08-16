import React from 'react';
import OpenViduVideoComponent from './OvVideo';
import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { minigameList } from './minigameList';
import html2canvas from 'html2canvas';
import { useDispatch } from 'react-redux';
import { gameRoomActions } from '../../store/gameRoom-slice';
import cameraBtn from '../../media/images/cameraBtn.png';
import mainStreamerBorderStone from '../../media/images/mainStreamerBorderStone.png';
import mvpRibbon from '../../media/images/mvpRibbon.png';
import nameStone from '../../media/images/nameStone.png';
import timeStone from '../../media/images/timeStone.png';

const StreamComponent = styled.div`
  width: 55vw;
  height: 58vh;
  display: flex;
  flex-direction: column;
  color: white;
  align-items: center;
  /* border: 1px solid white; */
  & p {
    margin: 0;
    margin-top: 2rem;
    font-size: 3rem;
    color: white;
  }
`;

const MinigameInfo = styled.div`
  position: absolute;  
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;  
  background-color: transparent;
  top: 15vh;
  width: 32vw;
  height: 60vh;
  color: #4adede;
  font-size: 2rem;
  & p {
    color: #1e2f97;
    margin: 0;
  }
`;
const AgreeDisagreeBtnContainer = styled.div`  
  position: absolute;
  z-index: 15;
  top: 45vh;
  left: 12vw;  
  width: 30vw;
  height: 8vh;
  display: flex;
  justify-content: center;
  background-color: yellow;
  border: 1px solid blue;
  /* z-index: 20; */
`;

const MinigameBtn = styled.div`
  cursor: pointer;  
  width: 15vw;
  height: 10vh;
  background: url(${timeStone});
  text-align: center;
  font-size: 3rem;
  color: black;
`;

// const MinigameBtnRight = styled.div`
//   cursor: pointer;  
//   width: 15vw;
//   height: 10vh;
//   text-align: center;
//   background-color: #f90473;
//   font-size: 3rem;
//   color: black;
// `;

const VoteResultBoard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: yellow;
  color: black;
  width: 30vw;
  height: 30vh;
`;

const CaptureBtn = styled.div`
  position: fixed;
  z-index: 12;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 20vw;
  top: 68vh;
  width: 8vw;
  height: 10vh;
  background: url(${cameraBtn});
  background-size: 8vw 10vh;
  /* background-color: #4E5180; */
  cursor: pointer;
  font-size: 4vmin;
  text-align: center;
  &:hover {
    transform: rotate(-10deg);
  }
  :active {
    transform: rotate(10deg);
  }
`;

const TurnInfoBox = styled.div`  
  position: absolute;
  width: 20vw;
  height: 10vh;
  top: 51vh;
  left: 18vw;
  padding-top: 0.5vh;
  z-index: 11;
  display: flex;
  background: url(${nameStone});
  /* border: 1px solid blue; */
  background-size: 20vw 10vh;
  justify-content: center;
  align-items: center;  
  color: white;
  font-size: 6vmin;
`;

const MvpInfoBox = styled.div`
  position: absolute;
  top: 54.5vh;
  width: 56vw;
  left: -1.3vw;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 3rem;
  z-index: 10;
  &.bright {
    color: blue;
    /* border: 5px solid white; */
  }
  &.dark {
    color: yellow;
    /* border: 5px solid yellow; */
  }
`;

const MainBorderStone = styled.div`
  width: 55vw;
  height: 60vh;
  position: absolute;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(${mainStreamerBorderStone});
  background-size: 55vw 60vh;
`;

const ExplanationInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45vw;
  padding: 0 5vw;
  height: 40vh;
  background-color: #d0c28f; 
  color: brown;
  font-size: 6vmin;
`;

const MissionInfo = styled.div`
  display: flex;
  justify-content: center;
  padding: 5vh 0;
  width: 45vw;
  height: 40vh;
  background-color: transparent; 
  color: brown;
  font-size: 6vmin;
`;

const VoteInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5vh 0;
  width: 45vw;
  height: 40vh;
  background-color: #d0c28f; 
  color: brown;
  font-size: 6vmin;
`;

const MvpRibbon = styled.div`
  width: 60vw;
  height: 70vh;
  position: absolute;
  top: 4vh;
  left: -4vw;
  z-index: 10;
  background: url(${mvpRibbon});
  background-size: 60vw 70vh;
`;

const TimeInfoBox = styled.div`
  position: absolute;
  z-index: 15;
  left: 42vw;
  top: 17vh;
  width: 7vw;
  height: 7vh;
  background: url(${timeStone});
  background-size: 7vw 7vh;
  font-size: 7vmin;
  display: flex;
  justify-content: center;
  align-items: center;
  color: navy;
`

const CaptureAreaBox = styled.div`
  width: 45vw;
  top: 2vh;
  height: 44vh; 
  /* border: 1px solid red;   */
  display: flex;
  justify-content: center;
  display: relative;
  z-index: 5;
  /* border: 1px solid red; */ 

  &.mainStreamer {
    margin-top: 15vh;
  }

  &.mvpStreamer {
    margin-top: 9vh;
    margin-left: -4.5vh;
  }

  &.mainStreamer video {
    width: 45vw;
    height: 41vh;
    cursor: initial;
    z-index: 2;
    object-fit: fill;
    /* border-radius: 5%; */
  }

  &.mvpStreamer video {
    width: 20vw;
    height: 40vh;
    z-index: 2;
    cursor: initial;
    object-fit: fill;
    border-radius: 50%;
  }

  &.bright video {       
    border: 5px solid yellow;
  }

  &.dark video {    
    border: 5px solid blue;
  }
`;

const MainUserVideoComponent = ({
  isGameDone,
  streamManager,
  mainStreamer,
  isRoll,
  myTurnNum,
  playerNum,
  players,
  mySessionIdValue,
  turnNum,
  nextPlayer,
  isVote,
  setIsVote,
  vote,
  posList,
  minigameType,
  isMvpPhase,
}) => {
  const [timeLeft, setTimeLeft] = useState(undefined);
  const [explanationOver, setExplanationOver] = useState(false);
  const [timeOver, setTimeOver] = useState(false);
  const [beforeVoteOver, setBeforeVoteOver] = useState(false);
  const [voteOver, setVoteOver] = useState(false);
  const [checkResultOver, setCheckResultOver] = useState(false);
  const [voteSkip, setVoteSkip] = useState(false);
  const [voteResult, setVoteResult] = useState(false);
  const [minigameInfo, setMinigameInfo] = useState(['게임코멘트', 10, 0]);
  // MVP 효과용
  const [mvpEffect, setMvpEffect] = useState(null);

  // html2canvas용 useRef(돔조작하기위해서)
  const mainScreen = useRef();
  const dispatch = useDispatch();

  // html2canvas(dom element를 canvas로 바꾸어줌)
  const onCapture = async () => {
    console.log('사진찍습니다.');
    const roomSeq = mySessionIdValue;
    // dom to canvas
    const element = mainScreen.current;
    const canvas = await html2canvas(element); // html to canvas
    const dataUrl = canvas.toDataURL('image/png');
    console.log(dataUrl);
    const blobData = dataURItoBlob(dataUrl);
    // 날짜 만들기
    const now = new Date();
    const filename = `${roomSeq}-${now.getHours()}${now.getMinutes()}${now.getSeconds()}.jpeg`;
    // 파일 객체 마들기
    const tempFile = new File([blobData], filename, { type: 'image/jpeg' });

    // 폼데이터에 담아서 api 요청
    let picData = new FormData();
    picData.append('photo', tempFile);
    console.log(roomSeq);

    dispatch(gameRoomActions.takePictureStart({ picData, roomSeq }));
  };

  function dataURItoBlob(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
  }

  // 미니게임이 끝난 걸 가정하고 작성함
  const minigameEndHandler = () => {
    const nextTurn = (myTurnNum + 1) % playerNum;
    const nextUserName = players[nextTurn];
    // go(1), back(-1)에 따라 자리조정
    let nextPosList = [...posList];
    if (voteResult === 1) {
      // go
      const myPos = posList[myTurnNum];
      nextPosList[myTurnNum] = myPos + 1;
    } else if (voteResult === -1) {
      // back
      const myPos = posList[myTurnNum];
      nextPosList[myTurnNum] = myPos - 1;
    }

    // emit
    const sendData = {
      session: mySessionIdValue,
      to: [], // all user
      data: JSON.stringify({
        // 미니게임이 끝나면 다음사람과, 다음턴, isRoll 다시 false처리
        // 투표는 조금 있다 넣을 예정
        nextUserName: nextUserName, // 다음사람
        nextTurn: nextTurn, // 다음 턴
        nextIsRoll: !isRoll,
        nextPosList: [...nextPosList],
      }),
      type: 'MINIGAME_STATE_CHANGED',
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
  };

  const calculateTimeLeft = () => {
    if (timeLeft > 0) {
      if (voteSkip) {
        setVoteOver(true);
        setVoteSkip(false);
        return 5; // 결과확인타임
      }
      return timeLeft - 1;
    } else {
      // console.warn("현재남은시간", timeLeft);
      if (!explanationOver) {
        setExplanationOver(true); // 설명 끝
        return minigameInfo[1]; // 미션타임
      } else if (!timeOver) {
        setTimeOver(true); // 미션 끝
        setVoteResult(undefined);
        return 5; // 투표 전 타임
      } else if (!beforeVoteOver) {
        setBeforeVoteOver(true); // 투표 전 타임 끝
        // setVoteResult(undefined);
        return 20; // 투표 타임
      } else if (!voteOver) {
        setVoteOver(true);
        setVoteSkip(false);
        return 5; // 결과 확인 타임
      } else if (!checkResultOver) {
        setCheckResultOver(true);
        // 결과확인 후
        // 시그날 emit
        if (turnNum === myTurnNum) {
          minigameEndHandler();
        }
      }
    }
  };

  // 카운트 다운 작성
  useEffect(() => {
    if (!isRoll) {
      return;
    }
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  }, [timeLeft]);

  // vote 새로 받을 때마다 업데이트
  useEffect(() => {
    // 전체 투표 판단
    const goNum = vote.filter((thisVote) => thisVote[1] === 1).length;
    const backNum = vote.filter((thisVote) => thisVote[1] === -1).length;
    // const agreeNum = vote.filter((thisVote) => thisVote[1] === true).length;
    if (goNum > parseInt((playerNum - 1) / 2)) {
      // go한 사람이 전체 참여자의 과반수일 때
      setVoteResult(1);
    } else if (backNum > parseInt((playerNum - 1) / 2)) {
      // back한 사람이 전체 참여자의 과반수일 때
      setVoteResult(-1);
    } else {
      // 그 외 모든 경우
      setVoteResult(0);
    }

    // 투표가 다 끝났는지 판단
    if (vote.length === playerNum - 1) {
      setVoteSkip(true);
    }
  }, [vote]);

  // 미니게임 정보(어떤 미니게임인지)
  useEffect(() => {
    if (minigameType === undefined) {
      return;
    }
    const temp = minigameList[minigameType];
    setMinigameInfo([...temp]);
  }, [minigameType]);

  const voteHandler = (voteSelect) => {
    const nextVote = [players[myTurnNum], voteSelect];
    console.warn(nextVote);
    // 투표 진행 동기화 emit
    const sendData = {
      session: mySessionIdValue,
      to: [], // all user
      data: JSON.stringify({
        // vote 동기화
        nextVote: nextVote,
      }),
      type: 'VOTE_STATE_CHANGED',
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
    setIsVote(true); // 투표 버튼 삭제시킴
  };

  // 미니게임 시작마다(isRoll이 true) 다시 초 세팅
  useEffect(() => {
    if (isRoll) {
      setExplanationOver(false);
      setTimeOver(false);
      setVoteOver(false);
      setCheckResultOver(false);
      setTimeLeft(5); // 문제설명타임
      setIsVote(false);
      setBeforeVoteOver(false);
    } else {
      return;
    }
  }, [isRoll]);

  useEffect(() => {
    let i = 0;
    while (i < 10) {
      if (i % 2) {
        setTimeout(() => {
          setMvpEffect('bright');
        }, (i + 1) * 300);
      } else {
        setTimeout(() => {
          setMvpEffect('dark');
        }, (i + 1) * 300);
      }
      i++;
    }
    setMvpEffect('');
  }, [isGameDone]);

  return (
    <>
      {streamManager !== undefined ? (
        <>
          <StreamComponent>
            {timeOver &
            !voteOver &
            !beforeVoteOver &
            !isVote &
            (myTurnNum !== turnNum) ? (
              <AgreeDisagreeBtnContainer>
                {/* <p>투표 수: {vote.length}</p> */}
                <MinigameBtn onClick={() => voteHandler(1)}>go</MinigameBtn>
                <MinigameBtn onClick={() => voteHandler(0)}>stay</MinigameBtn>
                <MinigameBtn onClick={() => voteHandler(-1)}>
                  back
                </MinigameBtn>
              </AgreeDisagreeBtnContainer>
            ) : (
              ''
            )}
            {isMvpPhase ? <MvpRibbon /> : <MainBorderStone></MainBorderStone>}
            {/* {isRoll ? <MissonInfo></MissonInfo> : ''} */}
            <CaptureAreaBox
              className={`${mainStreamer} ${mvpEffect}`}
              ref={mainScreen}
            >
              {!isMvpPhase ? <TimeInfoBox>{timeLeft}</TimeInfoBox> : ''}
              {isRoll ? (
                <MinigameInfo>
                  {explanationOver ? (
                    ''
                  ) : (
                    <ExplanationInfo>{minigameInfo[3]}</ExplanationInfo>
                  )}

                  {/* 그려서 맞히기의 경우 현재 턴인 사람에게만 띄움 */}
                  {explanationOver & !timeOver ? (
                    !minigameInfo[2] ? (
                      turnNum === myTurnNum ? (
                        <MissionInfo>{minigameInfo[0]}</MissionInfo>
                      ) : (
                        ''
                      )
                    ) : (
                      <MissionInfo>{minigameInfo[0]}</MissionInfo>
                    )
                  ) : (
                    ''
                  )}
                  {timeOver & !beforeVoteOver ? (
                    <VoteInfoBox>
                      <p>{nextPlayer}의 운명을 결정지을 투표가 시작된다.</p>
                      {!minigameInfo[2] ? (
                        <p>정답은?&nbsp;{minigameInfo[0]}이다.</p>
                      ) : (
                        ''
                      )}
                      <p>그는 지령을 잘 수행하였는가?</p>
                    </VoteInfoBox>
                  ) : (
                    ''
                  )}
                  {voteOver & !checkResultOver ? (
                    <>
                      {/* <MinigameBtn onClick={() => onClickHandler()}>
                      (결과확인타임)다음턴으로 넘어가기
                    </MinigameBtn> */}
                      <VoteResultBoard>
                        <p>
                          최종결과:{' '}
                          {voteResult === 1
                            ? 'go'
                            : voteResult === -1
                              ? 'back'
                              : 'stay'}
                        </p>
                        {vote.map((thisVote, idx) => (
                          <p key={`vote${idx}`}>
                            {thisVote[0]}의 선택:{' '}
                            {thisVote[1] === 1
                              ? 'go'
                              : thisVote[1] === -1
                                ? 'back'
                                : 'stay'}
                          </p>
                        ))}
                      </VoteResultBoard>
                    </>
                  ) : (
                    ''
                  )}
                </MinigameInfo>
              ) : (
                ''
              )}
              <OpenViduVideoComponent streamManager={streamManager} />
            </CaptureAreaBox>
          </StreamComponent>
          {isGameDone ? (
            <MvpInfoBox className={mvpEffect}>{nextPlayer}!!</MvpInfoBox>
          ) : (
            <TurnInfoBox>{nextPlayer}</TurnInfoBox>
          )}
          <CaptureBtn onClick={() => onCapture()}></CaptureBtn>
        </>
      ) : null}
    </>
  );
};

export default MainUserVideoComponent;

// 시나리오 : 미니게임이 시작하면 카운트가 시작됨
// 시간이 5초 이하로 남으면 빨간색 글자
// 카운트가 끝나면 --> 다음턴으로 가기 버튼이 나옴
// useEffect는 timeLeft가 바뀔때만 작동하므로 0이되서 더 이상
// 바뀌지 않으면 작동하지 않음

// 5초 동안 설명타임(처음 미니게임 진입시(isRoll=true됐을때), setLeftTime 5초)
// 처음에 set할때, explanationOver = false, timeOver = false
// 5초 끝나면 explanationOver = true로 토글
// 이게 토글되면 setLeftTime 15초로 set
// 15초가 끝나면 timeOver = True로 토글
// 그리고 setLeftTime 60초 토글
// 투표 버튼이 나타남(찬, 반)
// 투표가 시간 안에 끝났으면..
// 마지막에 투표하는 사람쪽에서 voteOver를 시켜서 (60초 바로 끝내버림)
// 그리고 시그널(emit)함(투표결과도 계산해서 보냄)
// 투표가 시간 안에 끝나지 않았으면
// voteOver시키고 투표결과 계산해서 보냄
// voteOver가되면 10초간 결과확인하고 checkResultOver = true로 셋
// checkResultOver = true 셋되면 그 때 다음턴으로 넘어갈 수 있도록 함
