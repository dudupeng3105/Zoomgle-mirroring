import styled from 'styled-components';
import letter from '../../media/images/InvitationLetter.png';
import reject from '../../media/images/rejectButton.png';
import accept from '../../media/images/acceptButton.png';
import memoriesBack from '../../media/images/MemorisBlock.png';
import InvitationBack from '../../media/images/mypageInvitation.png';
import PlannedGameBack from '../../media/images/PlannedGameBack.png';
import compassBack from '../../media/images/compass.png';
import picFrame from '../../media/images/picFrame.png';
import arrowRight from '../../media/images/arrowRight.png';
import paperBtn from '../../media/images/paperBtn.png';

import {
  PersonNumCounterLeftBtn,
  PersonNumCounterRightBtn,
} from '../utils/PersonNumCounter';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { gamePlanActions } from '../../store/gamePlan-slice';
import ReactAudioPlayer from '../utils/reactAudioPlayer';
import gameStartSound from '../../media/sounds/08_gameStart.wav';
import homePageSound from '../../media/sounds/03_homePage.wav';
import nextPageSound from '../../media/sounds/04_nextPage.wav';
import btnClickSound from '../../media/sounds/05_btn.wav';
 

const MyPageContentBlock = styled.div`
  display: flex;
  width: 82vw;
  height: 100vh;
  &.darken-back {
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
  }
`;

const MemoriesAndPlanGameBox = styled.div`
  width: 60%;
  height: 100vh;
  /* border: 1px solid white;   */
`;

const Memoriesbox = styled.div`
  width: 100%;
  height: 55vh;
  /* border: 1px solid yellow; */
  display: flex;
  align-items: end;
  padding-bottom: 8vh;
  padding-left: 3vw;
  background: url(${memoriesBack}) center no-repeat;
  background-size: 50vw 55vh;
  &.darken-back {
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      url(${memoriesBack}) center no-repeat;
    background-size: 50vw 55vh;
  }
`;

const PlanGameBox = styled.div`
  width: 110%;
  height: 45vh;
  /* border: 1px solid blue; */
  background: url(${PlannedGameBack}) center no-repeat;
  background-size: 55vw 45vh;
  display: flex;
  align-items: end;
  &.darken-back {
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      url(${PlannedGameBack}) center no-repeat;
    background-size: 55vw 45vh;
  }
`;

const InvitationBox = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 10vh;
  padding-right: 1vw;
  width: 40%;
  height: 70vh;
  /* border: 1px solid green; */
  background: url(${InvitationBack}) center no-repeat;
  background-size: 25vw 70vh;
  font-size: 5vmin;
  color: red;

  & p {
    -webkit-transform: rotate(6deg);
  }

  &:hover {
    transform: rotate(6deg) scale(1.1);
  }
`;

const CompassBox = styled.div`
  right: 30vw;
  top: 55vh;
  position: absolute;
  width: 10vw;
  height: 20vh;
  /* border: 1px solid pink; */
  background: url(${compassBack}) center no-repeat;
  background-size: 10vw 20vh;
  &:hover {
    transform: rotate(-10deg) scale(1.1);
  }
`;

const ArrowBtn = styled.div`
  position: absolute;
  right: 35vw;
  top: 45.5vh;
  width: 8vw;
  height: 5vh;
  cursor: pointer;
  z-index: 2;
  /* border: 1px solid black; */
  background: url(${arrowRight}) center no-repeat;
  background-size: 8vw 5vh;
  :hover {
    transform: scale(1.1);
  }
`;

const RecentGameInfoBox = styled.div`
  width: 45%;
  height: 23vh;
  font-size: 4vmin;
  p {
    font-size: 3.3vmin;
  }
  .not-data {
    width: 20vw;
    display: flex;
    margin-top: 8vh;
    justify-content: center;
    font-size: 4vmin;
    color: brown;
  }
`;

const PictureFrame = styled.div`
  width: 45%;
  height: 30%;
  background: url(${picFrame}) no-repeat center;
  background-size: 9vw 11vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PictureBox = styled.div`
  margin-left: 3%;
  width: 45%;
  height: 40vh;
  display: flex;
  flex-wrap: wrap;
  /* overflow-x: hidden;
  overflow-y: hidden; */
  justify-content: space-around;
  /* border: 2px solid brown;   */
`;

const PictureImg = styled.div`
  width: 100%;
  height: 100%;
  background: ${(props) => `url(${props.backImg}) no-repeat center`};
  background-size: 8vw 10vh;
`;

