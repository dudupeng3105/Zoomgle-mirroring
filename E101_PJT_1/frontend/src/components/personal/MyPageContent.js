
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

  useEffect(() => {
    dispatch(gamePlanActions.getInvitaionListStart());
  }, [firstClick]);

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

      {/* // 달력 */}
      <MyPagecalender></MyPagecalender>
      <HeadAlbum onClick={() => navigate('/pictures')}></HeadAlbum>
    </MyPageContentBlock>
  );
};

export default MyPageContent;
