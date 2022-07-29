import styled from "styled-components";
import background from '../../media/images/album.png'
import { Link } from "react-router-dom";
import ProfileContent from "../personal/ProfileContent";
import ProfileInfoBox from "./ProfileInfoBox.js";
import { useSelector } from "react-redux";

const AuthPageModalBlock = styled.div`
  width: 70vw;
  height: 100vh;  
  color: black;  
  /* border: 3px solid white; // 나중에 지워야함. */
  display: flex;   
  justify-content: center;
  align-items: center;
  /* background-size: auto auto; */
`;

const AuthPageModalBackGround = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;  
  width: 100%;
  height: 100%;  
  background: url(${background}) no-repeat center;
  background-size: contain;
  /* border: solid black 3px; */
`;

// const AuthPageModalMenu1 = styled(Link)`
//   width: 20vw;
//   height: 15vh;    
//   /* background: url(${menuImage1}) no-repeat center; */
//   /* background-size: contain; */
//   :hover {
//     transform: scale(1.1);
//     transition: transform .2s;
//   }    
// `;

// const AuthPageModalMenu2 = styled(Link)`
//   width: 20vw;
//   height: 15vh;    
//   /* background: url(${menuImage2}) no-repeat center; */
//   /* background-size: contain; */
//   :hover {
//     transform: scale(1.1);
//     transition: transform .2s;
//   }  
// `;

const AuthPageModal = () => {
  // 1. state 에서 user 가져오기
  const {email, name, nickname, profileImgNum} = useSelector((state) => state.auth.user );
  
  // 2. props 시키기
  return (
    <AuthPageModalBlock>
      <AuthPageModalBackGround>
        <ProfileInfoBox info={profileImgNum}/>
        <ProfileInfoBox info={nickname}/>
        <ProfileInfoBox info={email}/>
        <ProfileInfoBox info={name}/>
      </AuthPageModalBackGround>
    </AuthPageModalBlock>
  );
};

export default AuthPageModal;