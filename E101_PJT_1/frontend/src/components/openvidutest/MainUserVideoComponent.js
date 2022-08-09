import React from 'react';
import OpenViduVideoComponent from './OvVideo';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

const StreamComponent = styled.div`
  width: 100%;
  height: 100%;
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

  & video {
    width: 10vmin;
    height: 10vmin;
    /* padding-top: 25vmin;     */
    /* float: left; */
    object-fit: cover;
    cursor: pointer;
    border-radius: 50%;
  }

  &.mainStreamer video {
    width: 40vw;
    height: 40vh;
    /* padding-top: 25vmin;     */
    /* float: left; */
    cursor: initial;
    border-radius: 5%;
    border: 2px yellow solid;
  }
`;

const MinigameInfo = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  background-color: transparent;
  top: 0;
  width: 40vw;
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

const MainUserVideoComponent = ({
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
}) => {
  const [timeLeft, setTimeLeft] = useState(undefined);
  const [explanationOver, setExplanationOver] = useState(false);
  const [timeOver, setTimeOver] = useState(false);
  const [voteOver, setVoteOver] = useState(false);
  const [checkResultOver, setCheckResultOver] = useState(false);
  const [voteSkip, setVoteSkip] = useState(false);
  const [voteResult, setVoteResult] = useState(false);
  const [minigameInfo, setMinigameInfo] = useState(['게임코멘트', 10, 0]);
  // 0(그리기 게임같은(현재 턴인 사람한테만 정답을 보여줘야하는 게임))
  // 1(이외 게임)
  const minigameList = [
    ['줄무늬 옷 가져오기', 10, 1],
    ['식용유 가져오기', 10, 1],
    ['리모컨 가져오기', 10, 1],
    ['숟가락 가져오기', 10, 1],
    ['파란색 옷 입기', 15, 1],
    ['캐릭터 옷 입기', 15, 1],
    ['거북이 그리기', 20, 0],
    ['가장 왼쪽에 있는 유저 그리기', 20, 0],
    ['가장 오른쪽에 있는 유저 그리기', 20, 0],
    ['돌고래 그리기', 20, 0],
  ];

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
    // 투표가 다 끝났는지 판단
    if (vote.length === playerNum) {
      setVoteSkip(true);
    }
    // 성공, 실패 판단
    const agreeNum = vote.filter((thisVote) => thisVote[1] === true).length;
    if (agreeNum > parseInt(vote.length / 2)) {
      setVoteResult(true);
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

  return (
    <div>
      {streamManager !== undefined ? (
        <StreamComponent className={mainStreamer}>
          {isRoll ? (
            <MinigameInfo>
              <p>남은 시간 : {timeLeft}</p>
              {explanationOver ? (
                ''
              ) : (
                <p>게임설명입니다, 요청하는 물건을 가져오세요</p>
              )}

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
          <p>{nextPlayer}씨 당신차례입니다.</p>
        </StreamComponent>
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
