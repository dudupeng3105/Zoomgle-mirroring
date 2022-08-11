import styled from 'styled-components';
import { useEffect, useState } from 'react';
import background from '../../media/images/headerMenuBackGround.png';
import { useSelector, useDispatch } from 'react-redux';
import { friendActions } from '../../store/friends-slice';
import profile1 from '../../media/images/profile1.png';
import profile2 from '../../media/images/profile2.png';
import profile3 from '../../media/images/profile3.png';
import profile4 from '../../media/images/profile4.png';
import profile5 from '../../media/images/profile5.png';
import profile6 from '../../media/images/profile6.png';
import backboard from '../../media/images/board1-2.png';
import papyrus from '../../media/images/Papyrus.png';
import Xmark from '../../media/images/X-mark.png';
import friendbackground from "../../media/images/friendback.png"

const FriendsContentBlock = styled.div`
  background: url(${background});
  width: 100%;
  margin: 10px;
  /* padding-left: 3vmin;   */
  h3 {
    font-size: 3rem; 
    margin-top: 1rem; 
    margin-left: 3.5rem;
    /* display: inline; */
    /* text-decoration: underline; */
  }
`;

const FriendsList = styled.div`
  display: flex;
  width: 90%;
  height: 75vh;
  flex-wrap: wrap;  
  overflow:auto;
  align-content: flex-start;
  justify-content: center;
  margin: auto;
  /* border: 3px black solid; */
  /* SCROLL */
  &::-webkit-scrollbar { 
    width: 15px; 
  }
  /* 스크롤바의 width */
  &::-webkit-scrollbar-track { 
    background-color: b39860; 
    border: 1px black solid;
    border-radius: 10px;
  }
  /* 스크롤바의 전체 배경색 */
  &::-webkit-scrollbar-thumb { 
    background: #352208;
    border-radius: 10px;
  }
  /* 스크롤바 색 */
  &::-webkit-scrollbar-button { 
    display: none; 
    /* color: black; */
  }
  & p {    
    font-size: 3rem;
  }
`;

const TitleButtonBlock = styled.div`
  display: flex;
  justify-content: space-between;
  /* justify-content: center; */
  padding-right: 1vmin;
  /* padding-left: 7vmin;   */
  align-items: center;
  /* border: solid 5px red; */
  width: 60vw;
  margin-left: 8vw;
`;

const FriendAddButton = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 8vh;  
  width: 15vw;
  font-size: 5vmin;
  background-color: #352208;
  border: 3px solid #b39860;
  color: white;
  border-radius: 5px;  
  &:hover {
    background: #e2d6ba;
    color: black;
    border: 3px solid #29231c;
  }
`
const FriendCloseButton = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 8vh;  
  width: 15vw;
  margin-left: 25vw;
  margin-top: 8vw;
  background: url(${Xmark}) no-repeat center;
  background-size: 5vw 8vh;
  display: inline;
  /* border: red solid 3px; */

  font-size: 5vmin;
  /* background-color: #352208; */
  /* border: 3px solid #b39860; */
  /* color: white; */
  /* border-radius: 5px;   */
  &:hover {
    transform: scale(1.1);
    transition: transform .2s;
  }
`



export const FriendCard = styled.div`
  width: 40vmin;
  height: 15vh;
  background-color: white;
  border: 3px solid black;
  margin-top: 3vmin;
  margin-right: 2vmin;
  padding: 1vmin;
  display: flex;
`;

export const StyledCard = styled.div`
  background-color: wheat;
  border-radius: 5px;
  
  width: 100%;
  display: flex;
`;

export const ProfileImg = styled.div`    
  width: 90%;
  height: 90%;
  margin-top: 0.1rem;
  /* margin-right: 1rem;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px; */
  /* padding-top: 15px; */
`;

export const NameNicknameEl = styled.div`
  font-size: 3vmin;
  display: flex;
  flex-direction: column;
  /* border: 5px solid red; */
  margin-top: 0.2rem;
  margin-left: 0.8rem;
`

const AddFriendModal = styled.div`
  position: absolute;
  width: 40vw;
  height: 70vh;
  top: 20%;
  left: 35vw;
  /* background-color: #5dbb63; */
  background: url(${papyrus}) no-repeat;
  background-size: 40vw 70vh;
  z-index: 1;
  /* border: 3px solid black; */
  border-radius: 5px;
  padding: 3vmin;
  h1{
    margin:0;
    /* margin-top: 10vh; */
    display: inline;
  }
  h2 {
    margin: 0px;
  }
  h3 {
    color: #432616;
    font-size: 2rem;
    margin: 0px;
    margin-bottom: 3vh
  }
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledInput = styled.input`
  margin-top: 2vmin;
  margin-bottom: 2vmin;
  margin-left: 1vmin;
  background: #E2D6BA;
  border: 3px solid #000000;
  border-radius: 5px;
  font-size: 1.8em;
  padding: 1rem 0.5rem;
  width: 80%;    
  height: 9vh;
  ::placeholder {
    font-size: 1.8rem;    
  }
  &:focus {
    border: 3px solid white;
    ::placeholder {
      color: transparent;
    }
  }
