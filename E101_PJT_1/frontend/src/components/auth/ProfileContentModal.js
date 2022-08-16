import styled from 'styled-components';
import background from '../../media/images/MyInfoBackImg.png';
import ProfileInfoBox from './ProfileInfoBox.js';
import { useState } from 'react';
import { useEffect } from 'react';
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
  width: 83vw;
  height: 100vh;
  color: black;  
  display: flex;
  justify-content: center;
  align-items: flex-start;  
`;

const ProfileContentModalBackGround = styled.div`
  display: flex;
  width: 83vw;
  height: 90vh;
  justify-content: center;
  align-items: center;  
  background: url(${background}) no-repeat center;
  background-size: 83vw 90vh;
  
`;

const ProfileContentBox = styled.div`
  display: flex;
  width: 70vw;
  height: 75vh;  
  /* border: 3px solid yellow; */
  transform: rotate(-3deg);
  background-size: contain;
`;

const ProfileImgBox = styled.div`
  width: 40vmin;
  height: 30vmin;
  /* border: 2px solid black; */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 12vh;
  margin-left: 2vw;
  transform: rotate(-7deg);
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

const ProfilePictureContainer = styled.form`  
  width: 50%;
  display: flex;
  /* border: 1px solid blue; */
  flex-direction: column;
`;

const ProfileStoryContainer = styled.form`  
  width: 50%;
  display: flex;
  /* border: 1px solid green; */
  flex-direction: column;
  font-size: 4vmin;
`;

// const ProfileInfoBoxContainer = styled.form`  
//   width: 50%;
//   display: flex;
//   border: 1px solid blue;
//   flex-direction: column;
// `;

const ChangePossibleInfo = styled.div`
  margin-top: 7vh;
  width: 100%;
  padding-left: 10%;
  p {
    font-size: 4vmin;
  }
`
const ProfileInfoTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 5vmin;
  height: 8vh;
`

const ProfileInfoRightBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  padding-right: 2vw;
  font-size: 3.5vmin;
  height: 10vh;
`

const ProfileInfoSagaBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;
  padding-left: 5vw;
  margin-top: 8vh;
  font-size: 5vmin;
  height: 35vh;
  & div {
    display: flex;
  }
  & div.right {
    padding-left: 30%;
  }
  & div.var-color {
    color: blue;
  }  
`

const PasswordChangeButton = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5vh;
  width: 10vw;
  /* margin-left: 25vw; */
  font-size: 3vmin;
  /* margin-left: 60%; */
  background-color: #352208;
  border: 3px solid #b39860;
  color: white;
  border-radius: 5px;
  &:hover {
    background: #e2d6ba;
    color: black;
    border: 3px solid #29231c;
  }
  &.profile-amend {
    margin-left: 23vw;
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
  align-items: center;
  height: 15vh;
  margin-left: 4vw;
  /* border: 1px solid blue; */
`;

const InputName = styled.div`
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
`;

const ErrorBox = styled.div`
  height: 5vh;
  width: 20vw;  
  font-size: 3.5vmin;
  color: red;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ErrorButtonBlock = styled.div`
  display: flex;  
  align-items: center;
  justify-content: center ;
  width: 34.5vw;  
  /* border: 1px solid blue; */
  text-align: center;
`

const AmendOverButtonContainer = styled.div`
  display: flex;
  height: 5vh;
  width: 34.5vw;
  /* border: 1px solid blue; */
  justify-content: flex-end;
  padding-top: 1vh;  
`

const StyledInput = styled.input`
  font-family: 'East Sea Dokdo', cursive;  
  background: transparent;
  border: 2px solid #000000;
  border-radius: 5px;
  font-size: 4vmin;
  padding: 0.2rem 0.5rem;
  width: 70%;
  height: 6vh;  
  ::placeholder {
    font-size: 2.5rem;
  }  
  &.read-only-input {
    border: 0px    
  }  
`;

const FakeInput = styled.div`
  width: 28vw;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left: 2vw;
