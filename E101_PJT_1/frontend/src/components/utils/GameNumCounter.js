import React from 'react';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  FriendCard,
  StyledCard,
  ImageContainer,
  ProfileImg,
  NameNicknameEl,
} from '../personal/FriendsContent';
import { gamePlanActions } from '../../store/gamePlan-slice';
import { friendActions } from '../../store/friends-slice';

const GameNumCounterBlock = styled.div`
  /* border: 3px solid blue; */
  width: 80vw;
  margin: 0 auto;
  height: 20vh;
  border: 2px solid black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
    font-size: 5vmin;
  }
`;

const GameNumCounterLeftBtn = styled.div`
  width: 5vw;
  height: 2vw;
  margin-right: 2vw;
  border-radius: 10px;
  border-top: 1rem solid transparent;
  border-bottom: 1rem solid transparent;
  border-right: 1rem solid grey;
`;

const GameNumCounterRightBtn = styled.div`
  width: 5vw;
  height: 2vw;
  margin-left: 2vw;
  border-radius: 10px;
  border-top: 1rem solid transparent;
  border-bottom: 1rem solid transparent;
  border-left: 1rem solid grey;
`;

const PlannedGameInfoBox = styled.div`
  height: 20vh;
  width: 65vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #29231c;
  border-radius: 5px;
  color: black;
`;

const PlannedGameInfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60vw;
  height: 5vh;
  font-size: 2rem;
  background-color: transparent;
  color: white;
  /* border: 1px black solid; */
  & p {
    margin: 0;
  }
`;

const ButtonContainer = styled.div`
  height: 5vh;
  width: 60vw;
  text-align: center;
  display: flex;
  font-size: 2rem;
  border-radius: 5px;
  border: red solid 2px;
  color: black;
  background-color: white;
`;

const ButtonContainerItem = styled.div`
  width: 100%;
  border: 1px solid white;
  cursor: pointer;
  background-color: ${(props) => props.backColor};
`;

const FriendListModal = styled.div`
  position: absolute;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
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
const GameNumCounter = ({ count, setCount, myGamePlanList }) => {
  // 초대장 보내기 버튼 클릭하면 친구목록 불러오기
  const navigate = useNavigate();
  // const myGamePlanList = useSelector((state) => state.gamePlan.gamePlanList)
  const { nickname } = useSelector((state) => state.auth.user);
  const myFriendsList = useSelector((state) => state.friend.friendList);

  const [modalToggle, setModalToggle] = useState(false);
  const [inviteRoomCode, setInviteRoomCode] = useState(0);
  const dispatch = useDispatch();

  const maxCount = myGamePlanList.length - 1;
  const onIncrease = () => {
    if (count === maxCount) {
      setCount(0);
    } else {
      setCount(count + 1);
    }
  };

  const onDecrease = () => {
    if (count === 0) {
      setCount(maxCount);
    } else {
      setCount(count - 1);
    }
  };

  const onClickSearchFriendList = (roomCode) => {
    console.log(roomCode);
    setModalToggle(!modalToggle);
    console.log(modalToggle);
  };

  const onClickJoinGame = (roomCode, capacity) => {
    navigate('/openvidutest', {state: {sessionNickname: nickname, sessionRoomId: roomCode, sessionCapacity: capacity}});
  };

  const onClickReservedGameInvitation = (friendNickname) => {
    console.log(friendNickname);
    const inviteInfo = {
      receiver: friendNickname,
      roomCode: myGamePlanList[count].roomCode,
    };
    dispatch(gamePlanActions.sendInvitaionStart(inviteInfo));
  };

  const onClickModalCloser = () => {
    setModalToggle(!modalToggle);
  };

  const stringToTime = (givenString) => {
    const temp = new Date(givenString);
    const nowDate = new Date();
    const diff = parseInt((temp - nowDate) / 60000);
    console.log(diff);
    if (diff < 30) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <GameNumCounterBlock>
      <GameNumCounterLeftBtn onClick={onDecrease} />
      <PlannedGameInfoBox>
        <PlannedGameInfoItem>
          <div>방 번호 :{myGamePlanList[count].roomCode}</div>
          <div>방장 :{myGamePlanList[count].host}</div>
        </PlannedGameInfoItem>
        <PlannedGameInfoItem>
          게임시작시간: {myGamePlanList[count].year}년{' '}
          {myGamePlanList[count].month}월 {myGamePlanList[count].day}일{' '}
          {myGamePlanList[count].hour}시 {myGamePlanList[count].minute}분
        </PlannedGameInfoItem>
        <PlannedGameInfoItem>
          {myGamePlanList[count].playerList.map((player, idx) => (
            <p>{player.user},</p>
          ))}
        </PlannedGameInfoItem>
        <ButtonContainer>
          <ButtonContainerItem
            backColor={`#adff45`}
            onClick={() =>
              onClickSearchFriendList(`${myGamePlanList[count].roomCode}`)
            }
          >
            모험가 초대하기
          </ButtonContainerItem>
          {stringToTime(
            `${myGamePlanList[count].year}-${myGamePlanList[count].month}-${myGamePlanList[count].day} ${myGamePlanList[count].hour}:${myGamePlanList[count].minute}:00`,
          ) ? (
            <ButtonContainerItem
              backColor={`#FDDFK3`}
              onClick={() =>
                onClickJoinGame(`${myGamePlanList[count].roomCode}`, `${myGamePlanList[count].maxCapacity}`)
              }
            >
              모험떠나기
            </ButtonContainerItem>
          ) : (
            ''
          )}
          {nickname === myGamePlanList[count].host ? (
            <ButtonContainerItem
              backColor={`#eeee45`}
              onClick={() =>
                onClickSearchFriendList(`${myGamePlanList[count].roomCode}`)
              }
            >
              {' '}
              모험취소하기
            </ButtonContainerItem>
          ) : (
            ''
          )}
        </ButtonContainer>
        {/* 모달 */}
        {modalToggle && (
          <FriendListModal>
            <p>{myGamePlanList[count].roomCode}</p>
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
                  onClick={() =>
                    onClickReservedGameInvitation(`${friend.nickname}`)
                  }
                >
                  초대장보내기
                </button>
              </FriendCard>
            ))}
          </FriendListModal>
        )}

        {/* <p>{JSON.stringify(myGamePlanList[count].playerList)}</p> */}
      </PlannedGameInfoBox>
      <GameNumCounterRightBtn onClick={onIncrease} />
    </GameNumCounterBlock>
  );
};

export default GameNumCounter;
