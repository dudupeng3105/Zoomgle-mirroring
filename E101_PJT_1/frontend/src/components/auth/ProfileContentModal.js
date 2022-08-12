import styled from 'styled-components';
import background from '../../media/images/albumSmaller.png';
import ProfileInfoBox from './ProfileInfoBox.js';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store/auth-slice';
import profile0 from '../../media/images/profile1.png';
import profile1 from '../../media/images/profile2.png';
import profile2 from '../../media/images/profile3.png';
import profile3 from '../../media/images/profile4.png';
import profile4 from '../../media/images/profile5.png';
import profile5 from '../../media/images/profile6.png';
import profileback from '../../media/images/profile_back1.png';

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
  /* border: 3px solid black; */
  background: url(${background}) no-repeat center;
  background-size: 80vw 100vh;
  /* border: solid black 3px; */
`;

const ProfileContentBox = styled.div`
  display: flex;
  width: 80%;
  height: 80vh;
  /* border: 3px solid yellow; */
  background-size: contain;
`;

const ProfileImgBox = styled.div`
  width: 40vmin;
  height: 30vmin;
  /* border: 2px solid black; */
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(${profileback});
  background-size: 40vmin 30vmin;
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

const ProfileInfoBoxContainer = styled.form`
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
  /* margin-left: 25vw; */
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
  border-right: 1rem solid black;
`;

const ProfileRightBtn = styled.div`
  width: 0;
  height: 0;
  border-radius: 10px;
  border-top: 1rem solid transparent;
  border-bottom: 1rem solid transparent;
  border-left: 1rem solid black;
`;

const ProfileCenter = styled.div`
  width: 90%;
  height: 100%;
`;

const InputNameBox = styled.div`
  width: 28vw;
  display: flex;
  height: 13vh;
  margin-left: 30vw;
  border: 1px solid blue;
`;

const InputName = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.8rem;
`;

const ErrorBox = styled.div`
  height: 10vh;
  width: 20vw;  
  font-size: 4vmin;
  color: red;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ErrorButtonBlock = styled.div`
  display: flex;
  width: 45vw;
  justify-content: space-between;
  text-align: center;
`

