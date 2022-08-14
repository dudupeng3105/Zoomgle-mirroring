import styled from "styled-components";
import background from '../media/images/StartPageImage_long.png'
import arrow from '../media/images/arrow.png'
// import Button from "../components/common/Button";
import { useNavigate } from "../../node_modules/react-router-dom/index";
import { Link } from "react-router-dom";
import StartPageModal from "../components/display/StartPageModal";
import StartStoryBoardBlock from "../components/display/StartStoryBoardBlock";
import { authActions } from '../store/auth-slice';
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import firstDescription from '../media/images/startPageLetter1.png'
import secondDescription from '../media/images/startPageLetter3.png'
import thirdDescription from '../media/images/startPageLetter2.png'
import ReactAudioPlayer from "../components/utils/reactAudioPlayer";
import firstPageSound from '../media/sounds/01_firstpage.wav';
import loginPageSound from '../media/sounds/02_loginPage.wav';

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
  align-items: flex-start;
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
  opacity: 0.1;
  /* transition-property: all;
  transition-duration: 3s;
  transition-timing-function: ease-in-out; */
  &.animation-1 {
    opacity: 1;
    transform: translateY(20vh);
    transition: all 3s ease-in-out;
  }
  &.animation-2 {
    opacity: 1;
    transform: translateY(20vh);
    transition: all 3s ease-in-out;
  }
  &.animation-3 {
    opacity: 1;
    transform: translateY(20vh);
    transition: all 3s ease-in-out;
  }
`;

const StartPage = (props) => {
  const dispatch = useDispatch();
  const [chapterNum, setChapterNum] = useState(0);
  const [formEffect, setFormEffect] = useState('');
  const [isFirstPageSound, setIsFirstPageSound] = useState(true);
  const [isLoginPageSound, setIsLoginPageSound] = useState(false);

  const handleClickEvent = (chapter) => {
    if (chapter !== 4) {
      setIsFirstPageSound(true);
      setIsLoginPageSound(false);
    }
    console.log(chapter)
    setChapterNum(chapter);
    // console.log(chapter * 100 * window.innerHeight/100)
    window.scrollTo(0, chapter * 100 * window.innerHeight/100);
    if (chapter === 4) {
      setIsFirstPageSound(false);
      setIsLoginPageSound(true);
      let i = 0
      while (i < 20) {
        if (i % 2) {
          setTimeout(() => {
            setFormEffect('bigger');
          }, (i + 1) * 350);
        } else {
          setTimeout(() => {
            setFormEffect('smaller');
          }, (i + 1) * 350);
        }
        i++;
    }
    }
  } 

  // 0. 컴포넌트가 처음 렌더링 될 때 form 을 초기화함
  useEffect(() => {
    dispatch(authActions.reset());
  }, []);

  // const navigate = useNavigate();

  return (    
    <StartPageBlock>
      <ReactAudioPlayer
        urlSound={firstPageSound}
        isLoop={true}
        isPlaying={isFirstPageSound}
      >
      </ReactAudioPlayer>  
      <ReactAudioPlayer
        urlSound={loginPageSound}
        isLoop={true}
        isPlaying={isLoginPageSound}
      >
      </ReactAudioPlayer>      
      {/* 최상단 페이지 */}
      <StartPageSkipBtn onClick={() => handleClickEvent(4)}>건너뛰기</StartPageSkipBtn>
      <StartPageContent onClick={() => handleClickEvent(1)}>
        {/* <StartPageSkipBtn onClick={() => navigate('/login')}>건너뛰기</StartPageSkipBtn> */}
        
      </StartPageContent>
      <StartStoryBoardBlock>
        <StartStoryBoard onClick={() => handleClickEvent(2)}>
          <GameDescription backImg={firstDescription} className={`animation-${chapterNum===1 ? 1: ''}`}></GameDescription>
        </StartStoryBoard> 
        <StartStoryBoard onClick={() => handleClickEvent(3)}>
          <GameDescription backImg={secondDescription} className={`animation-${chapterNum===2 ? 2: ''}`}></GameDescription>
        </StartStoryBoard> 
        <StartStoryBoard onClick={() => handleClickEvent(4)}>
          <GameDescription backImg={thirdDescription} className={`animation-${chapterNum===3 ? 3: ''}`}></GameDescription>
        </StartStoryBoard> 
      </StartStoryBoardBlock>
      
      <StartPageContent>
        <StartPageModal formEffect={formEffect}></StartPageModal>
      </StartPageContent> 
      
      {/* <Button to="/MyPage">마이페이지 가기</Button> */}
      {/* <div>안녕하세요</div> */}
    </StartPageBlock>      
  );
};

export default StartPage;