import styled from "styled-components";
import background from '../../media/images/Papyrus.png'
import menuImage1 from '../../media/images/startMenuSignup1.png'
import menuImage2 from '../../media/images/startMenuLogin1.png'
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
  &.bigger {
    transform: scale(1.08);
    transition: transform .35s;
  }

  &.smaller{
    transform: scale(0.98);
    transition: transform .35s;
  }
`;

const StartPageModalBackGround = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;  
  width: 100%;
  height: 100%;  
  background: url(${background}) no-repeat center;
  background-size: 36vw 70vh;
`;

const StartPageModalMenu = styled(Link)`
  width: 30vw;
  height: 15vh;    
  background: url(${(props) => (props.backImgName)}) no-repeat center;
  background-size: 25vw 15vh;
  :hover {
    transform: scale(1.1);
    transition: transform .2s;
  }  
`;

const StartPageModal = ({formEffect}) => {
  return (
    <StartPageModalBlock className={formEffect}>
      <StartPageModalBackGround>
        <StartPageModalMenu backImgName={menuImage1} to="/signup/"></StartPageModalMenu>
        <StartPageModalMenu backImgName={menuImage2} to="/login/"></StartPageModalMenu>
      </StartPageModalBackGround>
    </StartPageModalBlock>
  );
};

export default StartPageModal;