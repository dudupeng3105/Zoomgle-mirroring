
import styled from "styled-components";
import background from '../../media/images/mypage_back4.jpg'
import inviteIcon from '../../media/images/closeletter.png'
import openedinviteIcon from '../../media/images/openletter1.png'
import letter from '../../media/images/letter.png'
import reject from '../../media/images/reject.png'
import accept from '../../media/images/accept.png'
import album from '../../media/images/album_book.png'
import MyPagecalender from '../utils/MyPageCalender'
import PlannedGameList from "../common/PlannedGameList";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { gamePlanActions } from '../../store/gamePlan-slice';

const MyPageContentBlock = styled.div`
  background: url(${background}) center no-repeat;
  background-size: 83vw 98vh;
  width: 100%;
  margin: 10px;
  padding: 10px;
  /* border: 3px green solid; */
`;

const InvitationIcon = styled.div`
  /* background: url(${inviteIcon}); */
  /* ${(props) =>
    props.closeOpen
      ? `background: url(${openedinviteIcon}) no-repeat center`
      : `background: url(${inviteIcon}) no-repeat center`}; */
  background: ${(props) =>
    props.closeOpen
      ? `url(${openedinviteIcon}) no-repeat center`
      : `url(${inviteIcon}) no-repeat center`};
  background-size: 18vw 25vh;
  width: 18vw;
  height: 25vh;
  margin-left: 5vw;
  margin-top: 15vh;
  cursor: pointer;
  display: inline-block;
  /* 각도 변경 */
  transform: rotate(-30deg);

  :hover {
    transform: scale(1.1) rotate(-30deg);
    -webkit-transform: scale(1.1);
    -moz-transform: scale(1.1);
    -ms-transform: scale(1.1);
    -o-transform: scale(1.1);
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
  z-index: 1;
  display: flex;
  padding-top: 14vh;
  padding-left: 10vw;
`;

const InvitationBlock = styled.div`
  width: 25vw;
  height: 60vh;
  margin-top: 9.5vh;
  display: flex;
  flex-direction: column;
  color: #2d2911;
  border-radius: 10px;
  font-size: 2rem;
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
  width: 7.5vw;
  height: 10vh;
  background: url(${accept}) center no-repeat;
  background-size: 7.5vw 10vh;
  padding: 0;
  display: inline;
  border: 3px red solid;
`;

const RejectButton = styled.div`
  width: 7.5vw;
  height: 10vh;
  background: url(${reject}) center no-repeat;
  background-size: 7.5vw 10vh;
  padding: 0;
  display: inline;
  border: 3px red solid;
`;

const HeadAlbum = styled.div`
  background: url(${album}) center no-repeat;
  background-size: 14vw 25vh;
  width: 14vw;
  height: 25vh;
  margin-left: 5vw;
  padding-top: 30vh;
  padding-bottom:0;
  /* border: 3px red solid; */
  cursor: pointer;
  display: inline-block;
  /* 각도 변경 */
  /* transform: rotate(-30deg); */

  :hover {
    transform: scale(1.1) rotate(-30deg);
    -webkit-transform: scale(1.1);
    -moz-transform: scale(1.1);
    -ms-transform: scale(1.1);
    -o-transform: scale(1.1);
  }
`

const TotalPlanModal = styled.div`
  position: absolute;
  top: 10vh;
  left: 33vw;
  width: 50vw;
  height: 70vh;
  background: #B39860;  
  padding: 1vmin;
  display: flex;
  align-items: center;
  flex-direction: column;  
  border-radius: 5px;
  border: 1px solid black;
`;

const TotalPlanInfo = styled.div`
  width: 48vw;
  height: ${props => props.verticalSize};
  display: flex;
  align-items: center;
  color: #412E22;
  justify-content: ${props => props.jc};
  font-size: ${props=> props.fontSize};  
`;

const BtnBox = styled.div`
  width: 50vw;
  display: flex;
  justify-content: space-between;
  border: 2px solid white;  
`;

const PictureBox = styled.div`
  width: 48vw;
  height: 20vh;
  display: flex;
  flex-wrap: wrap;
  margin-top: 2vh;
  overflow-x: hidden;
  overflow-y: scroll;
  justify-content: space-around;
  border: 2px solid brown;  
`;

