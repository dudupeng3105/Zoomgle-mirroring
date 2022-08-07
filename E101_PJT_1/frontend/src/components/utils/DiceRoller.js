import styled from 'styled-components';
import Dice from 'react-dice-roll';
import { useState } from 'react';
import dice1 from '../../media/images/dice1.png';
import dice2 from '../../media/images/dice2.png';
import dice3 from '../../media/images/dice3.png';

const DiceRollerBlock = styled.div`
  position: absolute;
  width: 10vmin;
  height: 10vmin;
  top: 80vh;
  left: 90vw;
  /* border: red 3px solid; */
`;

const DiceRoller = ({ posNum, setPosNum, session }) => {
  const [diceNum, setDiceNum] = useState();

  
  
  const onRollHandler = (value) => {
    // console.log(value);
    if (value > 3) {
      value = value - 3;
    }
    setDiceNum(value);

    const tempPosNum = (posNum + value) % 20
    
    setPosNum(tempPosNum);
    const sendData = {
      nextPosNum: tempPosNum
    }
    console.log("보냄", sendData);
    session.signal({      
      data: JSON.stringify(sendData),
      type: 'gameStateChanged',
    });
  };

  const faces = [dice1, dice2, dice3, dice1, dice2, dice3];

  return (
    <DiceRollerBlock>
      <Dice
        size={80}
        disabled={false}
        rollingTime={700}
        onRoll={(value) => {
          onRollHandler(value);
        }}
        faceBg={'#352208'}
        sound={'http://cd.textfiles.com/itcontinues/WIN/YTB22/RATTLE1.WAV'}
        faces={faces}
      />
      {diceNum}
    </DiceRollerBlock>
  );
};

export default DiceRoller;
