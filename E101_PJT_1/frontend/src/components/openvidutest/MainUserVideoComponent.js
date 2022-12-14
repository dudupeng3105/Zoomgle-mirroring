import React from 'react';
import OpenViduVideoComponent from './OvVideo';
import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { minigameList } from './minigameList';
import html2canvas from 'html2canvas';
import { useDispatch } from 'react-redux';
import { gameRoomActions } from '../../store/gameRoom-slice';
import cameraBtn from '../../media/images/cameraButton.png';
import mainStreamerBorderStone from '../../media/images/mainStreamerBorderStone.png';
import mvpRibbon from '../../media/images/mvpRibbon.png';
import nameStone from '../../media/images/nameStone.png';
import timeStone from '../../media/images/timeStone.png';
import mainStreamerVoteStone from '../../media/images/mainStreamerVoteStone.png';
import btnClickSound from '../../media/sounds/05_btn.wav';
import gameAlertSound from '../../media/sounds/12_gameAlert.wav';
import countDownSound from '../../media/sounds/13_countDown.wav';
import voteSuccessSound from '../../media/sounds/14_voteSuccess.wav';
import voteFailSound from '../../media/sounds/15_voteFail.wav';
import cameraSound from '../../media/sounds/18_cameraSound.mp3';

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
  top: 42vh;
  left: 8vw;  
  width: 40vw;
  height: 8vh;
  display: flex;
  justify-content: space-around;
  /* background-color: yellow; */
  /* border: 1px solid blue; */
  /* z-index: 20; */
`;

const MinigameBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 1vh;
  cursor: pointer;  
  width: 10vw;
  height: 10vh;
  background: url(${timeStone}) no-repeat center;
  background-size: 10vw 10vh;
  text-align: center;
  font-size: 3rem;
  color: ${(props) => (props.textColor)};
  :hover {
    transform: scale(1.05);
  }
  :active {
    transform: scale(0.95);
  }
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
  justify-content: center;
  width: 45vw;
  padding: 0 5vw;
  height: 40vh;
  background-color: #d0c28f; 
  color: brown;
  font-size: 6vmin;
`;

const VoteResultComment = styled.div`
  display: flex;
  width: 35vw;
  height: 7vh;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.textColor};
  font-size: 5vmin;
`

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

const VoteAnswer = styled.div`
  position: absolute;
  z-index: 12;
  top: 16vh;
  left: 7vw;  
  width: 25vw;
  /* border: 1px solid blue; */
  height: 12vh;
  display: flex;
  justify-content: start;
  align-items: center;
  color: white;
  font-size: 5vmin;
`

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
  margin-right: 1vw;
  &.vote-time {
    background: url(${mainStreamerVoteStone});
    background-size: 55vw 60vh;
  }
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
  padding: 10vh 5vw;
  width: 45vw;
  height: 40vh;
  background-color: #d0c28f; 
  color: brown;
  font-size: 4vmin;
  & p {
    font-size:5vmin;
  }
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

