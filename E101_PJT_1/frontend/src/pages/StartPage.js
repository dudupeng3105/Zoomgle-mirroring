import styled from "styled-components";
import background from '../media/images/StartPageImage.png'
import Button from "../components/common/Button";

const StartPageBlock = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; 
  background-color: #352208;   
`;

const StartPageContent = styled.div`
  width: 80%;
  height: 80%;
  color: white;
  background: url(${background}) no-repeat center;  
  display: flex;   
  justify-content: center;
  align-items: center;
  /* background-size: auto auto; */
`;

const StartPage = () => {
  return (
    <StartPageBlock>
      <StartPageContent><h2>싸만지</h2></StartPageContent> 
      <Button to="/MyPage">마이페이지 가기</Button>
      {/* <div>안녕하세요</div> */}
    </StartPageBlock>    
  );
};

export default StartPage;