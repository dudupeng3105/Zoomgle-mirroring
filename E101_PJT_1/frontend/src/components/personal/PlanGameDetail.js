import styled from 'styled-components';
import CustomDatePicker from '../utils/CustomDatePicker';
import PersonNumCounter from '../utils/PersonNumCounter';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
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

import {
  InviteFriendButton,
  CloseModalbutton,
  ModalTitle,
  FriendListModal,
  FriendCardContainer,
  FriendModalBack
} from '../utils/GameNumCounter';
import friendModalBack from "../../media/images/friendModal.jpg";
import knifePaper from '../../media/images/knifePaper1.png';
import title from '../../media/images/title.png';
import leatherSquare from '../../media/images/leather_square.png';

import btnClickSound from '../../media/sounds/05_btn.wav';

// 모험 참여 생성의 아래칸 : 모험 생성 및 게임 예약하기
const PlanGameDetailBlock = styled.div`  
  width: 100%;
  height: 35vh;
  display: flex;
  flex-direction: column;
  /* background: url(${knifePaper}) center no-repeat; */
  background-size: 70vw 35vh;
`;

// 모험 생성 글자
const PlanGameDetailTitle = styled.div`
  font-size: 5vmin;
  width: 18vw;
  height: 10vh;
  background: url(${title}) no-repeat center;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: 18vw 10vh;
  margin-left: 10vw;
  margin-bottom: 0;
`;

const PlanGameDetailOption = styled.div`
  height: 10vh;
  width: 80vw;
  display: flex;
  justify-content: left;
  align-items: center;
`;

// 시간 설정 인원 설정 텍스트
const PlanGameDetailOptionName = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  width: 20vw;
  margin-right: 10vw;
  font-size: 2.5rem;
  color: #412e22;
`;
// 모험 생성 버튼
const PlanGameApplyBtn = styled.div`  
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4vmin;
  /* font-weight: bold; */  
  text-align: center;
  width: 15vw;
  height: 10vh;
  left: 80vw;
  top: 73vh;
  color: white;
  cursor: pointer;
  background: url(${leatherSquare}) center no-repeat;
  background-size: 15vw 10vh;    
  &:hover {        
    transform: scale(1.1);
  }
`;

const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
  width: 20vw;
  font-size: 2rem;
  color: red;
`;

