import styled from 'styled-components';
import background from '../../media/images/back_long1.jpg'

const StartStoryBoardBlockBlock = styled.div`
  width: 100%;
  height: 300vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-direction: column; 

  background: url(${background}) no-repeat center;
  background-size: cover;   
`;



const StartStoryBoardBlock = (props) => {
  return (
    <StartStoryBoardBlockBlock>

    <div>{props.children}</div>
    </StartStoryBoardBlockBlock>
  );
};

export default StartStoryBoardBlock;