const PlannedGameInfoBox = styled.div`
  width: 80%;
  height: 25vh;
  font-size: 4vmin;
  /* border: 1px solid purple; */
  padding-left: 10%;
  p {
    font-size: 4.3vmin;
  }
  .not-data {
    width: 18vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 4.3vmin;
    margin-top: 3vh;
    color: brown;
    p {
      text-align: center;
    }
  }
`;

const GivenInvitationModal = styled.div`
  position: absolute;
  border-radius: 10px;
  padding: 2rem;
  left: 40vw;
  top: 10vh;
  width: 35vw;
  height: 80vh;
  /* border: 1px solid black; */
  background: url(${letter}) no-repeat center;
  background-size: 35vw 80vh;
  z-index: 2;
  display: flex;
  padding-top: 14vh;
  /* padding-left: 10vw; */
`;

const InvitationBlock = styled.div`
  width: 35vw;
  height: 60vh;
  /* border: 1px solid blue; */
  padding-top: 15vh;
  justify-content: center;
  display: flex;
  flex-direction: column;
  color: #2d2911;
  border-radius: 10px;
  font-size: 3.5vmin;
`;

const InvitationItem = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: ${(props) => props.neededHeight};
  width: 27vw;
  padding-left: ${(props) => props.neededPaddingLeft};
`;

const AcceptRejectButton = styled.div`
  display: flex;
  justify-content: space-around;
  width: 27vw;
  /* border: 1px solid yellow; */
  /* flex-direction: row; */
`;

const CloseModalBtn = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 3vw;
  height: 3vh;
  color: red;
  font-size: 5vmin;
  top: 1vh;
  right: 2vw;
  cursor: pointer;
`;

const AcceptButton = styled.div`
  cursor: pointer;
  width: 7.5vw;
  height: 10vh;
  background: url(${accept}) center no-repeat;
  background-size: 7.5vw 10vh;
  padding: 0;
  :hover {
    transform: scale(1.1);
  }
  :active {
    transform: scale(0.9);
  }
  /* border: 3px red solid; */
`;

const RejectButton = styled.div`
  cursor: pointer;
  width: 7.5vw;
  height: 10vh;
  background: url(${reject}) center no-repeat;
  background-size: 7.5vw 10vh;
  padding: 0;
  :hover {
    transform: scale(1.1);
  }
  :active {
    transform: scale(0.9);
  }
  /* border: 3px red solid; */
`;

const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 65vh;
`;

const StartAdventureBtn = styled.div`
  position: absolute;
  background: url(${paperBtn});
  background-size: 12vw 7vh;
  right: 47vw;
  bottom: 25vh;
  display: flex;
  width: 12vw;
  height: 7vh;
  padding-top: 1vh;
  padding-left: 1vw;
  
  cursor: pointer;

  & p {
    font-size: 5vmin;
    color: #412E22;
  }

  :hover {
    transform: scale(1.1);
  }
  :active {
    transform: scale(0.9);
  }
