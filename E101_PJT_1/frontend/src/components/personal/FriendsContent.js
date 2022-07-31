import styled from 'styled-components';
import { useEffect, useState } from 'react';
import background from '../../media/images/headerMenuBackGround.png';
import { useSelector, useDispatch } from 'react-redux';
import { friendActions } from '../../store/friends-slice';
import profile1 from '../../media/images/profile1.JPG';
import profile2 from '../../media/images/profile2.JPG';
import profile3 from '../../media/images/profile3.JPG';
import profile4 from '../../media/images/profile4.JPG';

const FriendsContentBlock = styled.div`
  background: url(${background});
  width: 100%;
  margin: 10px;
  padding-left: 3vmin;  
  h2 {
    font-size: 3rem;     
    text-decoration: underline;
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
    width: 10px; 
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
`;

const TitleButtonBlock = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 20vmin;
  padding-left: 7vmin;  
  align-items: center;
`;

const FriendAddButton = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 6vmin;  
  width: 18vmin;
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

const FriendCard = styled.div`
  width: 40vmin;
  height: 15vh;
  background-color: white;
  border: 3px solid black;
  margin-top: 3vmin;
  margin-right: 2vmin;
  padding: 1vmin;
  display: flex;
`;

const StyledCard = styled.div`
  background-color: wheat;
  border-radius: 5px;
  width: 100%;
  display: flex;
  .profileImg1 {
    background: url(${profile1}) no-repeat center;
    background-size: cover;
  }
  .profileImg2 {
    background: url(${profile2}) no-repeat center;
    background-size: cover;
  }
  .profileImg3 {
    background: url(${profile3}) no-repeat center;
    background-size: cover;
  }
  .profileImg4 {
    background: url(${profile4}) no-repeat center;
    background-size: cover;
  }
`;

const ProfileImg = styled.div`    
  width: 10vw;
  margin-right: 1rem;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`;

const NameNicknameEl = styled.div`
  font-size: 3vmin;
  display: flex;
  flex-direction: column;
`

const AddFriendModal = styled.div`
  position: absolute;
  width: 45vw;
  /* height: 30vmin; */
  top: 20%;
  left: 35vw;
  background-color: #5dbb63;
  z-index: 1;
  border: 3px solid black;
  border-radius: 5px;
  padding: 3vmin;
  h2 {
    margin: 0px;
  }
  h3 {
    color: yellow;
    font-size: 2.5rem;
    margin: 0px;
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
  font-size: 1.8rem;
  padding: 1rem 0.5rem;
  width: 90%;    
  height: 10vmin;
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

const FriendsContent = () => {
  const [error, setError] = useState(null);
  const [friendIdInput, setFriendIdInput] = useState('');
  const [modalToggle, setmodalToggle] = useState(false);

  const dispatch = useDispatch();

  const friendError = useSelector((state) => state.friend.error);
  const addMessage = useSelector((state) => state.friend.addMessage);
  const userId = useSelector((state) => state.auth.user.userId);
  const friendsArr = useSelector((state) => state.friend.friendList);
  const addResult = useSelector((state) => state.friend.addResult);

  // console.log(friendsArr);

  // 첫렌더링할때만 돌아감
  useEffect(() => {
    dispatch(friendActions.GetFriendListStart(userId))
  }, []);

  useEffect(() => {
    if (friendError) {      
      // 친구가 없거나..
      setError(friendError); // 이걸로 에러메시지 띄움(빨간글씨)
      return;
    }
  }, [friendError, dispatch]);

  const inputChange = (e) => {
    setFriendIdInput(e.target.value);       
  }

  const onClick = (e) => {
    e.preventDefault()
    console.log(userId, friendIdInput)
    const infoId = {
      "myId": userId,
      "friendId": friendIdInput
    }
    dispatch(friendActions.AddFriendStart(infoId))  
    // 성공하면 모달 닫음    
    if (addResult) {
      setTimeout(() => {
        setmodalToggle(!modalToggle);
      }, 500);
    }    
  }

  // console.log(userId);
  const dummyFriends = [
    {
      name: '김동욱',
      nickname: '두두펭',
      profileImgNum: 2,
    },    
  ];
  
  return (
    <FriendsContentBlock>
      {modalToggle ? (
        <AddFriendModal>
          <h2>친애하는 모험가를 추가하세요</h2>
          <StyledInput             
            name="friendId"
            placeholder="모험가의 아이디를 입력하세요."            
            onChange={inputChange}            
          />
          <h3>{addMessage}</h3>
          <FriendAddButton
            onClick={onClick}          
          >추가</FriendAddButton>
        </AddFriendModal>
      ) : (
        ''
      )}
      <TitleButtonBlock>
        <h2>모험단 명단</h2>        
        <FriendAddButton
          onClick={() => {
            setmodalToggle(!modalToggle);
          }}
        >
          <p>친구추가</p>
        </FriendAddButton>
      </TitleButtonBlock>
      <FriendsList>
        <h2>{error}</h2>
        {friendsArr.map((friend, idx) => (
          <FriendCard key={idx}>
            <StyledCard>
              <ProfileImg
                // className={'profileImg' + friend.profileImgNum}
                className={'profileImg' + 1}
              ></ProfileImg>
              <NameNicknameEl>
                <div>이름: {friend.friendId}</div>
                <div>닉네임(seq): {friend.friendSeq}</div>
              </NameNicknameEl>
            </StyledCard>
          </FriendCard>
        ))}
      </FriendsList>
    </FriendsContentBlock>
  );
};

export default FriendsContent;
