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
import arrowRight from '../../media/images/arrowRight.png';
import arrowLeft from '../../media/images/arrowLeft.png';
import friendModalBack from '../../media/images/friendModal.jpg';
import closeButton from '../../media/images/closeLeatherButton1.png';
import friendModalTitle from '../../media/images/friendModalTitle.png';
import friendInviteButton from '../../media/images/friendInviteButton.png';
import btnClickSound from '../../media/sounds/05_btn.wav';

const GameNumCounterBlock = styled.div`
  /* border: 3px solid blue; */
  width: 80vw;
  height: 20vh;
  /* border: 2px solid black; */
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    font-size: 5vmin;
  }
`;

const GameNumCounterLeftBtn = styled.div`
  width: 5vw;
  height: 3vh;
  margin-right: 2vw;
  margin-top: 8vh;
  background: url(${arrowLeft}) no-repeat center;
  background-size: 5vw 3vh;

  :hover {
    transform: scale(1.2);
  }
`;

const GameNumCounterRightBtn = styled.div`
  width: 5vw;
  height: 4vh;
  margin-left: 2vw;
  margin-top: 8vh;
  background: url(${arrowRight}) no-repeat center;
  background-size: 5vw 4vh;

  :hover {
    transform: scale(1.2);
  }
`;

const PlannedGameInfoBox = styled.div`
  height: 60vh;
  width: 60vw;
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
  font-size: 5vmin;
  background: url(${title}) no-repeat center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 18vw;
  height: 10vh;
  background-size: 18vw 10vh;
  /* margin-top: 7vh; */
  margin-right: 5vw;
  margin-bottom: 0;
  color: black;
`;


