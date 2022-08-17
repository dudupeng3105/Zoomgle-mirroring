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
  font-size: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
`;

const UpCommingGameTitleandNotion = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 70vw;
  height: 10vh;
  margin-top: 10vh;
  margin-left: 9.8vw;
  margin-bottom: 0;
  font-size: 4vmin;  
  color: #29231c;
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

  // 첫 렌더링시 디스패치
  useEffect(() => {
    if (myGamePlanList.length === 0) {
      return;
    } else {
      setCount(myGamePlanList.length-1);
    }    
  }, myGamePlanList);

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
      <UpCommingGameTitleandNotion>
        <UpCommingGameTitle>예정된 모험</UpCommingGameTitle>
        <p>모험시작 30분 전부터 입장할 수 있다.</p>      
      </UpCommingGameTitleandNotion>
      
      {myGamePlanList.length === 0 ? (
        <InfoMessage>
          <p>준비할 모험이 없다.</p>
          <p>모험을 꾸리거나, 모험단 요청을 받으시오</p>
        </InfoMessage>
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