import styled from "styled-components";
import background from '../../media/images/Papyrus.png'
import menuImage1 from '../../media/images/startMenuSignup.png'
import menuImage2 from '../../media/images/startMenuLogin.png'
import { Link } from "react-router-dom";

const StartPageModalBlock = styled.div`
  width: 36vw;
  height: 70vh;  
  color: black;  
  /* border: 3px solid white; // 나중에 지워야함. */
  display: flex;   
  justify-content: center;
  align-items: center;
  /* background-size: auto auto; */
`;

const StartPageModalBackGround = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;  
  width: 100%;
  height: 100%;  
  background: url(${background}) no-repeat center;
  background-size: contain;
`;

const StartPageModalMenu1 = styled(Link)`
  width: 20vw;
  height: 15vh;    
  background: url(${menuImage1}) no-repeat center;
  background-size: contain;
  :hover {
    transform: scale(1.1);
    transition: transform .2s;
  }    
`;

const StartPageModalMenu2 = styled(Link)`
  width: 20vw;
  height: 15vh;    
  background: url(${menuImage2}) no-repeat center;
  background-size: contain;
  :hover {
    transform: scale(1.1);
    transition: transform .2s;
  }  
`;

const StartPageModal = () => {
  return (
    <StartPageModalBlock>
      <StartPageModalBackGround>
        <StartPageModalMenu1 to="/signup/"></StartPageModalMenu1>
        <StartPageModalMenu2 to="/login/"></StartPageModalMenu2>
      </StartPageModalBackGround>
    </StartPageModalBlock>
  );
};

export default StartPageModal;