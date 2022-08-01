import styled from 'styled-components';
import background from '../../media/images/albumSmaller.png';
import ProfileInfoBox from './ProfileInfoBox.js';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import profile0 from '../../media/images/profile1.png';
import profile1 from '../../media/images/profile2.png';
import profile2 from '../../media/images/profile3.png';
import profile3 from '../../media/images/profile4.png';
import profile4 from '../../media/images/profile5.png';
import profile5 from '../../media/images/profile6.png';

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
`;

const ProfileImgBox = styled.div`
  width: 40vmin;
  height: 30vmin;
  border: 2px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  .profileImg0 {
    background: url(${profile0}) no-repeat center;
    background-size: 20vmin 20vmin;
  }
  .profileImg1 {
    background: url(${profile1}) no-repeat center;
    background-size: 20vmin 20vmin;
  }
  .profileImg2 {
    background: url(${profile2}) no-repeat center;
    background-size: 20vmin 20vmin;
  }
  .profileImg3 {
    background: url(${profile3}) no-repeat center;
    background-size: 20vmin 20vmin;
  }
  .profileImg4 {
    background: url(${profile4}) no-repeat center;
    background-size: 20vmin 20vmin;
  }
  .profileImg5 {
    background: url(${profile5}) no-repeat center;
    background-size: 20vmin 20vmin;
  }
`;

const ProfileInfoBoxContainer = styled.div`
  margin-left: 5vmin;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const PasswordChangeButton = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
  width: 20vw;
  margin-left: 25vw;
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
`;

const ProfileLeftBtn = styled.div`
  width: 0;
  height: 0;
  border-radius: 10px;
  border-top: 1rem solid transparent;
  border-bottom: 1rem solid transparent;
  border-right: 1rem solid grey;
`;

const ProfileRightBtn = styled.div`
  width: 0;
  height: 0;
  border-radius: 10px;
  border-top: 1rem solid transparent;
  border-bottom: 1rem solid transparent;
  border-left: 1rem solid grey;
`;

const ProfileCenter = styled.div`
  width: 90%;
  height: 100%;
`;

/**
 * 스타일링된 input
 */
const StyledInput = styled.input`
  background: transparent;
  border: 3px solid #000000;
  border-radius: 5px;
  font-size: 1.2rem;
  padding: 1rem 0.5rem;
  width: 100%;
  height: 13vh;
  ::placeholder {
    font-size: 1.2rem;
  }
  &:focus {
    border: 3px solid white;
    ::placeholder {
      color: transparent;
    }
    /* border-bottom: 1px solid yellow; */
  }
`;

const ProfileContentModal = () => {
  // 1. state 에서 user 가져오기
  const { email, name, nickname, profileImgNum } = useSelector(
    (state) => state.auth.user,
  );
  const [passwordChangeToggle, setpasswordChangeToggle] = useState(false);
  const [imgNum, setImgNum] = useState(1);

  // 2. props 시키기
  return (
    <ProfileContentModalBlock>
      <ProfileContentModalBackGround>
        <ProfileContentBox>
          <ProfileImgBox>
            <ProfileLeftBtn onClick={() => setImgNum((imgNum - 1) % 6)} />
            <ProfileCenter className={'profileImg' + imgNum}>
              안녕
            </ProfileCenter>
            <ProfileRightBtn onClick={() => setImgNum((imgNum + 1) % 6)} />
          </ProfileImgBox>
          <ProfileInfoBoxContainer>
            {!passwordChangeToggle ? (
              <ProfileInfoBox title={'닉네임'} info={nickname} />
            ) : (
              ''
            )}
            {passwordChangeToggle ? (
              <StyledInput value={nickname}></StyledInput>
            ) : (
              ''
            )}
            {!passwordChangeToggle ? (
              <ProfileInfoBox title={'이메일'} info={email} />
            ) : (
              ''
            )}
            {passwordChangeToggle ? (
              <StyledInput value={email}></StyledInput>
            ) : (
              ''
            )}
            {!passwordChangeToggle ? (
              <ProfileInfoBox title={'비밀번호'} info={'********'} />
            ) : (
              ''
            )}
            {passwordChangeToggle ? (
              ''
            ) : (
              <PasswordChangeButton
                onClick={() => setpasswordChangeToggle(!passwordChangeToggle)}
              >
                회원정보 수정
              </PasswordChangeButton>
            )}
            {passwordChangeToggle ? (
              <StyledInput
                placeholder='새 비밀번호'
              ></StyledInput>
            ) : (
              ''
            )}
            {passwordChangeToggle ? (
              <StyledInput
              placeholder='비밀번호 확인'
              ></StyledInput>
            ) : (
              ''
            )}
            {!passwordChangeToggle ? (
              ''
            ) : (
              <PasswordChangeButton
                onClick={() => setpasswordChangeToggle(!passwordChangeToggle)}
              >
                수정 완료
              </PasswordChangeButton>
            )}
          </ProfileInfoBoxContainer>
        </ProfileContentBox>
      </ProfileContentModalBackGround>
    </ProfileContentModalBlock>
  );
};

export default ProfileContentModal;
