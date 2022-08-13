import styled from "styled-components";
import background from '../media/images/StartPageImage_long.png'
import arrow from '../media/images/arrow.png'
// import Button from "../components/common/Button";
import { useNavigate } from "../../node_modules/react-router-dom/index";
import { Link } from "react-router-dom";
import StartPageModal from "../components/display/StartPageModal";
import StartStoryBoardBlock from "../components/display/StartStoryBoardBlock";
import { authActions } from '../store/auth-slice';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import firstDescription from '../media/images/startpage3.png'
import secondDescription from '../media/images/startpage2.png'
import thirdDescription from '../media/images/startpage1.png'

const StartPageBlock = styled.div`
  width: 100vw;
  height: 500vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-direction: column; 
  background-color: #352208;
  /* overflow: hidden; */
`;

const StartPageContent = styled.div`
  width: 100vw;
  height: 100vh;
  /* position: absolute; */
  /* top: 0;   */
  color: white;
  background: url(${background}) no-repeat center;
  background-size: cover;
  /* border: 3px solid white; */
  display: flex;   
  justify-content: center;
  align-items: center;
  /* background-size: auto auto; */
`;

const StartStoryBoard = styled.div`
  width: 100vw;
  height: 100vh;
  /* position: absolute; */
  /* top: 0;   */
  color: white;
  /* background-color: #352208; */
  /* border: 3px solid white; */
  display: flex;   
  justify-content: center;
  align-items: center;
  /* background-size: auto auto; */
`;

const StartPageSkipBtn = styled.div`
  width: 20vmin;
  height: 20vmin; // vmin = min(vw, vh)
  font-size: 2rem;
  color : white;
  background: url(${arrow}) no-repeat center;
  background-size: contain;
  /* border: 2px solid white; */
  text-align: center;
  cursor: pointer;
  position: absolute;
  bottom: 0;
  right: 4vmin;
  padding-top: 3vmin;  
  :hover {
    transform: scale(1.1);
    transition: transform .2s;
  }
`;

const GameDescription = styled.div`
  width: 50vw;
  height: 60vh;
  background: ${props => `url(${props.backImg}) no-repeat center`};
  background-size: 50vw 60vh;
  transition-property: all;
  transition-duration: 4s;
  transition-timing-function: ease-in-out;
`;

const StartPage = (props) => {
  const dispatch = useDispatch();

  const handleClickEvent = (chapter) => {
    console.log(chapter)
    // console.log(chapter * 100 * window.innerHeight/100)
    window.scrollTo(0, chapter * 100 * window.innerHeight/100);
  } 

  // 0. 컴포넌트가 처음 렌더링 될 때 form 을 초기화함
  useEffect(() => {
    dispatch(authActions.reset());
  }, []);

  // const navigate = useNavigate();

  return (
    <StartPageBlock>
      {/* 최상단 페이지 */}
      <StartPageSkipBtn onClick={() => handleClickEvent(4)}>건너뛰기</StartPageSkipBtn>
      <Link to="/openvidutest/">게임장가기</Link>
      <StartPageContent onClick={() => handleClickEvent(1)}>
        {/* <StartPageSkipBtn onClick={() => navigate('/login')}>건너뛰기</StartPageSkipBtn> */}
        
      </StartPageContent>
      <StartStoryBoardBlock>
        <StartStoryBoard onClick={() => handleClickEvent(2)}>
          <GameDescription backImg={firstDescription}></GameDescription>
        </StartStoryBoard> 
        <StartStoryBoard onClick={() => handleClickEvent(3)}>
          <GameDescription backImg={secondDescription}></GameDescription>
        </StartStoryBoard> 
        <StartStoryBoard onClick={() => handleClickEvent(4)}>
          <GameDescription backImg={thirdDescription}></GameDescription>
        </StartStoryBoard> 
      </StartStoryBoardBlock>
      
      <StartPageContent>
        <StartPageModal></StartPageModal>
      </StartPageContent> 
      
      {/* <Button to="/MyPage">마이페이지 가기</Button> */}
      {/* <div>안녕하세요</div> */}
    </StartPageBlock>    
  );
};

export default StartPage;