`;

export const ImageContainer = styled.div`
  width: 40%;
  height: 13vh;
  margin-right: 1rem;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: solid black 5px; */
  .profileImg0 {
    background: url(${profile1}) no-repeat center;
    background-size: cover;
    /* padding-top: 30px; */
    
  }
  .profileImg1 {
    background: url(${profile2}) no-repeat center;
    background-size: cover;
  }
  .profileImg2 {
    background: url(${profile3}) no-repeat center;
    background-size: cover;
  }
  .profileImg3 {
    background: url(${profile4}) no-repeat center;
    background-size: cover;
  }
  .profileImg4 {
    background: url(${profile5}) no-repeat center;
    background-size: cover;
  }
  .profileImg5 {
    background: url(${profile6}) no-repeat center;
    background-size: contain;
  }

`

const BoardImageContainer = styled.div`
  width: 20vw;
  height: 15vh;
  background: url(${backboard}) no-repeat;
  background-size: 20vw 15vh ;
  display: flex;
  justify-content: center; 
  align-items: center;
  font-size: 2.5rem; 
  color: white;  
  margin-top: 1rem;
  margin-left: 3rem;
  margin-bottom: 5vh;  
`

const FriendsContent = () => {
  const [error, setError] = useState(null);
  const [friendNicknameInput, setFriendNicknameInput] = useState('');
  const [modalToggle, setmodalToggle] = useState(false);
  const [addMessageToggle, setAddMessageToggle] = useState(false);

  const dispatch = useDispatch();

  const friendError = useSelector((state) => state.friend.error);
  const addMessage = useSelector((state) => state.friend.addMessage);
  const userId = useSelector((state) => state.auth.user.userId);
  const userNickname = useSelector((state) => state.auth.user.nickname);
  const friendsArr = useSelector((state) => state.friend.friendList);
  const addResult = useSelector((state) => state.friend.addResult);

  

  // 첫렌더링할때랑, addResult 바뀔때마다(친구추가할대마다)
  useEffect(() => {
    dispatch(friendActions.GetFriendListStart(userId))
  }, [addResult]);

  // 친구 추가, 성공 메시지를 0.5초간만 띄움
  useEffect(() => {
    console.log(addMessage);
    if (addMessage) {
      setAddMessageToggle(true);
      setTimeout(() => {
        setAddMessageToggle(false);
      }, 1000);
    }
  }, [addMessage])

  useEffect(() => {
    if (friendError) {      
      // 친구가 없거나..
      setError(friendError); // 이걸로 에러메시지 띄움(빨간글씨)
      return;
    }
  }, [friendError, dispatch]);

  useEffect(() => {

    if (addResult) {
      setTimeout(() => {setmodalToggle(!modalToggle)}, 1000);
    }     
  }, [addResult]);

  const inputChange = (e) => {
    setFriendNicknameInput(e.target.value);       
  }

  // 친구 추가 모달에서 아이디를 검색하고 추가를 누르면 일어나는 일
  const onClick = (e) => {
    e.preventDefault()
    console.log(userNickname, friendNicknameInput)
    const infoId = {
      "myNickname": userNickname,
      "friendNickname": friendNicknameInput
    }
    dispatch(friendActions.AddFriendStart(infoId))  
    // 성공하면 모달 닫음    
    console.log("성공여부", addResult)       
  }
  
  return (
    <FriendsContentBlock>
      {modalToggle ? (
        <AddFriendModal>
          <FriendCloseButton
            onClick={() => {
              setmodalToggle(!modalToggle);
            }}         
          >닫기</FriendCloseButton>
          <h1>친애하는 모험가를 추가하세요</h1>
          <StyledInput             
            name="friendNickname"
            placeholder="닉네임을 입력하세요."            
            onChange={inputChange}            
          />
          {addMessageToggle? <h3>{addMessage}</h3> : ''}
          <FriendAddButton
            onClick={onClick}          
          >추가</FriendAddButton>
           </AddFriendModal>
      ) : (
        ''
      )}
      <TitleButtonBlock>
        <BoardImageContainer>
          모험가 명단
          {/* <h3>모험가 명단</h3>   */}
        </BoardImageContainer>      
        <FriendAddButton
          onClick={() => {
            setmodalToggle(!modalToggle);
          }}
        >
          <p>친구추가</p>
        </FriendAddButton>
      </TitleButtonBlock>
      <FriendsList>
        <p>{friendsArr.length===0 ? '친구를 추가해주세요' : ''}</p>
        {friendsArr.map((friend, idx) => (
          <FriendCard key={idx}>
            <StyledCard>
              <ImageContainer>
                <ProfileImg
                  className={'profileImg' + (friend.profile_Img_Num%6)}
                  // className={'profileImg' + 1}
                ></ProfileImg>
              </ImageContainer>
              <NameNicknameEl>
                <div>이름: {friend.name}</div>
                <div>닉네임(seq): {friend.nickname}</div>
              </NameNicknameEl>
            </StyledCard>
          </FriendCard>
        ))}
      </FriendsList>
    </FriendsContentBlock>
  );
};

export default FriendsContent;
