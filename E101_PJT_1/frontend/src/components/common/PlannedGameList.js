import styled from 'styled-components';
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
import GameNumCounter from "../utils/GameNumCounter";
import nailPaper from '../../media/images/nailPaper1.png';
import { UpCommingGameTitle } from '../utils/GameNumCounter';

// 모험 참여 생성의 윗 칸 : 예정된 모험 

const PlannedGameListBlock = styled.div`
  /* border: 1px solid white; */
  width: 80vw;
  height: 45vh;
  /* background: url(${nailPaper}) center no-repeat; */
  /* background-size: 75vw 60vh; */
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

const InfoMessage = styled.div`
  font-size: 2rem;
  display: flex;
  justify-content: center;
`;


const PlannedGameList = () => {
  const dispatch = useDispatch();

  const myGamePlanList = useSelector((state) => state.gamePlan.gamePlanList);
  const userId = useSelector((state) => state.auth.user.userId);
  const myFriendsList = useSelector((state) => state.friend.friendList);  
  
  
  const [count, setCount] = useState(0);
  const [modalToggle, setModalToggle] = useState(false);
  const [inviteRoomCode, setInviteRoomCode] = useState(0);
  // const onClickHandler = (roomCode) => {
  //   setInviteRoomCode(roomCode);
  //   setModalToggle(!modalToggle);
  // };

  const onClickModalCloser = () => {
    setModalToggle(!modalToggle);
  };

  const onClickSendInvitation = (friendNickname) => {
    console.log(friendNickname, inviteRoomCode);
    const inviteInfo = {
      receiver: friendNickname,
      roomCode: inviteRoomCode
    }
    dispatch(gamePlanActions.sendInvitaionStart(inviteInfo))
  };

  
  // useEffect(() => {
  //   dispatch(friendActions.GetFriendListStart(userId))
  //   dispatch(gamePlanActions.getGamePlanListStart());    
  // }, []);

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
                    className={'profileImg' + (friend.profile_Img_Num % 6)}
                    // className={'profileImg' + 1}
                  ></ProfileImg>
                </ImageContainer>
                <NameNicknameEl>
                  <div>이름: {friend.name}</div>
                  <div>닉네임(seq): {friend.nickname}</div>
                </NameNicknameEl>
              </StyledCard>
              <button
                onClick={() => onClickSendInvitation(`${friend.nickname}`)}
              >
                초대장보내기
              </button>
            </FriendCard>
          ))}
        </GameInvitationModal>
      )}
      {/* 예정된 모험 */}
      <UpCommingGameTitle>예정된 모험</UpCommingGameTitle>
      {myGamePlanList.length === 0 ? (
        <InfoMessage>예정된 게임이 없습니다.</InfoMessage>
      ) : (
        <GameNumCounter
          count={count}
          setCount={setCount}
          myGamePlanList={myGamePlanList}
        />
      )}
      {/* <p>{count}</p> */}
    </PlannedGameListBlock>
  );
};

export default PlannedGameList;