`

const ProfileContentModal = () => {
  // 1. state 에서 user 가져오기
  const { userId, email, name, nickname, profileImgNum } = useSelector(
    (state) => state.auth.user,
  );
  const propfileInfo = useSelector(
    (state) => state.auth.propfileInfo,
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

  // 첫 렌더링시 디스패치
  useEffect(() => {
    dispatch(authActions.getUserProfileInfoStart());
  }, []);

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

    // 닉네임 6글자 체크
    if (form.nickname.length > 6) {      
      setError('닉네임은 6글자 이하입니다.');
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
          {!passwordChangeToggle ? (
            <>
              <ProfilePictureContainer>
                <ProfileImgBox>
                  <ProfileCenter
                    className={'profileImg' + imgNum}
                  ></ProfileCenter>
                </ProfileImgBox>
                <ChangePossibleInfo>
                  <p>닉네임: {nickname}</p>
                  <p>이메일: {email}</p>
                  <p>암호: *********</p>
                </ChangePossibleInfo>

                <PasswordChangeButton
                  onClick={() => setpasswordChangeToggle(!passwordChangeToggle)}
                  className={'profile-amend'}
                >
                  회원정보 수정
                </PasswordChangeButton>
              </ProfilePictureContainer>
              <ProfileStoryContainer>
                <ProfileInfoTitle>모험 보고서</ProfileInfoTitle>
                <ProfileInfoRightBox>
                  <p>보고자: {propfileInfo.nickname}</p>
                  {propfileInfo.reg_dtm ? (
                    <p>모험참여일: {propfileInfo.reg_dtm.slice(0, 10)}</p>
                  ) : (
                    ''
                  )}
                  <p>연락처: {propfileInfo.email}</p>
                </ProfileInfoRightBox>
                <ProfileInfoSagaBox>
                  <div>
                    <div className="var-color">
                      {propfileInfo.pastGameCount}
                    </div>
                    번째 모험 보고서
                  </div>
                  <div>
                    지금까지 &nbsp;
                    <div className="var-color">{propfileInfo.friendCount}</div>
                    명의
                  </div>
                  <div className="right">동료들과 함께하였고</div>
                  <div>
                    앞으로도 &nbsp;
                    <div className="var-color">
                      {propfileInfo.futureGameCount}
                    </div>{' '}
                    번의
                  </div>
                  <div className="right">모험을 떠날 것이다.</div>
                  <div>
                    <div className="var-color">{propfileInfo.mvpCount}</div>번
                    '공략자'
                  </div>
                  <div className="right">로서 모험을 종료했다.</div>
                </ProfileInfoSagaBox>
              </ProfileStoryContainer>
            </>
          ) : (
            <>
              <ProfilePictureContainer>
                <ProfileImgBox>
                  <ProfileLeftBtn onClick={() => setImgNum((imgNum - 1) % 6)} />
                  <ProfileCenter
                    className={'profileImg' + imgNum}
                  ></ProfileCenter>
                  <ProfileRightBtn
                    onClick={() => setImgNum((imgNum + 1) % 6)}
                  />
                </ProfileImgBox>
              </ProfilePictureContainer>
              <ProfileStoryContainer>
                <InputNameBox>
                  <FakeInput>닉네임: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`${form.nickname}`}</FakeInput>                  
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
                  <InputName>새 암호:</InputName>
                  <StyledInput
                    placeholder="새 암호"
                    value={form.password}
                    type="password"
                    name="password"
                    autoComplete="off"
                    onChange={onChange}
                  ></StyledInput>
                </InputNameBox>
                <InputNameBox>
                  <InputName>암호 확인:</InputName>
                  <StyledInput
                    placeholder="암호 확인"
                    value={form.validPassword}
                    name="validPassword"
                    type="password"
                    autoComplete="off"
                    onChange={onChange}
                  ></StyledInput>
                </InputNameBox>
                <ErrorButtonBlock>
                  <ErrorBox>{error}</ErrorBox>
                </ErrorButtonBlock>
                <AmendOverButtonContainer>
                  <PasswordChangeButton onClick={() => profileChangeSubmit()}>
                    수정 완료
                  </PasswordChangeButton>
                  <PasswordChangeButton
                    onClick={() => setpasswordChangeToggle(!passwordChangeToggle)}
                  >
                    수정 취소
                  </PasswordChangeButton>
                </AmendOverButtonContainer>
              </ProfileStoryContainer>
            </>
          )}
        </ProfileContentBox>
      </ProfileContentModalBackGround>
    </ProfileContentModalBlock>
  );
};

export default ProfileContentModal;

