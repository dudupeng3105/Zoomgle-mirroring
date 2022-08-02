import styled from 'styled-components';
import Dice from 'react-dice-roll';
import { useState } from 'react';

const DiceRollerBlock = styled.div`


position: absolute;
width: 10vmin;
height: 10vmin;
top: 80vh;
left: 90vw;
/* border: red 3px solid; */

`

const DiceRoller = ({posNum, setPosNum}) => {
  const [diceNum, setDiceNum] = useState();
  const onRollHandler = (value) => {
    setDiceNum(value)
    setPosNum((posNum + value) % 20)
  };

  return (
    <DiceRollerBlock>
    <Dice size={80} disabled={false} rollingTime={700} onRoll={(value) => {onRollHandler(value)}} faceBg={'#352208'} sound='http://cd.textfiles.com/itcontinues/WIN/YTB22/RATTLE1.WAV'/>
    {diceNum}
    </DiceRollerBlock>
  );
};

export default DiceRoller;