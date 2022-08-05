import styled from 'styled-components';
import { PlanGameDetailTitle } from '../personal/PlanGameDetail';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { gamePlanActions } from '../../store/gamePlan-slice';
import { friendActions } from '../../store/friends-slice';
import {
  FriendCard,
  StyledCard,
  ImageContainer,
  ProfileImg,
  NameNicknameEl,
} from '../personal/FriendsContent';

const PlannedGameListBlock = styled.div`
  border: 3px solid white;
  width: 100%;
  height: 30vh;
`;

const PlannedGameBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 3px solid black;
  width: 80%;
  margin: auto;
  height: 5vh;
  background-color: white;
  font-size: 2rem;
`;

const GameInvitationBtn = styled.div`
  font-size: 1.5rem;
  width: 10vw;
  text-align: center;
  color: white;
  cursor: pointer;
  background: #29231c;
  border: 3px solid #b39860;
  border-radius: 5px;
  &:hover {
    background: #e2d6ba;
    color: black;
    border: 3px solid #29231c;
  }
`;

const GameInvitationModal = styled.div`
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
`;

const PlannedGameList = () => {
  const dispatch = useDispatch();

  const myGamePlanList = useSelector((state) => state.gamePlan.gamePlanList);
  const userId = useSelector((state) => state.auth.user.userId);
  const myFriendsList = useSelector((state) => state.friend.friendList);  
  
  

  const [modalToggle, setModalToggle] = useState(false);
  const [inviteRoomCode, setInviteRoomCode] = useState(0);
  const onClickHandler = (roomCode) => {
    setInviteRoomCode(roomCode);
    setModalToggle(!modalToggle);
  };

  const onClickModalCloser = () => {
    setModalToggle(!modalToggle);
  };

  const onClickSendInvitation = (friendId) => {
    console.log(friendId, inviteRoomCode);
    const inviteInfo = {
      receiver: friendId,
      roomCode: inviteRoomCode
    }
    dispatch(gamePlanActions.sendInvitaionStart(inviteInfo))
  };
  
  useEffect(() => {
    dispatch(friendActions.GetFriendListStart(userId))
    dispatch(gamePlanActions.getGamePlanListStart());    
  }, []);

  return (
    <PlannedGameListBlock>
      {modalToggle && (
        // 모험참여/생성 -> 초대장 보내기 모달
        <GameInvitationModal>
          <button onClick={onClickModalCloser}>닫기</button>
          {myFriendsList.map((friend, idx) => (
            <FriendCard key={idx}>
              <StyledCard>
                <ImageContainer>
                  <ProfileImg
                    className={'profileImg' + (friend.profileImgNum % 6)}
                    // className={'profileImg' + 1}
                  ></ProfileImg>
                </ImageContainer>
                <NameNicknameEl>
                  <div>이름: {friend.userId}</div>
                  <div>닉네임(seq): {friend.nickname}</div>
                </NameNicknameEl>
              </StyledCard>
              <button onClick={() => onClickSendInvitation(`${friend.userId}`)}>초대장보내기</button>
            </FriendCard>
          ))}
        </GameInvitationModal>
      )}
      <PlanGameDetailTitle>예정된 모험(4개만 보여줌)</PlanGameDetailTitle>
      {myGamePlanList.map((Plan, idx) => (
        <PlannedGameBlock key={idx}>
          방 번호 {Plan.roomCode}의 게임
          <p>{Plan.date}</p>
          <p>{Plan.host}</p>
          <p>{Plan.playerList[0].user}</p>
          <GameInvitationBtn
            onClick={() => {
              onClickHandler(`${Plan.roomCode}`);
            }}
          >
            초대장보내기
          </GameInvitationBtn>
        </PlannedGameBlock>
      ))}
    </PlannedGameListBlock>
  );
};

export default PlannedGameList;

// game plan index state 선언
// 