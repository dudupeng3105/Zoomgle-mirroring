import styled from "styled-components";
import background from '../../media/images/headerMenuBackGround.png'
import inviteIcon from '../../media/images/closeletter.png'
import openedinviteIcon from '../../media/images/openletter.png'
import letter from '../../media/images/letter.png'
import { useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { gamePlanActions } from "../../store/gamePlan-slice";

const MyPageContentBlock = styled.div`
  background: url(${background});
  width: 100%;
  margin: 10px;
  padding: 10px;
  /* border: 3px green solid; */
  

`;

const InvitationIcon = styled.div`
  /* background: url(${inviteIcon}); */
  /* ${props => props.closeOpen ? `background: url(${openedinviteIcon}) no-repeat center` : `background: url(${inviteIcon}) no-repeat center`}; */
  background: ${props => props.closeOpen ? `url(${openedinviteIcon}) no-repeat center` : `url(${inviteIcon}) no-repeat center`};
  background-size: 15vw 20vh;
  width: 20vw;
  height: 20vh;  
  cursor: pointer;
 
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
  flex-direction: column;
  /* justify-content: center; */
  padding-top: 40vh;
  align-items: center;

`;

const InvitationBlock = styled.div`
  width: 25vw;
  height: 10vh;
  /* margin-top: 20vh; */
  /* margin-bottom: 0vh; */
  display: flex;
  align-items: center;
  margin-left: 2rem;
  /* background-color: #2d2911; */
  color: #2d2911;
  border-radius: 10px;
  font-size: 2rem;
  /* border: 3px red solid; */
  display: flex;
  justify-content: space-between;
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
              {invitation.sender}<br></br>
               {/* 방 번호 : {' '}
               <br />
              {invitation.roomCode} */}
              <div>
                <button
                  onClick={() => {
                    onClickDecision(
                      true,
                      `${invitation.invitationSeq}`,
                      `${invitation.roomCode}`,
                    );
                  }}
                >
                  승낙
                </button>
                <button
                  onClick={() => {
                    onClickDecision(
                      false,
                      `${invitation.invitationSeq}`,
                      `${invitation.roomCode}`,
                    );
                  }}
                >
                  거절
                </button>
              </div>
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
    </MyPageContentBlock>
  );
};

export default MyPageContent;