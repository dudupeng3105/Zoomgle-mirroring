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
  width: 15%;
  height: 100%;
  /* background: black; */  
  background: url(${background});  
  border:10px solid #352208;
  background-size: cover; 
`;

/*
  Responsive 컴포넌트의 속성세 스타일을 추가해서 새로운 컴포넌트 생성
*/
// const Wrapper = styled(Responsive)`
//   height: 4rem;
//   display: flex;
//   align-items: center;
//   justify-content: space-between; // 자식 엘리먼트 사이의 여백을 최대로 설정
//   .logo {
//     font-size: 1.125rem;
//     font-weight: 800;
//     letter-spacing: 2px;
//   }
//   .right {
//     display: flex;
//     align-items: center;
//   }
// `;

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
  width: 17%;  
  height: 1000px;
  background: #e2d6ba;
`;

const Separator = styled.div`  
  width: 20px;  
  height: 1000px;
  background: #e2d6ba;
`;

// const UserInfo = styled.div`
//   font-weight: 800;
//   margin-right: 1rem;
// `;

// { user, onLogout }
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
        {/* <Wrapper>
          <Link to='/' className="logo">
            REACTERS
          </Link>          
          {user ? (
            <div className="right">
              <UserInfo>{user.username}</UserInfo>
              <Button onClick={onLogout}>로그아웃</Button>
            </div>
          ) : (
            <div className="right">
              <Button to='/login'>로그인</Button>
            </div>
          )}          
        </Wrapper> */}
      </HeaderBlock>
      <Spacer />
      <Separator />
    </>
  );
};

export default Header;