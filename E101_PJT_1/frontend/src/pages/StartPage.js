import styled from "styled-components";
import background from '../media/images/StartPageImage.jpg'
import Button from "../components/common/Button";
import StartPageModal from "../components/display/StartPageModal";

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
  background-color: #352208;
  /* background: url(${background}) no-repeat center;   */
  /* border: 3px solid white; */
  display: flex;   
  justify-content: center;
  align-items: center;
  /* background-size: auto auto; */
`;

const StartPage = () => {
  const handleClickEvent = (chapter) => {
    console.log(chapter)
    // console.log(chapter * 100 * window.innerHeight/100)
    window.scrollTo(0, chapter * 100 * window.innerHeight/100);
  } 

  return (
    <StartPageBlock>
      <StartPageContent onClick={() => handleClickEvent(1)}><h2>싸만지</h2></StartPageContent> 
      <StartStoryBoard onClick={() => handleClickEvent(2)}></StartStoryBoard> 
      <StartStoryBoard onClick={() => handleClickEvent(3)}></StartStoryBoard> 
      <StartStoryBoard onClick={() => handleClickEvent(4)}></StartStoryBoard> 
      <StartPageContent>
        <StartPageModal></StartPageModal>
      </StartPageContent> 
      
      {/* <Button to="/MyPage">마이페이지 가기</Button> */}
      {/* <div>안녕하세요</div> */}
    </StartPageBlock>    
  );
};

export default StartPage;