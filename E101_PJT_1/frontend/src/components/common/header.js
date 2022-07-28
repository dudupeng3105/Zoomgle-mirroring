import styled from "styled-components";
// import Responsive from "./Responsive";
// import Button from './Button';
import HeaderMenu from "./headerMenu";
import logo from '../../media/images/smallLogo.png'
import background from '../../media/images/headerMenuBackGround.png'
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';


const HeaderBlock = styled.div`
  position: fixed;
  display: flex;  
  flex-direction: column;
  width: 15vw;
  height: 100vh;
  /* background: black; */  
  background: url(${background});  
  border:10px solid #352208;
  background-size: contain; 
`;

const ProfileBox = styled.div` 
  height: 30vh;
  border: 3px solid yellow;
  display: flex;  
  justify-content: center;
  align-items: center;
  /* background: blue;   */
`

const ProfileLogo = styled.div`
  height: 50%;
  width: 100%; 
  background: url(${logo}) no-repeat center;
  background-size: contain;
  cursor: pointer;
`

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
`

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
  const { nickname } = useSelector((state) => ({
    nickname: state.auth.user.nickname
  }));  

  return (
    <>
      <HeaderBlock>
        <ProfileBox>
          <ProfileLogo onClick={() => navigate('/mypage')}><h2>닉네임: {nickname}</h2></ProfileLogo>
        </ProfileBox>
        <MenuBox>
        <HeaderMenu to="/joingame/" MenuName={'모험참여/생성'}></HeaderMenu>
        <HeaderMenu to="/friends/" MenuName={'동료명단'}></HeaderMenu>
        <HeaderMenu to="/pictures/" MenuName={'사진첩'}></HeaderMenu>
        <HeaderMenu to="/profile/" MenuName={'내 정보'}></HeaderMenu>
        </MenuBox>        
      </HeaderBlock>
      <Spacer />
      <Separator />
    </>
  );
};

export default Header;