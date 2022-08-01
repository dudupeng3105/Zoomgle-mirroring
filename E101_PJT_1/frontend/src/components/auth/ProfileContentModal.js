import styled from "styled-components";
import background from '../../media/images/albumSmaller.png'
import ProfileInfoBox from "./ProfileInfoBox.js";
import { useState } from "react";
import { useSelector } from "react-redux";

const ProfileContentModalBlock = styled.div`
  width: 80vw;
  height: 100vh;  
  color: black;  
  /* border: 3px solid white; // 나중에 지워야함. 동욱 화이팅~*/
  display: flex;   
  justify-content: center;
  align-items: center;
  /* background-size: auto auto; */
`;

const ProfileContentModalBackGround = styled.div`
  display: flex;      
  width: 80vw;
  height: 100vh;  
  justify-content: center;
  align-items: center;
  border: 3px solid black;
  background: url(${background}) no-repeat center;
  background-size: 80vw 100vh;
  /* border: solid black 3px; */
`;

const ProfileContentBox = styled.div`
  display: flex;      
  width: 80%;
  height: 80vh;  
  border: 3px solid yellow;
  background-size: contain;
`

const ProfileImgBox = styled.div`
  width: 40vmin;
  height: 30vmin;
  border: 2px solid black;
`;

const ProfileInfoBoxContainer = styled.div`
  margin-left: 5vmin;
  width: 100%;
  display: flex;
  flex-direction: column;
`

const PasswordChangeButton = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;  
  width: 20vw;
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

const ProfileContentModal = () => {
  // 1. state 에서 user 가져오기
  const {email, name, nickname, profileImgNum} = useSelector((state) => state.auth.user );
  const [passwordChangeToggle, setpasswordChangeToggle] = useState(false);
  
  // 2. props 시키기
  return (
    <ProfileContentModalBlock>
      <ProfileContentModalBackGround>
        <ProfileContentBox>
          <ProfileImgBox>안녕</ProfileImgBox>
          <ProfileInfoBoxContainer>
            <ProfileInfoBox title={'닉네임'} info={profileImgNum} />
            <ProfileInfoBox title={'이메일'} info={nickname} />
            <ProfileInfoBox title={'비밀번호'} info={nickname} />
            <PasswordChangeButton
              onClick={() => setpasswordChangeToggle(!passwordChangeToggle)}
            
            
            >패스워드변경</PasswordChangeButton>
            {passwordChangeToggle ? (
              <ProfileInfoBox title={'새 비밀번호'} info={email} />
            ) : (
              ''
            )}
            {passwordChangeToggle ? (
              <ProfileInfoBox title={'비밀번호 확인'} info={name} />
            ) : (
              ''
            )}
          </ProfileInfoBoxContainer>
        </ProfileContentBox>
      </ProfileContentModalBackGround>
    </ProfileContentModalBlock>
  );
};

export default ProfileContentModal;