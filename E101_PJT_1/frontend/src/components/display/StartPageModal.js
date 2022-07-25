import styled from "styled-components";
import background from '../../media/images/Papyrus.png'
import ribbon from '../../media/images/PapyrusRibbon.png'
import { Link } from "react-router-dom";

const StartPageModalBlock = styled.div`
  width: 36vw;
  height: 70vh;  
  color: black;  
  border: 3px solid white; // 나중에 지워야함.
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

const StartPageModalMenu = styled.div`
  width: 100%;
  height: 30%;  
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  text-align: center justify;
  background: url(${ribbon}) no-repeat center;
  background-size: contain;
  a {
    margin-bottom: 3.2rem;
  }
`;

const StartPageModal = () => {
  return (
    <StartPageModalBlock>
      <StartPageModalBackGround>
        <StartPageModalMenu><Link to="/login/">로그인</Link></StartPageModalMenu>
        <StartPageModalMenu><Link to="/signup/">회원가입</Link></StartPageModalMenu>
      </StartPageModalBackGround>
    </StartPageModalBlock>
  );
};

export default StartPageModal;