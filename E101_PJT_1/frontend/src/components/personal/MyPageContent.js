import styled from "styled-components";
import background from '../../media/images/mypage_back3.jpg'
import inviteIcon from '../../media/images/Closeletter.png'
import openedinviteIcon from '../../media/images/openletter1.png'
import letter from '../../media/images/letter.png'
import reject from '../../media/images/reject.png'
import accept from '../../media/images/accept.png'
import MyPagecalender from '../utils/MyPageCalender'
import { useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { gamePlanActions } from "../../store/gamePlan-slice";

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
  /* ${props => props.closeOpen ? `background: url(${openedinviteIcon}) no-repeat center` : `background: url(${inviteIcon}) no-repeat center`}; */
  background: ${props => props.closeOpen ? `url(${openedinviteIcon}) no-repeat center` : `url(${inviteIcon}) no-repeat center`};
  background-size: 18vw 25vh;
  width: 18vw;
  height: 25vh;  
  margin-left: 5vw;
  margin-top: 15vh;
  cursor: pointer;
  display: inline-block;

  :hover {
  transform: scale(1.1);
  -webkit-transform: scale(1.1);
  -moz-transform: scale(1.1);
  -ms-transform: scale(1.1);
  -o-transform: scale(1.1);
}
 
`

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
  flex-direction: row;
  /* justify-content: center; */
  /* padding-top: 10vh; */
  padding-left: 10vw;
  align-items: center;

`;

const InvitationBlock = styled.div`
  width: 25vw;
  height: 10vh;
  margin-top: 10vh;
  /* margin-bottom: 0vh; */
  display: flex;
  align-items: space-between;
  margin-left: 2rem;
  /* background-color: #2d2911; */
  color: #2d2911;
  border-radius: 10px;
  font-size: 2rem;
  /* border: 3px red solid; */
  display: flex;
  /* flex-direction: row; */
`
const AcceptRejectButton = styled.div`
  display: flex;
  /* flex-direction: row; */
`

const AcceptButton = styled.div`
width: 15vw;
height: 20vh;
background: url(${accept}) center no-repeat;
background-size: 15vw 10vh;
padding: 0;
display: inline;
border: 3px red solid;

`

const RejectButton = styled.div`
width: 15vw;
height: 20vh;
background: url(${reject}) center no-repeat;
background-size: 15vw 10vh;
padding: 0;
display: inline;
border: 3px red solid;
`

const CalenderBlock = styled.div`

  
`

const MyPageContent = () => {
  const dispatch = useDispatch();

  // 초대장 아이콘을 누르면 실행
  const myinvitationList = useSelector((state) => (state.gamePlan.invitationList))
  console.log("초대장 아이콘 누름", myinvitationList)
    
  const [modalToggle, setModalToggle] = useState(false);

  const onClickDecision = (decision, invitationSeq, roomCode) => {
    console.log('onClickDecision =', decision, Number(invitationSeq), Number(roomCode));
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
      {/* 초대장 */}
      {modalToggle && (
        <GivenInvitationModal>
          {myinvitationList.map((invitation, idx) => (
            <InvitationBlock key={idx}>
              {invitation.sender}
               <br />
              {invitation.reg_DTM}
              <br />
              {invitation.roomCode}
              <br />
              {invitation.receiver}
              <br />
              <AcceptRejectButton>
                <AcceptButton
                  onClick={() => {
                    onClickDecision(
                      true,
                      `${invitation.invitationSeq}`,
                      `${invitation.roomCode}`,
                    );
                  }}
                >
                </AcceptButton>
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
          setModalToggle(!modalToggle);
        }}
      />

        {/* // 달력 */}
        <MyPagecalender></MyPagecalender>
    </MyPageContentBlock>
  );
};

export default MyPageContent;