const  DestinyTimeText = styled.div`
  position: absolute;
  z-index: 10;
  top: 12vh;
  width: 12vw;
  height: 5vh;
  font-size: 4.5vmin;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #412e22;
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
  const [minigameInfo, setMinigameInfo] = useState(['???????????????', 10, 0]);
  // MVP ?????????
  const [mvpEffect, setMvpEffect] = useState(null);

  // html2canvas??? useRef(????????????????????????)
  const mainScreen = useRef();
  const dispatch = useDispatch();

  // html2canvas(dom element??? canvas??? ????????????)
  const onCapture = async () => {
    playSound(cameraSound);
    console.log('??????????????????.');
    const roomSeq = mySessionIdValue;
    // dom to canvas
    const element = mainScreen.current;
    const canvas = await html2canvas(element); // html to canvas
    const dataUrl = canvas.toDataURL('image/png');
    console.log(dataUrl);
    const blobData = dataURItoBlob(dataUrl);
    // ?????? ?????????
    const now = new Date();
    const filename = `${roomSeq}-${now.getHours()}${now.getMinutes()}${now.getSeconds()}.jpeg`;
    // ?????? ?????? ?????????
    const tempFile = new File([blobData], filename, { type: 'image/jpeg' });

    // ??????????????? ????????? api ??????
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

  // ??????????????? ?????? ??? ???????????? ?????????
  const minigameEndHandler = () => {
    const nextTurn = (myTurnNum + 1) % playerNum;
    const nextUserName = players[nextTurn];
    let isPosChange = true;
    // go(1), back(-1)??? ?????? ????????????
    let nextPosList = [...posList];
    if (voteResult === 1) {
      // go
      const myPos = posList[myTurnNum];
      nextPosList[myTurnNum] = myPos + 1;
      // go????????? 20?????? ?????? ?????? mvp??? myTurnNum??? ??????
      let sendData = {};
      if (myPos + 1 > 19) {
        nextPosList[myTurnNum] = 19;
        sendData = {
          session: mySessionIdValue,
          to: [], // all user
          data: JSON.stringify({
            // nextUserName: nextUserName, // ????????????
            // nextTurn: nextTurn, // ?????? ???
            nextIsRoll: false,
            nextIsGameDone: true,
            nextPosList: nextPosList, // ?????? ????????????                    
          }),
          type: 'GAME_STATE_DONE_GO',
        }

        fetch('https://i7e101.p.ssafy.io:4443/openvidu/api/signal', {
          method: 'POST',
          headers: {
            Authorization: 'Basic ' + btoa('OPENVIDUAPP:e101ssafy71'),
            'Content-type': 'application/json',
          },
          body: JSON.stringify(sendData),
        });
        return;
      }
    } else if (voteResult === -1) {
      // back
      const myPos = posList[myTurnNum];
      nextPosList[myTurnNum] = myPos - 1;
    } else {
      // emit
      isPosChange = false;
    }

    // emit
    const sendData = {
      session: mySessionIdValue,
      to: [], // all user
      data: JSON.stringify({
        // ??????????????? ????????? ???????????????, ?????????, isRoll ?????? false??????
        // ????????? ?????? ?????? ?????? ??????
        isPosChange: isPosChange,
        nextUserName: nextUserName, // ????????????
        nextTurn: nextTurn, // ?????? ???
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
        return 5; // ??????????????????
      }
      if (timeLeft === 5 & !timeOver & explanationOver) {
        playSound(countDownSound);
      }
      return timeLeft - 1;
    } else {
      // console.warn("??????????????????", timeLeft);
      if (!explanationOver) {
        setExplanationOver(true); // ?????? ???
        playSound(gameAlertSound); // ?????? ?????? gameAlertSound
        return minigameInfo[1]; // ????????????
      } else if (!timeOver) {
        setTimeOver(true); // ?????? ???
        setVoteResult(undefined);
        return 5; // ?????? ??? ??????
      } else if (!beforeVoteOver) {
        setBeforeVoteOver(true); // ?????? ??? ?????? ???
        // setVoteResult(undefined);
        playSound(gameAlertSound); // ?????? ?????? gameAlertSound
        return 20; // ?????? ??????
      } else if (!voteOver) {
        setVoteOver(true);
        setVoteSkip(false);
        return 5; // ?????? ?????? ??????
      } else if (!checkResultOver) {
        setCheckResultOver(true);
        // ???????????? ???
        // ????????? emit
        if (turnNum === myTurnNum) {
          minigameEndHandler();
        }
      }
    }
  };

  // ????????? ?????? ??????
  useEffect(() => {
    if (!isRoll) {
      return;
    }
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  }, [timeLeft]);

  // vote ?????? ?????? ????????? ????????????
  useEffect(() => {
    // ?????? ?????? ??????
    const goNum = vote.filter((thisVote) => thisVote[1] === 1).length;
    const backNum = vote.filter((thisVote) => thisVote[1] === -1).length;
    // const agreeNum = vote.filter((thisVote) => thisVote[1] === true).length;
    if (goNum > parseInt((playerNum - 1) / 2)) {
      // go??? ????????? ?????? ???????????? ???????????? ???
      setVoteResult(1);
      setTimeout(() => {
        playSound(voteSuccessSound);
      }, 1500);
    } else if (backNum > parseInt((playerNum - 1) / 2)) {
      // back??? ????????? ?????? ???????????? ???????????? ???
      setVoteResult(-1);
      setTimeout(() => {
        playSound(voteFailSound);
      }, 1500);
    } else {
      // ??? ??? ?????? ??????
      setVoteResult(0);
    }

    // ????????? ??? ???????????? ??????
    if (vote.length === playerNum - 1) {
      setVoteSkip(true);
    }
  }, [vote]);

  // ???????????? ??????(?????? ??????????????????)
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
    // ?????? ?????? ????????? emit
    const sendData = {
      session: mySessionIdValue,
      to: [], // all user
      data: JSON.stringify({
        // vote ?????????
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
    setIsVote(true); // ?????? ?????? ????????????
  };

  // ???????????? ????????????(isRoll??? true) ?????? ??? ??????
  useEffect(() => {
    if (isRoll) {
      setExplanationOver(false);
      setTimeOver(false);
      setVoteOver(false);
      setCheckResultOver(false);
      setTimeLeft(5); // ??????????????????
      setIsVote(false);
      setBeforeVoteOver(false);
      playSound(gameAlertSound); // ?????? ?????? ?????? gameAlertSound
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

  function playSound(soundName) {
    var audio = new Audio(soundName);
    audio.play();
  }

  return (
    <>
      {streamManager !== undefined ? (
        <>
          <StreamComponent>
            {timeOver &
              !voteOver &
              beforeVoteOver &
              !isVote &
              (myTurnNum !== turnNum) ? (
              <>
                <VoteAnswer>{minigameInfo[0]}</VoteAnswer>
                <AgreeDisagreeBtnContainer>
                  {/* <p>?????? ???: {vote.length}</p> */}
                  <MinigameBtn textColor={'#005f04'} onClick={() => { playSound(btnClickSound); voteHandler(1); }}>GO</MinigameBtn>
                  <MinigameBtn textColor={'#Eabe11'} onClick={() => { playSound(btnClickSound); voteHandler(0); }}>STAY</MinigameBtn>
                  <MinigameBtn textColor={'#9c1b2b'} onClick={() => { playSound(btnClickSound); voteHandler(-1); }}>BACK</MinigameBtn>
                </AgreeDisagreeBtnContainer>
              </>
            ) : (
              ''
            )}
            {isMvpPhase ? <MvpRibbon /> : <MainBorderStone className={timeOver & isRoll ? 'vote-time': ''}></MainBorderStone>}
            {timeOver & isRoll ? <DestinyTimeText>????????? ??????</DestinyTimeText> : ''}
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

                  {/* ????????? ???????????? ?????? ?????? ?????? ??????????????? ?????? */}
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
                      <p>{nextPlayer}??? ????????? ???????????? ????????? ????????????.</p>
                      {!minigameInfo[2] ? (
                        <VoteResultComment textColor={'#a70000'}>
                          ??????????&nbsp;{minigameInfo[0]}??????.
                        </VoteResultComment>
                      ) : (
                        ''
                      )}
                      <p>?????? ????????? ??? ???????????????????</p>
                    </VoteInfoBox>
                  ) : (
                    ''
                  )}
                  {voteOver & !checkResultOver ? (
                    <>
                      {/* <MinigameBtn onClick={() => onClickHandler()}>
                      (??????????????????)??????????????? ????????????
                    </MinigameBtn> */}
                      <VoteResultBoard>
                        {voteResult === -1 ? (
                          <>
                            <VoteResultComment textColor={'#412e22'}>
                              ????????????, ???????????????
                            </VoteResultComment>
                            <VoteResultComment textColor={'#a70000'}>
                              ?????? ??????
                            </VoteResultComment>
                            <VoteResultComment textColor={'#365a2a'}>
                              ????????? ?????? ????????? ???:
                            </VoteResultComment>
                          </>
                        ) : (
                          ''
                        )}
                        {voteResult === 0 ? (
                          <>
                            <VoteResultComment textColor={'#412e22'}>
                              ?????? ????????? ????????? ?????????
                            </VoteResultComment>
                            <VoteResultComment textColor={'#03035e'}>
                              ?????????
                            </VoteResultComment>
                          </>
                        ) : (
                          ''
                        )}
                        {voteResult === 1 ? (
                          <>
                            <VoteResultComment textColor={'#412e22'}>
                              ????????? ?????? ?????? ?????????
                            </VoteResultComment>
                            <VoteResultComment textColor={'#365a2a'}>
                              ????????? ??????
                            </VoteResultComment>
                            <VoteResultComment textColor={'#365a2a'}>
                              ????????? ?????? ????????? ???:
                            </VoteResultComment>
                          </>
                        ) : (
                          ''
                        )}
                        {voteResult === undefined ? (
                          <VoteResultComment textColor={'#365a2a'}>
                            ????????? ????????? ????????? ??????.
                          </VoteResultComment>
                        ) : (
                          ''
                        )}
                        <VoteResultComment>
                          {vote
                            .filter(
                              (thisVote) => Number(thisVote[1]) === voteResult,
                            )
                            .map((thisVote, idx) => {
                              if (voteResult === -1) {
                                return `${thisVote[0]} `;
                              } else if (voteResult === 0) {
                                return '';
                              } else {
                                return `${thisVote[0]} `;
                              }
                            })}
                        </VoteResultComment>
                        {/* {vote.map((thisVote, idx) => (
                          <p key={`vote${idx}`}>
                            {thisVote[0]}??? ??????:{' '}
                            {thisVote[1] === 1
                              ? 'go'
                              : thisVote[1] === -1
                                ? 'back'
                                : 'stay'}
                          </p>
                        ))} */}
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
          {!isGameDone ? <CaptureBtn onClick={() => onCapture()}></CaptureBtn> : ''}
        </>
      ) : null}
    </>
  );
};

export default MainUserVideoComponent;

// ???????????? : ??????????????? ???????????? ???????????? ?????????
// ????????? 5??? ????????? ????????? ????????? ??????
// ???????????? ????????? --> ??????????????? ?????? ????????? ??????
// useEffect??? timeLeft??? ???????????? ??????????????? 0????????? ??? ??????
// ????????? ????????? ???????????? ??????

// 5??? ?????? ????????????(?????? ???????????? ?????????(isRoll=true?????????), setLeftTime 5???)
// ????????? set??????, explanationOver = false, timeOver = false
// 5??? ????????? explanationOver = true??? ??????
// ?????? ???????????? setLeftTime 15?????? set
// 15?????? ????????? timeOver = True??? ??????
// ????????? setLeftTime 60??? ??????
// ?????? ????????? ?????????(???, ???)
// ????????? ?????? ?????? ????????????..
// ???????????? ???????????? ??????????????? voteOver??? ????????? (60??? ?????? ????????????)
// ????????? ?????????(emit)???(??????????????? ???????????? ??????)
// ????????? ?????? ?????? ????????? ????????????
// voteOver????????? ???????????? ???????????? ??????
// voteOver????????? 10?????? ?????????????????? checkResultOver = true??? ???
// checkResultOver = true ????????? ??? ??? ??????????????? ????????? ??? ????????? ???