// 번호 일자 대장
const PlannedGameInfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60vw;
  height: 5vh;
  font-size: 4vmin;
  background-color: transparent;
  padding-top: 0;
  color: #412e22;
  /* padding-top: 15vh; */
  margin-top: 1vh;
  /* border: 1px yellow solid; */
  & p {
    /* margin: 0; */
    color: #412e22;
    font-size: 4.5vmin;
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
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: ${(props) => props.backImg} center no-repeat;
  background-size: 15vw 10vh;
  color: white;
  font-size: 4vmin;
  :hover {
    transform: scale(1.1);
  }
`;

export const FriendModalBack = styled.div`
  position: absolute;
  top: 4vh;
  left: 40vw;
  z-index: 1;
  display: flex;
  align-items: flex-start;
  padding-top: 15vh;
  border-radius: 10px;
  width: 35vw;
  height: 85vh;
  background: url(${friendModalBack}) center no-repeat;
  background-size: 35vw 78vh;

  &.success {
    border: 5px solid #94a04e;
  }

  &.fail {
    border: 5px solid #a70000;
  }
`;

export const FriendListModal = styled.div`
  /* position: absolute;
  border-radius: 10px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 2rem;
  left: 45vw;
  top: 5vh;
  width: 35vw;
  height: 54vh;
  margin-top: 12vh;
  /* border: 1px solid black; */
`;

export const InviteFriendButton = styled.button`  
  background: url(${friendInviteButton}) center no-repeat;
  background-size: 3.5vw 7vh;
  width: 3.5vw;
  height: 7vh;
  cursor: pointer;
  border: none;
  margin-top: 1vh;
  :hover {
    transform: scale(1.05);
  }
  :active {
    transform: scale(0.95);
  }
  /* border: solid green 3px; */
  /* padding-left: 3vw; */
  /* margin-left: 24.8vw; */
  /* margin-top: 3.5vh; */
`;

export const CloseModalbutton = styled.button`
  background: url(${closeButton}) center no-repeat;
  position: absolute;
  top: 5vh;
  right: 2vw;
  background-size: 4vw 5vh;
  border: none;
  width: 4vw;
  height: 5vh;
  margin-left: 25vw;
  margin-top: 0;
  cursor: pointer;
  :hover {
    transform: scale(1.05);
  }
  :active {
    transform: scale(0.95);
  }
`;

export const FriendCardContainer = styled.div`
  width: 31vw;
  height: 18vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalTitle = styled.div`
  position: absolute;
  background: url(${friendModalTitle}) center no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: 20vw 10vh;
  width: 20vw;
  height: 10vh;
  top: 5vh;
  left: 5vw;
  font-size: 5vmin;
  padding-top: 1vh;
  color: white;
  margin-top: 0;
`;

export const ModalErrorText = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20vw;
  height: 5vh;
  top: 20.5vh;
  left: 7vw;
  font-size: 5vmin;
  padding-top: 1vh;
  color:${(props) => props.textColor};
  margin-top: 0;
`;

export const RoomCodeText = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20vw;
  height: 5vh;
  top: 13vh;
  /* text-decoration: underline; */
  left: 21vw;
  font-size: 3.5vmin;
  padding-top: 1vh;
  color: white;
`;

// const GameNumCounter = ({count, setCount, myGamePlanList}) => {
const GameNumCounter = ({ count, setCount, myGamePlanList }) => {
  // 초대장 보내기 버튼 클릭하면 친구목록 불러오기
  const navigate = useNavigate();
  // const myGamePlanList = useSelector((state) => state.gamePlan.gamePlanList)
  const { nickname } = useSelector((state) => state.auth.user);
  const myFriendsList = useSelector((state) => state.friend.friendList);
  const invitationResult = useSelector((state) => state.gamePlan.invitationResult)

  const [modalToggle, setModalToggle] = useState(false);
  const [inviteRoomCode, setInviteRoomCode] = useState(0);
  const [modalEffect, setModalEffect] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    console.warn(modalEffect,"DFsfsf", invitationResult);
    if (invitationResult === 1) {
      setModalEffect('success')
      setTimeout(() => {
        dispatch(gamePlanActions.resetResult());
      }, 5000); 
    } 
    else if (invitationResult === 2) {
      setModalEffect('fail')
      setTimeout(() => {
        dispatch(gamePlanActions.resetResult());
      }, 5000);      
    } else {
      setModalEffect('')
    } 
  }, [invitationResult]);

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
    dispatch(gamePlanActions.resetResult());
  };

  const onClickDeleteGame = (roomCode) => {
    console.warn(roomCode);
    if (count !== 0) {
      setCount(count - 1);
    }    
    dispatch(gamePlanActions.deleteGamePlanStart(roomCode));
  };

  const stringToTime = (givenString) => {
    const temp = new Date(givenString);
    const nowDate = new Date();
    const diff = parseInt((temp - nowDate) / 60000);
    // console.log(diff);
    if (diff < 30) {
      return true;
    } else {
      return false;
    }
  };

  function btnClick() {
    var audio = new Audio(btnClickSound);
    audio.play();
  }

  return (
    <GameNumCounterBlock>
      <GameNumCounterLeftBtn
        onClick={() => {
          onDecrease();
          btnClick();
        }}
      />
      <PlannedGameInfoBox>
        {/* <UpCommingGameTitle>예정된 모험</UpCommingGameTitle> */}
        {/* <UpCommingGameTitle>예정된 모험</UpCommingGameTitle> */}
        <PlannedGameInfoItem>
          <p>번호 :{myGamePlanList[count].roomCode}</p>
          <p>대장 :{myGamePlanList[count].host}</p>
        </PlannedGameInfoItem>
        <PlannedGameInfoItem>
          <p>
            모험 일자: {myGamePlanList[count].year}년{' '}
            {myGamePlanList[count].month}월 {myGamePlanList[count].day}일{' '}
            {myGamePlanList[count].hour}시 {myGamePlanList[count].minute}분
          </p>
        </PlannedGameInfoItem>
        <PlannedGameInfoItem>
          <p>
            대원목록:{' '}
            {myGamePlanList[count].playerList
              .map((player, idx) => player.user)
              .join(',  ')}
          </p>
        </PlannedGameInfoItem>
        <ButtonContainer>
          <ButtonContainerItem
            backImg={`url(${SquareLeather})`}
            onClick={() => {
              btnClick();
              onClickSearchFriendList(`${myGamePlanList[count].roomCode}`);
            }}
          >
            동료 초대
          </ButtonContainerItem>
          {stringToTime(
            `${myGamePlanList[count].year}-${myGamePlanList[count].month}-${myGamePlanList[count].day} ${myGamePlanList[count].hour}:${myGamePlanList[count].minute}:00`,
          ) ? (
            <ButtonContainerItem
              backImg={`url(${SquareLeather})`}
              onClick={() => {
                btnClick();
                onClickJoinGame(
                  `${myGamePlanList[count].roomCode}`,
                  `${myGamePlanList[count].maxCapacity}`,
                  `${myGamePlanList[count].host}`,
                );
              }}
            >
              모험 시작
            </ButtonContainerItem>
          ) : (
            ''
          )}
          {nickname === myGamePlanList[count].host ? (
            <ButtonContainerItem
              backImg={`url(${SquareLeather})`}
              onClick={() => {
                btnClick();
                onClickDeleteGame(`${myGamePlanList[count].roomCode}`);
              }}
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
          <FriendModalBack>
            <ModalTitle>동료 명단</ModalTitle>
            <RoomCodeText>{myGamePlanList[count].roomCode}번방</RoomCodeText>
            {modalEffect === 'success' ? (
              <ModalErrorText textColor=
              {'#e2d6ba'}>초대를 완료했다.</ModalErrorText>
            ) : (
              ''
            )}
            {modalEffect === 'fail' ? (
              <ModalErrorText textColor=
              {'#e2d6ba'}>이미 모험에 초대했다.</ModalErrorText>
            ) : (
              ''
            )}
            <CloseModalbutton onClick={onClickModalCloser}></CloseModalbutton>
            <FriendListModal>
              {/* roomcode */}
              {/* <p>{myGamePlanList[count].roomCode}</p> */}
              {/* 모달 닫기 버튼 */}

              {myFriendsList.map((friend, idx) => (
                <FriendCardContainer key={`friend-${idx}`}>
                  <FriendCard>
                    <StyledCard>
                      <ImageContainer>
                        <ProfileImg
                          className={
                            'profileImg' + (friend.profile_Img_Num % 6)
                          }
                          // className={'profileImg' + 1}
                        ></ProfileImg>
                      </ImageContainer>
                      <NameNicknameEl>
                        <div>이름: {friend.name}</div>
                        <div>닉네임: {friend.nickname}</div>
                      </NameNicknameEl>
                    </StyledCard>
                  </FriendCard>
                  <InviteFriendButton
                    onClick={() =>
                      onClickReservedGameInvitation(`${friend.nickname}`)
                    }
                  ></InviteFriendButton>
                </FriendCardContainer>
              ))}
            </FriendListModal>
          </FriendModalBack>
        )}

        {/* <p>{JSON.stringify(myGamePlanList[count].playerList)}</p> */}
      </PlannedGameInfoBox>
      <GameNumCounterRightBtn
        onClick={() => {
          onIncrease();
          btnClick();
        }}
      />
    </GameNumCounterBlock>
  );
};

export default GameNumCounter;
export { UpCommingGameTitle };
