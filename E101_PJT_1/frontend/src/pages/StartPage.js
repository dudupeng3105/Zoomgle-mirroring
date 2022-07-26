import styled from "styled-components";
import background from '../media/images/StartPageImage.png'
import background1 from '../media/images/startback_3.png'
import arrow from '../media/images/arrow.png'
import Button from "../components/common/Button";
import StartPageModal from "../components/display/StartPageModal";
import StartStoryBoardBlock from "../components/display/StartStoryBoardBlock";

const StartPageBlock = styled.div`
  width: 100%;
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
  background-size: contain;
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
  /* background: url(${background1}) no-repeat center;   */
  /* border: 3px solid white; */
  display: flex;   
  justify-content: center;
  align-items: center;
  /* background-size: auto auto; */
`;

const StartPage = (props) => {
  const handleClickEvent = (chapter) => {
    console.log(chapter)
    // console.log(chapter * 100 * window.innerHeight/100)
    window.scrollTo(0, chapter * 100 * window.innerHeight/100);
  } 

  return (
    <StartPageBlock>
      <StartPageContent onClick={() => handleClickEvent(1)}><button>skip</button></StartPageContent>
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