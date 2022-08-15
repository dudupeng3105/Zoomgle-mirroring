import React from 'react';
import OpenViduVideoComponent from './OvVideo';
import { useState, useEffect, useRef  } from 'react';
import styled from 'styled-components';
import { minigameList } from './minigameList';
import html2canvas from 'html2canvas';
import { useDispatch } from 'react-redux';
import { gameRoomActions } from '../../store/gameRoom-slice';
import cameraBtn from '../../media/images/cameraBtn.PNG'
import mainStreamerBorderStone from '../../media/images/mainStreamerBorderStone.png'
import mvpRibbon from '../../media/images/mvpRibbon.png'

const StreamComponent = styled.div`
  width: 55vw;
  height: 55vh;
  display: flex;
  flex-direction: column;
  color: white;
  align-items: center;  

  & p {
    margin: 0;
    margin-top: 2rem;
    font-size: 3rem;
    color: white;
  }

  &.mainStreamer video {    
    width: 37vw;
    height: 41vh;
    margin-top: 15vh;        
    cursor: initial;
    object-fit: fill;    
    border-radius: 5%;
    /* border: 2px yellow solid;             */
  }

  &.mvpStreamer video {    
    position: absolute;
    top: -2vh;
    left: 14.8vw;
    width: 46.5vmin;
    height: 40vmin;
    margin-top: 10vh;        
    cursor: initial;
    object-fit: fill;    
    border-radius: 50%;
    /* border: 2px yellow solid;             */
  }
`;

const MinigameInfo = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 7;
  background-color: transparent;
  top: 21vh;
  width: 32vw;
  height: 20vh;
  color: #4adede;
  font-size: 2rem;
  & p {
    color: #1e2f97;
    margin: 0;
  }
`;
const AgreeDisagreeBtnContainer = styled.div`
  width: 30vw;
  height: 10vh;
  display: felx;
`;

const MinigameBtn = styled.div`
  cursor: pointer;
  /* z-index: 10; */
  width: 15vw;
  height: 10vh;
  background-color: #2efb00;
  text-align: center;
  font-size: 3rem;
  color: black;
`;

const MinigameBtnRight = styled.div`
  cursor: pointer;
  /* z-index: 10; */
  width: 15vw;
  height: 10vh;
  text-align: center;
  background-color: #f90473;
  font-size: 3rem;
  color: black;
`;

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
  display: flex;
  justify-content: center;
  align-items: center;
  right: 2vw;
  top: 1vh;
  width: 8vw;
  height: 15vh;
  background: url(${cameraBtn});
  background-size: 8vw 15vh;
  /* background-color: #4E5180; */
  cursor: pointer;
  font-size: 4vmin;
  text-align: center;
  &:hover {
    transform: rotate(-10deg);
  }
`;

const TurnInfoBox = styled.div`
  position: absolute;
  top: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 56vw;
  color: white;
  font-size: 3rem;  
`

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
  z-index: 5;
  &.bright {
    color: blue;
    /* border: 5px solid white; */
  }
  &.dark {
    color: yellow;
    /* border: 5px solid yellow; */
  }
`

const MainBorderStone = styled.div`
  width: 55vw;
  height: 60vh;
  position: absolute;
  z-index: 5;
  background: url(${mainStreamerBorderStone});
  background-size: 55vw 60vh;
`

const MvpRibbon = styled.div`
  width: 60vw;
  height: 70vh;
  position: absolute;
  top: 4vh;
  left: -4vw;
  z-index: 5;
  background: url(${mvpRibbon});
  background-size: 60vw 70vh;
