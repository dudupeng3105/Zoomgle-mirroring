import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {   
  FriendCard,
  StyledCard,
  ImageContainer,
  ProfileImg,
  NameNicknameEl, } from '../personal/FriendsContent';

const GameNumCounterBlock = styled.div`
  /* border: 3px solid blue; */
  width: 40vmin;
  height: 15vmin;
  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
    font-size: 5vmin;
  }
`;

const GameNumCounterLeftBtn = styled.div`
  width: 0;
  height: 0;
  border-radius: 10px;
  border-top: 1rem solid transparent;
  border-bottom: 1rem solid transparent;
  border-right: 1rem solid grey;
`;

const GameNumCounterRightBtn = styled.div`
  width: 0;
  height: 0;
  border-radius: 10px;
  border-top: 1rem solid transparent;
  border-bottom: 1rem solid transparent;
  border-left: 1rem solid grey;
`;

const PlannedGameInfoBox = styled.div`
  height: 20vh;
  width: 80vw;
  background-color: yellow;
  color: black;  
  & p {
    margin: 0;
    font-size: 0.8rem;
  }
`

const SendInvitationButton = styled.div`
  height: 2vh;
  width: 2vw;
  border: red solid 3px;
  cursor: pointer;
`

const FriendListModal = styled.div`
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

// const GameNumCounter = ({count, setCount, myGamePlanList}) => { 
  const GameNumCounter = ({count, setCount, myGamePlanList}) => { 
  const maxCount = myGamePlanList.length - 1;
  const onIncrease = () => {
    if (count === maxCount) {
      setCount(0)
    } else {
      setCount(count + 1)
    }
  };

  const onDecrease = () => {
    if (count === 0) {
      setCount(maxCount)
    } else {
      setCount(count - 1)
    }
  };

  const onClickSearchFriendList = (roomCode) => {
    console.log(roomCode);
    setModalToggle(!modalToggle);
    console.log(modalToggle)

  }

  const onClickSendInvitation = (friendNickname) => {
    console.log(friendNickname, inviteRoomCode);
    const inviteInfo = {
      receiver: friendNickname,
      roomCode: inviteRoomCode
    }
    dispatch(gamePlanActions.sendInvitaionStart(inviteInfo))
  };

  // 초대장 보내기 버튼 클릭하면 친구목록 불러오기
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user.userId);
  const myFriendsList = useSelector((state) => state.friend.friendList); 
  
  const [modalToggle, setModalToggle] = useState(false);
  const [inviteRoomCode, setInviteRoomCode] = useState(0);

  const onClickModalCloser = () => {
    setModalToggle(!modalToggle);
  };

  return (
    <GameNumCounterBlock>
      <GameNumCounterLeftBtn onClick={onDecrease} />
        <PlannedGameInfoBox>
          <p>{myGamePlanList[count].roomCode}</p>
          <p>{myGamePlanList[count].host}</p>
          <p>{myGamePlanList[count].year}</p>
          <p>{myGamePlanList[count].month}</p>
          <p>{myGamePlanList[count].day}</p>
          <p>{myGamePlanList[count].hour}</p>
          <p>{myGamePlanList[count].minute}</p>
          {myGamePlanList[count].playerList.map((player, idx) => (
            <p key={idx}>{player.user}</p>
          ))}
          <SendInvitationButton onClick = {() => onClickSearchFriendList(`${myGamePlanList[count].roomCode}`)}>초대장보내기</SendInvitationButton>
            {/* 모달 */}
            {modalToggle && 
            <FriendListModal>
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
              <button onClick={() => onClickSendInvitation(`${friend.nickname}`)}>초대장보내기</button>
            </FriendCard>
          ))}
            </FriendListModal>
            
            
            }

          {/* <p>{JSON.stringify(myGamePlanList[count].playerList)}</p> */}
        </PlannedGameInfoBox>
      <GameNumCounterRightBtn onClick={onIncrease} />
    </GameNumCounterBlock>
  );
};

export default GameNumCounter;
