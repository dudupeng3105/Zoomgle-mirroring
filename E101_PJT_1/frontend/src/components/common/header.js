import styled from 'styled-components';
// import Responsive from "./Responsive";
// import Button from './Button';
import HeaderMenu from './headerMenu';
import logo from '../../media/images/smallLogo.png';
import background from '../../media/images/transParentFlag.png';
import profile1 from '../../media/images/profile1.png';
import profile2 from '../../media/images/profile2.png';
import profile3 from '../../media/images/profile3.png';
import profile4 from '../../media/images/profile4.png';
import profile5 from '../../media/images/profile5.png';
import profile6 from '../../media/images/profile6.png';
import logout from '../../media/images/logoutArrow.png';


import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store/auth-slice';

const HeaderBlock = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 18vw;
  height: 100vh;
  /* background: black; */
  background: url(${background}) no-repeat center;
  background-size: 18vw 115vh;
  /* border: 10px solid #352208; */
`;

const ProfileBox = styled.div`
  width: 18vw;
  height: 30vh;
  /* border: 3px solid yellow; */
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  .profileImg0 {
    background: url(${profile1}) no-repeat center;
    background-size: 20vmin 20vmin;
    /* padding-top: 30px; */
  }
  .profileImg1 {
    background: url(${profile2}) no-repeat center;
    background-size: 15vmin 15vmin;
  }
  .profileImg2 {
    background: url(${profile3}) no-repeat center;
    background-size: 20vmin 20vmin;
  }
  .profileImg3 {
    background: url(${profile4}) no-repeat center;
    background-size: 20vmin 20vmin;
  }
  .profileImg4 {
    background: url(${profile5}) no-repeat center;
    background-size: 20vmin 20vmin;
  }
  .profileImg5 {
    background: url(${profile6}) no-repeat center;
    background-size: 20vmin 20vmin;
  }
`;

const ProfileLogo = styled.div`
  height: 50%;
  width: 70%;
  cursor: pointer;
  /* background-color: #352208; */
  /* border: 1px solid #b39860; */
  /* #352208 */
  border-radius: 5px;
`;

const MenuBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  /* border: 3px solid skyblue; */
  height: 38vh;
  `;
  /* background: yellow;   */

const LogoutButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3.5vmin;  
  width: 18vw;
  height: 8vh;
  margin-left: 0.5vw;
  text-align: center;
  background: url(${logout}) no-repeat center;
  /* background-color: #352208; */
  background-size: 6vw 6vh;
  color: black;  
  padding-bottom: 6vh;
  margin-top: 6vh;
  /* border: 2px red solid; */
  cursor: pointer;
  &:hover {
    transform:scale(1.2);
  }
`;

/*
  헤더가 fixed로 되어 있기 때문에 페이지의 콘텐츠가 4rem 아래에 나타나도록 해 주는 컴포넌트
*/
const Spacer = styled.div`
  width: 18vw;
  height: 100vh;
  background: transparent;
`;

// const Separator = styled.div`
//   width: 20px;
//   height: 100vh;
//   background: #e2d6ba;
// `;


const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { nickname,profileImgNum } = useSelector((state) => ({
    nickname: state.auth.user.nickname,
    profileImgNum: state.auth.user.profileImgNum
  }));

  return (
    <>
      <HeaderBlock>
        <ProfileBox>
          <ProfileLogo onClick={() => navigate('/mypage')} className={`profileImg${profileImgNum%6}`}>
            {/* <h2>이미지 : {profileImgNum}</h2> */}
            {/* <h2>닉네임: {nickname}</h2> */}
          </ProfileLogo>
        </ProfileBox>
        <MenuBox>
          <HeaderMenu to="/mypage/" MenuName={'내 모험기지'}></HeaderMenu>
          <HeaderMenu to="/joingame/" MenuName={'모험참여/생성'}></HeaderMenu>
          <HeaderMenu to="/friends/" MenuName={'동료명단'}></HeaderMenu>
          <HeaderMenu to="/pictures/" MenuName={'모험일지'}></HeaderMenu>
          <HeaderMenu to="/profile/" MenuName={'내 정보'}></HeaderMenu>
        </MenuBox>
        <LogoutButton onClick={() => 
            {
              dispatch(authActions.logout())
              navigate('/')
              // 새로고침해야 데이터 안 남아있음
              window.location.reload();
            }
          }>퇴장
          </LogoutButton>
        
      </HeaderBlock>
      <Spacer />
      {/* <Separator /> */}
    </>
  );
};

export default Header;