`;

const MyPageContent = () => {
  const dispatch = useDispatch();

  // 초대장 아이콘을 누르면 실행
  const myinvitationList = useSelector(
    (state) => state.gamePlan.invitationList,
  );
  // console.log('초대장 아이콘 누름', myinvitationList);
  const navigate = useNavigate();
  const [modalToggle, setModalToggle] = useState(false);
  const [firstClick, setFirstClick] = useState(false);
  // 달력 관련
  const gamePlanList = useSelector((state) => state.gamePlan.gamePlanList);
  const gameDoneList = useSelector((state) => state.gamePlan.gameDoneList);
  const gameDonePhoto = useSelector((state) => state.gamePlan.gameDonePhoto);
  const { nickname } = useSelector((state) => state.auth.user);
  const [invitationIdx, setInvitationIdx] = useState(0);
  // const [backSoundPlay, setBackSoundPlay] = useState(true);
  // const [nexyPagePlay, setNextPagePlay] = useState(false);
  const [btnClickPlay, setBtnClickPlay] = useState(false);

  useEffect(() => {
    dispatch(gamePlanActions.getInvitaionListStart());
  }, [firstClick]);

  // 초대장없으면 모달 닫아버림
  useEffect(() => {
    if (myinvitationList.length === 0) {
      setModalToggle(false);
    }
  }, [myinvitationList]);

  useEffect(() => {
    dispatch(gamePlanActions.getGamePlanListStart());
    dispatch(gamePlanActions.getGameDoneListStart());
  }, []);

  useEffect(() => {
    const temp = [...gameDoneList, ...gamePlanList];
    console.log(temp);
    console.log(gameDoneList);
    if (gameDoneList.length !== 0) {
      dispatch(
        gamePlanActions.getGameDonePhotoStart(
          gameDoneList[gameDoneList.length - 1].roomCode,
        ),
      );
    }
  }, [gamePlanList, gameDoneList]);

  const onClickDecision = (decision, invitationSeq, roomCode) => {
    console.log(
      'onClickDecision =',
      decision,
      Number(invitationSeq),
      Number(roomCode),
    );
    const invitationInfo = {
      roomCode: Number(roomCode),
      invitationSeq: Number(invitationSeq),
      join: decision,
    };
    dispatch(gamePlanActions.checkInvitaionStart(invitationInfo));
  };

  const onClickLeft = () => {
    if (invitationIdx === 0) {
      setInvitationIdx(myinvitationList.length - 1);
    } else {
      setInvitationIdx(invitationIdx - 1);
    }
  };

  const onClickRight = () => {
    if (invitationIdx === myinvitationList.length - 1) {
      setInvitationIdx(0);
    } else {
      setInvitationIdx(invitationIdx + 1);
    }
  };

  const onClickMovePicturePage = () => {
    navigate('/pictures');
  };

  const onClickMoveJoinPage = () => {
    navigate('/joingame');
  };

  const onClickJoinGame = (roomCode, capacity, host) => {
    navigate('/openvidutest', {
      state: {
        sessionNickname: nickname,
        sessionRoomId: roomCode,
        sessionCapacity: capacity,
        sessionHost: host,
      },
    });
  };

  function btnClick() {
    var audio = new Audio(btnClickSound);
    audio.play();
  }

  return (
    <MyPageContentBlock className={modalToggle ? 'darken-back' : ''}>
      {/* <ReactAudioPlayer
        urlSound={gameStartSound}
        isLoop={false}
        // isPlaying={!backSoundPlay}
        isPlaying={false}
      >
      </ReactAudioPlayer>
      <ReactAudioPlayer
        urlSound={homePageSound}
        isLoop={true}
        // isPlaying={backSoundPlay}
        isPlaying={false}
        >
      </ReactAudioPlayer>
      <ReactAudioPlayer
        urlSound={nextPageSound}
        isLoop={false}
        isPlaying={nexyPagePlay}
      >
      </ReactAudioPlayer> */}
      <ReactAudioPlayer
        urlSound={btnClickSound}
        isLoop={false}
        isPlaying={btnClickPlay}
      ></ReactAudioPlayer>
      <MemoriesAndPlanGameBox>
        <Memoriesbox className={modalToggle ? 'darken-back' : ''}>
          {gameDoneList.length !== 0 ? (
            <>
              <RecentGameInfoBox>
                <p>
                  모험일자:{' '}
                  {`${gameDoneList[gameDoneList.length - 1].year}년 ${
                    gameDoneList[gameDoneList.length - 1].month
                  }월 ${gameDoneList[gameDoneList.length - 1].day}일`}
                </p>
                <p>대장: {gameDoneList[gameDoneList.length - 1].host}</p>
                <p>공략자: {gameDoneList[gameDoneList.length - 1].mvp}</p>
                <p>
                  동료:{' '}
                  {gameDoneList[gameDoneList.length - 1].playerList
                    .map((player) => player.user)
                    .join(' ')}
                </p>
              </RecentGameInfoBox>
              <PictureBox>
                {gameDonePhoto.map((photo, idx) => (
                  <PictureFrame>
                    <PictureImg
                      key={`mypage-photo-${idx}`}
                      backImg={photo.photo_Url}
                    ></PictureImg>
                  </PictureFrame>
                ))}
              </PictureBox>
              <ArrowBtn
                onClick={() => {
                  onClickMovePicturePage();
                }}
              ></ArrowBtn>
            </>
          ) : (
            <RecentGameInfoBox>
              <div className="not-data"> 모험을 진행하고 일지를 작성하시오</div>
            </RecentGameInfoBox>
          )}
        </Memoriesbox>
        <PlanGameBox className={modalToggle ? 'darken-back' : ''}>
          {gamePlanList.length !== 0 ? (
            <>
              <StartAdventureBtn
                onClick={() => {
                  btnClick();
                  onClickJoinGame(
                    `${gamePlanList[gamePlanList.length - 1].roomCode}`,
                    `${gamePlanList[gamePlanList.length - 1].maxCapacity}`,
                    `${gamePlanList[gamePlanList.length - 1].host}`,
                  );
                }}
              >
                <p>모험 바로가기</p>
              </StartAdventureBtn>
              <PlannedGameInfoBox>
                <p>대장: {gamePlanList[gamePlanList.length - 1].host}</p>
                <p>
                  모험일자:{' '}
                  {`${gamePlanList[gamePlanList.length - 1].year}년 ${
                    gamePlanList[gamePlanList.length - 1].month
                  }월 ${gamePlanList[gamePlanList.length - 1].day}일`}
                </p>
                <p>
                  동료:{' '}
                  {gamePlanList[gamePlanList.length - 1].playerList
                    .map((player) => player.user)
                    .join(' ')}
                </p>
              </PlannedGameInfoBox>
            </>
          ) : (
            <PlannedGameInfoBox>
              <div className="not-data">
                <p>준비할 모험이 없다.</p>
                <p>모험을 꾸리거나, 모험단 요청을 받으시오</p>
              </div>
            </PlannedGameInfoBox>
          )}
          <CompassBox
            onClick={() => {
              onClickMoveJoinPage();
            }}
          ></CompassBox>
        </PlanGameBox>
      </MemoriesAndPlanGameBox>
      <InvitationBox
        onClick={() => {
          btnClick();
          setFirstClick(true);
          if (myinvitationList.length === 0) {
            return;
          }
          setModalToggle(!modalToggle);
        }}
      >
        <p>{myinvitationList.length}건의 초대</p>
      </InvitationBox>

      {modalToggle && (
        <GivenInvitationModal>
          <CloseModalBtn
            onClick={() => {
              setModalToggle(!modalToggle);
            }}
          >
            X
          </CloseModalBtn>
          <BtnContainer>
            <PersonNumCounterLeftBtn
              onClick={() => {
                btnClick();
                onClickLeft();
              }}
            />
          </BtnContainer>
          {myinvitationList.length !== 0 ? (
            <InvitationBlock>
              <InvitationItem neededHeight={`7vh`} neededPaddingLeft={`2vw`}>
                <p>
                  {myinvitationList[invitationIdx].sender}님 으로부터의 초대장
                </p>
              </InvitationItem>
              <InvitationItem neededHeight={`15vh`} neededPaddingLeft={`2vw`}>
                <p>
                  {`${myinvitationList[invitationIdx].year}년 ${myinvitationList[invitationIdx].month}월 ${myinvitationList[invitationIdx].day}일 ${myinvitationList[invitationIdx].hour}시 ${myinvitationList[invitationIdx].minute}분`}{' '}
                  까지
                </p>
                <p>늦지않도록 펜과 노트를 지참해</p>
                <p>집합하기 바람.</p>
              </InvitationItem>
              <InvitationItem neededHeight={`5vh`} neededPaddingLeft={`2vw`}>
                장소는 {myinvitationList[invitationIdx].roomCode}번 방이다.
              </InvitationItem>
              <InvitationItem neededHeight={`8vh`} neededPaddingLeft={`2vw`}>
                초대에 응하시겠습니까?
              </InvitationItem>
              <AcceptRejectButton>
                <AcceptButton
                  onClick={() => {
                    btnClick();
                    onClickDecision(
                      true,
                      `${myinvitationList[invitationIdx].invitationSeq}`,
                      `${myinvitationList[invitationIdx].roomCode}`,
                    );
                  }}
                ></AcceptButton>
                <RejectButton
                  onClick={() => {
                    btnClick();
                    onClickDecision(
                      false,
                      `${myinvitationList[invitationIdx].invitationSeq}`,
                      `${myinvitationList[invitationIdx].roomCode}`,
                    );
                  }}
                ></RejectButton>
              </AcceptRejectButton>
            </InvitationBlock>
          ) : (
            ''
          )}
          <BtnContainer>
            <PersonNumCounterRightBtn
              onClick={() => {
                btnClick();
                onClickRight();
              }}
            />
          </BtnContainer>
        </GivenInvitationModal>
      )}
      {/* <HeadAlbum onClick={() => navigate('/pictures')}></HeadAlbum> */}
    </MyPageContentBlock>
  );
};

export default MyPageContent;