const StyledInput = styled.input`
  font-family: 'East Sea Dokdo', cursive;
  background: transparent;
  border: 2px solid #000000;
  border-radius: 5px;
  font-size: 5vmin;
  padding: 1rem 0.5rem;
  width: 80%;
  height: 9vh;
  margin-top: 2vh;
  ::placeholder {
    font-size: 2.5rem;
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
  const { userId, email, name, nickname, profileImgNum } = useSelector(
    (state) => state.auth.user,
  );
  const dispatch = useDispatch();
  const [passwordChangeToggle, setpasswordChangeToggle] = useState(false);
  const [imgNum, setImgNum] = useState(1);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    userId: userId,
    name: name,
    email: email,
    password: '',
    validPassword: '',
    nickname: nickname,
    profileImgNum: profileImgNum,
  });

  // 1. 인풋 변경 이벤트 핸들러
  const onChange = (e) => {
    let { name, value } = e.target;
    const changeValue = {
      ...form,
      [name]: value,
    };
    setForm(changeValue);
    // console.log(form);
  };

  // 2. 프로필 변경 요청
  const profileChangeSubmit = () => {
    console.log(form);
    // 요청전에 유효성 체크(필드 다 있는지)
    // 통과못하면 error 띄워주고 수정완료 안됨
    // 이메일 유효성 검사
    const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    if (!(regExp.test(form.email))) {
      setError('이메일 형식을 확인해주세요');
      return;
    }
    if (!(form.nickname && form.password)) {
      console.log('칸을 모두 채워주세요')
      setError('칸을 모두 채워주세요');
      return;
    }
    // 비번 일치한지
    if (form.password === form.validPassword) {
      // 통과 시 요청하고 수정완료
      // dispatch
      const paylodForm = {
        userId: form.userId,
        name: form.name,
        email: form.email,
        password: form.password,        
        nickname: form.nickname,
        profileImgNum: imgNum,
      }
      dispatch(authActions.updateUser(paylodForm));
      // 수정 완료 처리(이거 순서대로되게 해야함)
      setError(''); // 에러초기화
      setpasswordChangeToggle(!passwordChangeToggle);
    } else {
      console.log('비밀번호를 확인해주세요')
      setError('비밀번호를 확인해주세요');
    }
  };

  return (
    <ProfileContentModalBlock>
      <ProfileContentModalBackGround>
        <ProfileContentBox>
          {/* <ProfileImgBox>
              <ProfileCenter className={'profileImg' + imgNum}></ProfileCenter>
            </ProfileImgBox> */}

          {/* <ProfileImgBox>
            <ProfileLeftBtn onClick={() => setImgNum((imgNum - 1) % 6)} />
            <ProfileCenter className={'profileImg' + imgNum}></ProfileCenter>
            <ProfileRightBtn onClick={() => setImgNum((imgNum + 1) % 6)} />
          </ProfileImgBox> */}
          {!passwordChangeToggle ? (
            
            <ProfileInfoBoxContainer>
              <ProfileImgBox>
                {/* <ProfileLeftBtn onClick={() => setImgNum((imgNum - 1) % 6)} /> */}
                <ProfileCenter className={'profileImg' + imgNum}></ProfileCenter>
                {/* <ProfileRightBtn onClick={() => setImgNum((imgNum + 1) % 6)} /> */}
              </ProfileImgBox>
              <InputNameBox>
                <InputName>닉네임:</InputName>
                <ProfileInfoBox info={nickname} />
              </InputNameBox>
              <InputNameBox>
                <InputName>이메일:</InputName>
                <ProfileInfoBox info={email} />
              </InputNameBox>
              <InputNameBox>
                <InputName>비밀번호:</InputName>
                <ProfileInfoBox info={'********'} />
              </InputNameBox>
              <PasswordChangeButton
                onClick={() => setpasswordChangeToggle(!passwordChangeToggle)}
              >
                회원정보 수정
              </PasswordChangeButton>
            </ProfileInfoBoxContainer>
          ) : (
            <ProfileInfoBoxContainer>
              <ProfileImgBox>
                <ProfileLeftBtn onClick={() => setImgNum((imgNum - 1) % 6)} />
                <ProfileCenter className={'profileImg' + imgNum}></ProfileCenter>
                <ProfileRightBtn onClick={() => setImgNum((imgNum + 1) % 6)} />
              </ProfileImgBox>
              <InputNameBox>
                <InputName>닉네임:</InputName>
                <StyledInput
                  value={form.nickname}
                  name="nickname"
                  placeholder="닉네임"
                  onChange={onChange}
                ></StyledInput>
              </InputNameBox>
              <InputNameBox>
                <InputName>이메일:</InputName>
                <StyledInput
                  value={form.email}
                  name="email"
                  placeholder="이메일"
                  type="email"
                  onChange={onChange}
                ></StyledInput>
              </InputNameBox>
              <InputNameBox>
                <InputName>새 비밀번호:</InputName>
                <StyledInput
                  placeholder="새 비밀번호"
                  value={form.password}
                  type="password"
                  name="password"
                  autoComplete="off"
                  onChange={onChange}
                ></StyledInput>
              </InputNameBox>
              <InputNameBox>
                <InputName>비밀번호 확인:</InputName>
                <StyledInput
                  placeholder="비밀번호 확인"
                  value={form.validPassword}
                  name="validPassword"
                  type="password"
                  autoComplete="off"
                  onChange={onChange}
                ></StyledInput>
              </InputNameBox>
              <ErrorButtonBlock>
                <ErrorBox>{error}</ErrorBox>
                <PasswordChangeButton
                  onClick={() => profileChangeSubmit()}
                >
                  수정 완료
                </PasswordChangeButton>                
              </ErrorButtonBlock>
            </ProfileInfoBoxContainer>
          )}
        </ProfileContentBox>
      </ProfileContentModalBackGround>
    </ProfileContentModalBlock>
  );
};

export default ProfileContentModal;