`

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
  const onCapture = async() => {
    console.log('사진찍습니다.');
    const roomSeq = mySessionIdValue;
    // dom to canvas
    const element = mainScreen.current;
    const canvas = await html2canvas(element); // html to canvas
    const dataUrl = canvas.toDataURL("image/png");
    console.log(dataUrl);
    const blobData = dataURItoBlob(dataUrl);  
    // 날짜 만들기
    const now = new Date();
    const filename =  `${roomSeq}-${now.getHours()}${now.getMinutes()}${now.getSeconds()}.jpeg`
    // 파일 객체 마들기
    const tempFile = new File([blobData], filename, {type: "image/jpeg"});     

    // 폼데이터에 담아서 api 요청    
    let picData = new FormData();
    picData.append("photo", tempFile);  
    console.log(roomSeq);    

    dispatch(gameRoomActions.takePictureStart({picData, roomSeq}));       
  }
  

  function dataURItoBlob(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
  };

  // 미니게임이 끝난 걸 가정하고 작성함
  const minigameEndHandler = () => {
    const nextTurn = (myTurnNum + 1) % playerNum;
    const nextUserName = players[nextTurn];
    // 성공, 실패(-1)에 따라 자리조정
    let nextPosList = [...posList];
    if (!voteResult) {
      const myPos = posList[myTurnNum];
      nextPosList[myTurnNum] = myPos - 1; // -1
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
        return 7; // 투표 타임
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
    // 성공, 실패 판단
    const agreeNum = vote.filter((thisVote) => thisVote[1] === true).length;
    if (agreeNum >= parseInt(vote.length / 2)) {
      setVoteResult(true);
    } else {
      setVoteResult(false);
    }

    // 투표가 다 끝났는지 판단
    if (vote.length === playerNum) {
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
    const nextVote = [...vote, [players[myTurnNum], voteSelect]];
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
    setIsVote(true); // 찬/반 버튼 삭제시킴
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
    } else {
      return;
    }
  }, [isRoll]);

  useEffect(() => {
    if (isRoll) {
      setExplanationOver(false);
      setTimeOver(false);
      setVoteOver(false);
      setCheckResultOver(false);
      setTimeLeft(5); // 문제설명타임
      setIsVote(false);
    } else {
      return;
    }
  }, [isRoll]);

  useEffect(() => {
    let i = 0
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
  }, [isGameDone]);

  

  return (
    <div>
      {streamManager !== undefined ? (
        <>          
          <StreamComponent className={mainStreamer} ref={mainScreen}>
            {isMvpPhase ? <MvpRibbon /> : <MainBorderStone></MainBorderStone>}
            {isRoll ? (
              <MinigameInfo>
                <p>남은 시간 : {timeLeft}</p>
                {explanationOver ? '' : <p>{minigameInfo[3]}</p>}

                {/* 그려서 맞히기의 경우 현재 턴인 사람에게만 띄움 */}

                {explanationOver & !timeOver ? (
                  !minigameInfo[2] ? (
                    turnNum === myTurnNum ? (
                      <p>{minigameInfo[0]}</p>
                    ) : (
                      ''
                    )
                  ) : (
                    <p>{minigameInfo[0]}</p>
                  )
                ) : (
                  ''
                )}
                {timeOver & !voteOver ? (
                  <>
                    <p>투표시간입니다</p>
                    <p>투표 수: {vote.length}</p>
                    {!minigameInfo[2] ? (
                      <p>뭘 그리는 거 였을까요?{minigameInfo[0]}</p>
                    ) : (
                      ''
                    )}
                    {!isVote ? (
                      <AgreeDisagreeBtnContainer>
                        <MinigameBtn onClick={() => voteHandler(true)}>
                          찬성
                        </MinigameBtn>
                        <MinigameBtnRight onClick={() => voteHandler(false)}>
                          반대
                        </MinigameBtnRight>
                      </AgreeDisagreeBtnContainer>
                    ) : (
                      ''
                    )}
                  </>
                ) : (
                  ''
                )}
                {voteOver & !checkResultOver ? (
                  <>
                    {/* <MinigameBtn onClick={() => onClickHandler()}>
                      (결과확인타임)다음턴으로 넘어가기
                    </MinigameBtn> */}
                    <VoteResultBoard>
                      <p>최종결과: {voteResult ? '성공' : '실패!!!'}</p>
                      {vote.map((thisVote, idx) => (
                        <p key={`vote${idx}`}>
                          {thisVote[0]}의 선택: {thisVote[1] ? '통과' : '실패'}
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
          </StreamComponent>
          {isGameDone ? (
            <MvpInfoBox className={mvpEffect}>{nextPlayer}!!</MvpInfoBox>
          ) : (
            <TurnInfoBox>{nextPlayer}씨 당신차례입니다.</TurnInfoBox>
          )}
          <CaptureBtn onClick={() => onCapture()}></CaptureBtn>
        </>
      ) : null}
    </div>
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