const PictureImg = styled.div`
  width: 20vw;
  height: 18vh;
  background: ${props => `url(${props.backImg}) no-repeat center`};  
  background-size: 20vw 18vh; 
  border: 1px solid black;
  border-radius: 5px;
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
  const [calendarList, setCalendarList] = useState([]);
  const [calendarCnt, setCalendarCnt] = useState(0);
  const [calendarToggle, setCalendarToggle] = useState(false);

  useEffect(() => {
    dispatch(gamePlanActions.getInvitaionListStart());
  }, [firstClick]);

  useEffect(() => {
    dispatch(gamePlanActions.getGamePlanListStart());
    dispatch(gamePlanActions.getGameDoneListStart());
  }, []);

  useEffect(() => {
    const temp = [...gameDoneList, ...gamePlanList]
    console.log(temp);
    setCalendarList(temp);
    setCalendarCnt(temp.length-1);
  }, [gamePlanList, gameDoneList]);

  useEffect(() => {
    if (calendarList.length === 0) {
      return;
    }
    if (!!calendarList[calendarCnt].mvp) {
      dispatch(gamePlanActions.getGameDonePhotoStart(calendarList[calendarCnt].roomCode))
    }
  }, [calendarCnt]);

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
    if (calendarCnt === 0) {
      setCalendarCnt(calendarList.length - 1)
    } else {
      setCalendarCnt(calendarCnt - 1)
    }
  }

  const onClickRight = () => {
    if (calendarCnt === calendarList.length - 1) {
      setCalendarCnt(0)
    } else {
      setCalendarCnt(calendarCnt + 1)
    }
  }

  return (
    <MyPageContentBlock>
      {/* 초대장 */}
      {modalToggle && (
        <GivenInvitationModal>
          {myinvitationList.map((invitation, idx) => (
            <InvitationBlock key={idx}>
              <InvitationItem neededHeight={`10vh`} neededMarginLeft={`2vw`}>
                {invitation.sender}
              </InvitationItem>
              <InvitationItem neededHeight={`10vh`} neededMarginLeft={`2vw`}>
                2022년 10월 27일 8시 30분
              </InvitationItem>
              <InvitationItem neededHeight={`9vh`} neededMarginLeft={`3vw`}>
                {invitation.roomCode}
              </InvitationItem>
              <InvitationItem neededHeight={`15vh`} neededMarginLeft={`6vw`}>
                {invitation.receiver}
              </InvitationItem>

              <AcceptRejectButton>
                <AcceptButton
                  onClick={() => {
                    onClickDecision(
                      true,
                      `${invitation.invitationSeq}`,
                      `${invitation.roomCode}`,
                    );
                  }}
                ></AcceptButton>
                <RejectButton
                  onClick={() => {
                    onClickDecision(
                      false,
                      `${invitation.invitationSeq}`,
                      `${invitation.roomCode}`,
                    );
                  }}
                >
                  거절
                </RejectButton>
              </AcceptRejectButton>
            </InvitationBlock>
          ))}
        </GivenInvitationModal>
      )}
      <InvitationIcon
        closeOpen={modalToggle}
        onClick={() => {
          setFirstClick(true);
          setModalToggle(!modalToggle);
        }}
      />

      <button
        onClick={() => {
          setCalendarToggle(!calendarToggle);
        }}
      >
        달력입니다.
      </button>
      {calendarToggle ? (
        <TotalPlanModal>
          <TotalPlanInfo fontSize={'3vmin'} jc={'end'} verticalSize={'5vh'}>
            일자:{' '}
            {`${calendarList[calendarCnt].year}년 ${calendarList[calendarCnt].month}월 ${calendarList[calendarCnt].day}일`}
          </TotalPlanInfo>
          {/* <TotalPlanInfo>{calendarList[calendarCnt].roomCode}</TotalPlanInfo> */}
          <BtnBox>
            <button onClick={() => onClickLeft()}>왼쪽</button>
            <TotalPlanInfo
              fontSize={'6vmin'}
              jc={'center'}
              verticalSize={'10vh'}
            >
              모험일지
            </TotalPlanInfo>
            <button onClick={() => onClickRight()}>오른쪽</button>
          </BtnBox>
          <TotalPlanInfo fontSize={'5vmin'} verticalSize={'7vh'}>
            시간
          </TotalPlanInfo>
          <TotalPlanInfo fontSize={'4vmin'} verticalSize={'7vh'}>
            {`${calendarList[calendarCnt].hour}시 ${calendarList[calendarCnt].minute}분`}
          </TotalPlanInfo>
          <TotalPlanInfo fontSize={'5vmin'} verticalSize={'7vh'}>
            동료
          </TotalPlanInfo>
          <TotalPlanInfo fontSize={'3vmin'} verticalSize={'7vh'}>
            참가자:{' '}
            {calendarList[calendarCnt].playerList
              .map((player) => player.user)
              .join(', ')}
          </TotalPlanInfo>
          {!!calendarList[calendarCnt].mvp ? (
            <TotalPlanInfo
              fontSize={'4vmin'}
              verticalSize={'4vh'}
              jc={'center'}
            >
              MVP: {calendarList[calendarCnt].mvp}
            </TotalPlanInfo>
          ) : (
            ''
          )}
          {!!calendarList[calendarCnt].mvp ? (
            <>
              <TotalPlanInfo fontSize={'5vmin'} verticalSize={'4vh'}>
                사진첩
              </TotalPlanInfo>
              <PictureBox>
                {gameDonePhoto.map((photo, idx) => (
                  <PictureImg
                    key={`mypage-photo-${idx}`}
                    backImg={photo.photo_Url}
                  ></PictureImg>
                ))}
              </PictureBox>              
            </>
          ) : (
            ''
          )}
        </TotalPlanModal>
      ) : (
        ''
      )}

      {/* // 달력 */}
      <MyPagecalender></MyPagecalender>
      <HeadAlbum onClick={() => navigate('/pictures')}></HeadAlbum>
    </MyPageContentBlock>
  );
};

export default MyPageContent;
