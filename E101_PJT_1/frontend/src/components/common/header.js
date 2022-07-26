import styled from "styled-components";
// import Responsive from "./Responsive";
// import Button from './Button';
import HeaderMenu from "./headerMenu";
import background from '../../media/images/headerMenuBackGround.png'
import { Link } from "react-router-dom";


const HeaderBlock = styled.div`
  position: fixed;
  display: flex;  
  flex-direction: column;
  width: 15vw;
  height: 100vh;
  /* background: black; */  
  background: url(${background});  
  border:10px solid #352208;
  background-size: cover; 
`;

const ProfileBox = styled.div` 
  margin: 2px 0.5rem;
  height: 30%;
  border: 3px solid yellow;
  /* background: blue;   */
`

const MenuBox = styled.div`    
  /* padding: 2rem;   */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0px 0.5rem;
  margin-bottom: 2rem;
  border: 3px solid skyblue;
  height: 70%;
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
  return (
    <>
      <HeaderBlock>
        <ProfileBox></ProfileBox>
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