// 친구 초대하기 모달
const GameInvitationModal = styled.div`
  position: absolute;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items:center;
  overflow-y: scroll;
  overflow-x: hidden;
  /* overflow: auto; */
  padding: 2rem;
  left: 30vw;
  top: 10vh;
  width: 35vw;
  height: 90vh;
  border: 2px solid white;
  background: url(${friendModalBack}) center no-repeat;
  background-size: 35vw 90vh;
  z-index: 1;
  margin-left: 10vw;
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

const PlanGameDetail = () => {
  const dispatch = useDispatch();


  const today = new Date();
  let hour = today.getHours();
  let minute = today.getMinutes();
  minute = Math.floor(minute / 15);
  minute++;
  if (minute >= 4) {
    minute %= 4;
    hour++;
  }
  minute *= 15;

  const [startDate, setStartDate] = useState(
    setHours(setMinutes(today, minute), hour),
  );

  const [count, setCount] = useState(2);
  const [newDate, setNewDate] = useState(0);
  const [error, setError] = useState('');
  // 친구 초대하기 모달 토글
  const [modalToggle, setModalToggle] = useState(false);
  const [inviteRoomCode, setInviteRoomCode] = useState(0);

  const userId = useSelector((state) => state.auth.user.userId);
  const myFriendsList = useSelector((state) => state.friend.friendList);
  const gamePlanList = useSelector((state) => state.gamePlan.gamePlanList);
  let currentRoomCode = 1000;
  console.log(gamePlanList);
  if (gamePlanList.length === 0 || !gamePlanList) {
    currentRoomCode = 1000;
  } else {
    currentRoomCode = gamePlanList[gamePlanList.length - 1].roomCode;
  }
  console.log(currentRoomCode);

  // gamePlanList가 바뀔때마다 발동
  // useEffect(() => {
  //   setModalToggle(!modalToggle);
  // }, []);

  const roomCode = inviteRoomCode;
  const onDateChangeHandler = (givenDate) => {
    setStartDate(givenDate);
    const temp =
      givenDate.getMonth() +
      1 +
      '/' +
      givenDate.getDate() +
      '/' +
      givenDate.getFullYear() +
      ' ' +
      givenDate.getHours() +
      ':' +
      givenDate.getMinutes() +
      ':00';
    setNewDate(temp);
  };

  const onClickHandler = () => {
    if (newDate === 0) {
      setError('날짜를 선택해주세요');
    } else {
      setError(null);
      console.log(newDate, count);
      const planInfo = {
        date: newDate,
        maxCapacity: count,
      };
      dispatch(gamePlanActions.createGamePlanStart(planInfo));
      console.log(roomCode);
      // 게임생성하고 모달
      setTimeout(() => {
        setModalToggle(!modalToggle);
      }, 500);
    }
  };

  // 친구 초대 모달 닫기
  const onClickModalCloser = () => {
    setModalToggle(!modalToggle);
  };

  const onClickInviteHandler = (roomCode) => {
    setInviteRoomCode(roomCode);
    setModalToggle(!modalToggle);
  };

  // 친구 초대하기
  const onClickSendInvitation = (friendNickname) => {
    console.log(friendNickname, currentRoomCode);
    const inviteInfo = {
      receiver: friendNickname,
      roomCode: currentRoomCode,
    };
    dispatch(gamePlanActions.sendInvitaionStart(inviteInfo));
  };

  function btnClick() {
    var audio = new Audio(btnClickSound);
    audio.play();
  }

  // useEffect(() => {
  //   dispatch(friendActions.GetFriendListStart(userId))
  //   dispatch(gamePlanActions.getGamePlanListStart());
  // }, []);

  return (
    <PlanGameDetailBlock>
      <PlanGameDetailTitle>모험 생성</PlanGameDetailTitle>
      {/* 달력 */}
      <PlanGameDetailOption>
        <PlanGameDetailOptionName>시간</PlanGameDetailOptionName>
        <CustomDatePicker
          startDate={startDate}
          setStartDate={setStartDate}
          onDateChangeHandler={onDateChangeHandler}
        />
        <ErrorMessage>{error}</ErrorMessage>
      </PlanGameDetailOption>
      {/* Personcounter */}
      <PlanGameDetailOption>
        <PlanGameDetailOptionName>인원</PlanGameDetailOptionName>
        <PersonNumCounter count={count} setCount={setCount} />
      </PlanGameDetailOption>

      {/* 모달 */}
      {modalToggle && (
        <FriendModalBack>
          <ModalTitle>동료 명단</ModalTitle>
          <CloseModalbutton onClick={onClickModalCloser}>X</CloseModalbutton>
          <FriendListModal>
            {/* roomcode */}
            {/* <p>{myGamePlanList[count].roomCode}</p> */}
            {/* 모달 닫기 버튼 */}

            {myFriendsList.map((friend, idx) => (
              <FriendCardContainer>
                <FriendCard key={`friend-${idx}`}>
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
                  onClick={() => {
                    btnClick();
                    onClickSendInvitation(`${friend.nickname}`)}}
                ></InviteFriendButton>
              </FriendCardContainer>
            ))}
          </FriendListModal>
        </FriendModalBack>
      )}

      <PlanGameApplyBtn
        onClick={() => {
          btnClick();
          onClickHandler(`${currentRoomCode}`);
        }}
      >
        모험 생성
      </PlanGameApplyBtn>
    </PlanGameDetailBlock>
  );
};

export default PlanGameDetail;
