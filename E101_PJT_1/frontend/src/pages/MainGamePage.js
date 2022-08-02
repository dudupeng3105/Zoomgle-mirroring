import styled from 'styled-components';
import gameboard from '../media/images/gameboard.png';
import { useState } from 'react';
import DiceRoller from '../components/utils/DiceRoller.js'

const MainGamePageBlock = styled.div`
background: url(${gameboard});
background-size: 100vw 100vh;
width: 100vw;
height: 100vh;
`
const TestCircle = styled.div`
width: 10vmin;
height: 10vmin;
border-radius: 50%;
background-color: blue;
position: absolute;


&.pos0{
top: 80vh;
left: 8.5vw;
}

&.pos1{
top: 85vh;
left: 23vw;
}

&.pos2{
top: 85vh;
left: 33vw;
}

&.pos3{
top: 85vh;
left: 45vw;
}

&.pos4{
top: 85vh;
left: 55vw;
}

&.pos5{
top: 85vh;
left: 65vw;
}

&.pos6{
top: 85vh;
left: 77vw;
}

&.pos7{
top: 68vh;
left: 81vw;
}

&.pos8{
top: 50vh;
left: 85vw;
}

&.pos9{
top: 23vh;
left: 86vw;
}

&.pos10{
top: 3vh;
left: 81vw;
}

&.pos11{
top: 4vh;
left: 71vw;
}

&.pos12{
top: 3.5vh;
left: 60vw;
}

&.pos13{
top: 2.5vh;
left: 48vw;
}

&.pos14{
top: 3vh;
left: 35.5vw;
}

&.pos15{
top: 3vh;
left: 22vw;
}

&.pos16{
top: 16vh;
left: 17vw;
}

&.pos17{
top: 30vh;
left: 13vw;
}

&.pos18{
top: 40vh;
left: 16vw;
}

&.pos19{
top: 50vh;
left: 14vw;
}

`



const MainGamePage = () => {
  const [posNum, setPosNum] = useState(1);

  return (
    <MainGamePageBlock>
      <TestCircle className={"pos" + posNum}></TestCircle>
      <button onClick={() => {setPosNum((posNum + 1)% 20)}}>
      {posNum}
      </button>
      <DiceRoller posNum={posNum} setPosNum={setPosNum}></DiceRoller>
    </MainGamePageBlock>
  );
};

export default MainGamePage;