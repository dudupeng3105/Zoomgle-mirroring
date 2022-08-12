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
import nailPaper from '../../media/images/nailPaper1.png';
import title from '../../media/images/title.png';
import SquareLeather from '../../media/images/leather_square.png';
const GameNumCounterBlock = styled.div`
  /* border: 3px solid blue; */
  width: 60vw;
  margin-left: 7vw;
  height: 20vh;
  /* border: 2px solid black; */
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

  :hover {
    transform: scale(1.2) rotate(-30deg);
    -webkit-transform: scale(1.2);
    -moz-transform: scale(1.2);
    -ms-transform: scale(1.2);
    -o-transform: scale(1.2);
  }
`;

const GameNumCounterRightBtn = styled.div`
  width: 5vw;
  height: 2vw;
  margin-left: 2vw;
  border-radius: 10px;
  border-top: 1rem solid transparent;
  border-bottom: 1rem solid transparent;
  border-left: 1rem solid grey;

  :hover {
    transform: scale(1.2) rotate(-30deg);
    -webkit-transform: scale(1.2);
    -moz-transform: scale(1.2);
    -ms-transform: scale(1.2);
    -o-transform: scale(1.2);
  }
`;

const PlannedGameInfoBox = styled.div`
  height: 60vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* background: url(${nailPaper}) center no-repeat;
  background-size: 75vw 60vh; */
  margin-top: 40vh;
  border-radius: 5px;

  color: black;
`;

// 예정된 모험 글자
// export해서 plannedGameList에서 사용중
const UpCommingGameTitle = styled.div`
  font-size: 3rem;
  background:url(${title}) no-repeat center;
  width: 16vw;
  height: 12vh;
  background-size: 16vw 12vh ;
  padding-left: 1.5rem;
  padding-top: 1vh;
  /* margin-left: 10vw; */
  margin-top: 3vh;
  margin-left: 11vw;
  margin-bottom: 0;
  /* text-decoration: underline; */
  /* border: 3px solid red; */
`
// 번호 일자 대장
const PlannedGameInfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60vw;
  height: 5vh;
  font-size: 2.5rem;
  background-color: transparent;
  padding-top: 0;
  color: #412E22;
  /* padding-top: 15vh; */
  margin-top: 3vh;
  /* border: 1px yellow solid; */
  & p {
    /* margin: 0; */
    color: #412E22;
    font-size: 2.5rem;
  }
`;

const ButtonContainer = styled.div`
  height: 9vh;
  width: 60vw;
  text-align: center;
  display: flex;
  font-size: 2rem;
  border-radius: 5px;
  /* border: red solid 2px; */
  color: black;
  /* background-color: white; */
  margin-top: 3vh;
`;

const ButtonContainerItem = styled.div`
  width: 100%;
  /* border: 1px solid white; */
  cursor: pointer;
  background: ${(props) => props.backImg} center no-repeat;
  background-size: 15vw 10vh;
  color: white;
  padding-top: 4px;
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
  width: 50vw;
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

  const onClickJoinGame = (roomCode, capacity, host) => {
    navigate('/openvidutest', {
      state: {
        sessionNickname: nickname,
        sessionRoomId: roomCode,
        sessionCapacity: capacity,
        sessionHost: host,
      },
    });
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
      {/* <UpCommingGameTitle>예정된 모험</UpCommingGameTitle> */}
        <PlannedGameInfoItem>
          <div>번호 :{myGamePlanList[count].roomCode}</div>
          <div>대장 :{myGamePlanList[count].host}</div>
        </PlannedGameInfoItem>
        <PlannedGameInfoItem>
          모험 일자: {myGamePlanList[count].year}년{' '}
          {myGamePlanList[count].month}월 {myGamePlanList[count].day}일{' '}
          {myGamePlanList[count].hour}시 {myGamePlanList[count].minute}분
        </PlannedGameInfoItem>
        <PlannedGameInfoItem>

          {myGamePlanList[count].playerList.map((player, idx) => (
            <p>{player.user}</p>
          ))}
        </PlannedGameInfoItem>
        <ButtonContainer>
          <ButtonContainerItem
            backImg={`url(${SquareLeather})`}
            onClick={() =>
              onClickSearchFriendList(`${myGamePlanList[count].roomCode}`)
            }
          >
            동료 초대
          </ButtonContainerItem>
          {stringToTime(
            `${myGamePlanList[count].year}-${myGamePlanList[count].month}-${myGamePlanList[count].day} ${myGamePlanList[count].hour}:${myGamePlanList[count].minute}:00`,
          ) ? (
            <ButtonContainerItem
            backImg={`url(${SquareLeather})`}
              onClick={() =>
                onClickJoinGame(`${myGamePlanList[count].roomCode}`, `${myGamePlanList[count].maxCapacity}`, `${myGamePlanList[count].host}`)
              }
            >
              모험 시작
            </ButtonContainerItem>
          ) : (
            ''
          )}
          {nickname === myGamePlanList[count].host ? (
            <ButtonContainerItem
            backImg={`url(${SquareLeather})`}
              onClick={() =>
                onClickSearchFriendList(`${myGamePlanList[count].roomCode}`)
              }
            >
              {' '}
              모험 취소
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
export {UpCommingGameTitle};
