import styled from "styled-components";
import background from '../../media/images/headerMenuBackGround.png'
import inviteIcon from '../../media/images/invitation.jpg'
import { useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { gamePlanActions } from "../../store/gamePlan-slice";

const MyPageContentBlock = styled.div`
  background: url(${background});
  width: 100%;
  margin: 10px;
  padding: 10px;
`;

const InvitationIcon = styled.div`
  background: url(${inviteIcon});
  background-size: 20vw 20vh;
  width: 20vw;
  height: 20vh;  
  cursor: pointer;
`

const GivenInvitationModal = styled.div`
  position: absolute;
  border-radius: 10px;
  padding: 2rem;
  left: 30vw;
  top: 10vh;
  width: 60vw;
  height: 80vh;
  border: 1px solid black;
  background-color: white;
  z-index: 1;
  display: flex;  
  justify-content: center;
`;

const InvitationBlock = styled.div`
  width: 50vw;
  height: 10vh;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  background-color: grey;
  border-radius: 10px;
  font-size: 2rem;
`

const MyPageContent = () => {
  const dispatch = useDispatch();

  const myinvitationList = useSelector((state) => (state.gamePlan.invitationList))
  console.log("안녕", myinvitationList)
    
  const [modalToggle, setModalToggle] = useState(false);

  const onClickDecision = (decision, invitationSeq, roomCode) => {
    console.log(decision, Number(invitationSeq), Number(roomCode));
    const invitationInfo = {
      roomCode: Number(roomCode),
      invitationSeq: Number(invitationSeq),
      join: decision,
    }
    dispatch(gamePlanActions.checkInvitaionStart(invitationInfo));
  }
  
  
  useEffect(() => {
    dispatch(gamePlanActions.getInvitaionListStart())
  }, []);


  return (
    <MyPageContentBlock>
      {modalToggle && (
        <GivenInvitationModal>
          {myinvitationList.map((invitation, idx) => (
            <InvitationBlock key={idx}>
              {invitation.sender}님이 당신을 초대했습니다. 방 번호는{' '}
              {invitation.roomCode}
              <button
                onClick={() => {
                  onClickDecision(
                    true,
                    `${invitation.invitationSeq}`,
                    `${invitation.roomCode}`,
                  );
                }}
              >
                승락
              </button>
              <button
                onClick={() => {
                  onClickDecision(
                    true,
                    `${invitation.invitationSeq}`,
                    `${invitation.roomCode}`,
                  );
                }}
              >
                거절
              </button>
            </InvitationBlock>
          ))}
        </GivenInvitationModal>
      )}
      <InvitationIcon
        onClick={() => {
          setModalToggle(!modalToggle);
        }}
      />
    </MyPageContentBlock>
  );
};

export default MyPageContent;