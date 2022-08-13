import styled from 'styled-components';
import background from '../../media/images/woodenBack1.png';
import inviteIcon from '../../media/images/closeletter.png';
import openedinviteIcon from '../../media/images/openletter1.png';
import letter from '../../media/images/letter.png';
import reject from '../../media/images/reject.png';
import accept from '../../media/images/accept.png';
import album from '../../media/images/album_book.png';
import memoriesBack from '../../media/images/MemorisBlock.png';
import InvitationBack from '../../media/images/mypageInvitation.png';
import PlannedGameBack from '../../media/images/PlannedGameBack.png';
import compassBack from '../../media/images/compass.png';
import picFrame from '../../media/images/picFrame.png';
import arrowRight from '../../media/images/arrowRight.png';
import PlannedGameList from '../common/PlannedGameList';
import {
  PersonNumCounterLeftBtn,
  PersonNumCounterRightBtn,
} from '../utils/PersonNumCounter';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { gamePlanActions } from '../../store/gamePlan-slice';

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
  margin-top: 9.5vh;
  display: flex;
  flex-direction: column;
  color: #2d2911;
  border-radius: 10px;
  font-size: 3.5vmin;
  padding-left: 6vw;
`;

const InvitationItem = styled.div`
  height: ${(props) => props.neededHeight};
  width: 14vw;
  margin-left: ${(props) => props.neededMarginLeft};
`;

const AcceptRejectButton = styled.div`
  display: flex;
  /* flex-direction: row; */
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
  const [invitationIdx, setInvitationIdx] = useState(0);

  useEffect(() => {
    dispatch(gamePlanActions.getInvitaionListStart());
  }, [firstClick]);

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

  return (
    <MyPageContentBlock className={modalToggle ? 'darken-back' : ''}>
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
            <p>지난 게임이 없어요</p>
          )}
        </Memoriesbox>
        <PlanGameBox className={modalToggle ? 'darken-back' : ''}>
          {gamePlanList.length !== 0 ? (
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
          ) : (
            '예정된 게임이 없어요'
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
          setFirstClick(true);
          setModalToggle(!modalToggle);
        }}
      >
        <p>{myinvitationList.length}건의 초대</p>
      </InvitationBox>

      {modalToggle && (
        <GivenInvitationModal>
          <BtnContainer>
            <PersonNumCounterLeftBtn
              onClick={() => {
                onClickLeft();
              }}
            />
          </BtnContainer>
          {myinvitationList.length !== 0 ? (
            <InvitationBlock>
              <InvitationItem neededHeight={`10vh`} neededMarginLeft={`2vw`}>
                {myinvitationList[invitationIdx].sender}
              </InvitationItem>
              <InvitationItem neededHeight={`10vh`} neededMarginLeft={`2vw`}>
                {`${myinvitationList[invitationIdx].year}년 ${myinvitationList[invitationIdx].month}월 ${myinvitationList[invitationIdx].day}일 ${myinvitationList[invitationIdx].hour}시 ${myinvitationList[invitationIdx].minute}분`}
              </InvitationItem>
              <InvitationItem neededHeight={`9vh`} neededMarginLeft={`3vw`}>
                {myinvitationList[invitationIdx].roomCode}
              </InvitationItem>
              <InvitationItem neededHeight={`15vh`} neededMarginLeft={`6vw`}>
                {myinvitationList[invitationIdx].receiver}
              </InvitationItem>

              <AcceptRejectButton>
                <AcceptButton
                  onClick={() => {
                    onClickDecision(
                      true,
                      `${myinvitationList[invitationIdx].invitationSeq}`,
                      `${myinvitationList[invitationIdx].roomCode}`,
                    );
                  }}
                ></AcceptButton>
                <RejectButton
                  onClick={() => {
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
