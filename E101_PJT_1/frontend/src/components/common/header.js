import styled from 'styled-components';
// import Responsive from "./Responsive";
// import Button from './Button';
import HeaderMenu from './headerMenu';
import logo from '../../media/images/smallLogo.png';
import background from '../../media/images/headerMenuBackGround.png';
import profile1 from '../../media/images/profile1.png';
import profile2 from '../../media/images/profile2.png';
import profile3 from '../../media/images/profile3.png';
import profile4 from '../../media/images/profile4.png';
import profile5 from '../../media/images/profile5.png';
import profile6 from '../../media/images/profile6.png';
import logout from '../../media/images/logout.png';


import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store/auth-slice';

const HeaderBlock = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 15vw;
  height: 100vh;
  /* background: black; */
  background: url(${background});
  border: 10px solid #352208;
  background-size: contain;
`;

const ProfileBox = styled.div`
  height: 30vh;
  border: 3px solid yellow;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .profileImg1 {
    background: url(${profile1}) no-repeat center;
    background-size: contain;
    /* padding-top: 30px; */
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
  .profileImg5 {
    background: url(${profile5}) no-repeat center;
    background-size: cover;
  }
  .profileImg6 {
    background: url(${profile6}) no-repeat center;
    background-size: contain;
  }
`;

const ProfileLogo = styled.div`
  height: 90%;
  width: 90%;
  cursor: pointer;
  /* background-color: #352208; */
  border: 3px solid #b39860;
  /* #352208 */
  
  border-radius: 5px;
  

`;

const MenuBox = styled.div`
  /* padding: 2rem;   */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0px 0.5rem;
  margin-bottom: 2rem;
  border: 3px solid skyblue;
  height: 70vh;
  /* background: yellow;   */
`;

const LogoutButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4vmin;
  height: 10%;
  text-align: center;
  background: url(${logout}) no-repeat center;
  /* background-color: #352208; */
  background-size: contain;
  /* border: 3px solid #b39860; */
  color: white;
  border-radius: 5px;
  /* border: 2px red solid; */
  padding:0;
  cursor: pointer;
  /* &:hover {
    background: #e2d6ba;
    color: black;
    border: 3px solid #29231c;
  } */
`;

/*
  헤더가 fixed로 되어 있기 때문에 페이지의 콘텐츠가 4rem 아래에 나타나도록 해 주는 컴포넌트
*/
const Spacer = styled.div`
  width: 17vw;
  height: 100vh;
  background: #e2d6ba;
`;

const Separator = styled.div`
  width: 20px;
  height: 100vh;
  background: #e2d6ba;
`;


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
          <ProfileLogo onClick={() => navigate('/mypage')} className={`profileImg${profileImgNum}`}>
            {/* <h2>이미지 : {profileImgNum}</h2> */}
            {/* <h2>닉네임: {nickname}</h2> */}
          </ProfileLogo>
        </ProfileBox>
        <MenuBox>
       
          <HeaderMenu to="/joingame/" MenuName={'모험참여/생성'}></HeaderMenu>
          <HeaderMenu to="/friends/" MenuName={'동료명단'}></HeaderMenu>
          <HeaderMenu to="/pictures/" MenuName={'사진첩'}></HeaderMenu>
          <HeaderMenu to="/profile/" MenuName={'내 정보'}></HeaderMenu>
         
        </MenuBox>
        <LogoutButton onClick={() => 
            {
              dispatch(authActions.logout())
              navigate('/')
            }
          }>
          </LogoutButton>
        
      </HeaderBlock>
      <Spacer />
      <Separator />
    </>
  );
};

export default Header;
