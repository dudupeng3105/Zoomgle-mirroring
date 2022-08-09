import styled from "styled-components";
import background from '../media/images/StartPageImage_long.png'
import arrow from '../media/images/arrow.png'
// import Button from "../components/common/Button";
import { useNavigate } from "../../node_modules/react-router-dom/index";
import StartPageModal from "../components/display/StartPageModal";
import StartStoryBoardBlock from "../components/display/StartStoryBoardBlock";
import { authActions } from '../store/auth-slice';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";

const StartPageBlock = styled.div`
  width: 100vw;
  height: 500vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-direction: column; 
  background-color: #352208;   
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
      <StartPageContent onClick={() => handleClickEvent(1)}>
        {/* <StartPageSkipBtn onClick={() => navigate('/login')}>건너뛰기</StartPageSkipBtn> */}
        
      </StartPageContent>
      <StartStoryBoardBlock>
        <StartStoryBoard onClick={() => handleClickEvent(2)}><h1>평범하게 살던 여섯 친구들이</h1></StartStoryBoard> 
        <StartStoryBoard onClick={() => handleClickEvent(3)}><h1>이러쿵 저러쿵 정글에 떨어지게 된다</h1></StartStoryBoard> 
        <StartStoryBoard onClick={() => handleClickEvent(4)}><h1>살아남으러 가보자</h1></StartStoryBoard> 
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