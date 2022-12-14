import styled from 'styled-components';
import Dice from 'react-dice-roll';
import { useState } from 'react';
import dice1 from '../../media/images/dice1.jpg';
import dice2 from '../../media/images/dice2.jpg';
import dice3 from '../../media/images/dice3.jpg';
import dice4 from '../../media/images/dice4.jpg';

const DiceRollerBlock = styled.div`
  position: absolute;
  width: 15vmin;
  height: 15vmin;
  top: 50vh;
  left: 5vw;
  &:hover {
    transform: rotate(-10deg) scale(1.1);
  }
  /* border: red 3px solid; */
`;

const DiceRoller = ({
  players,
  isRoll,
  posList,
  playerNum,
  myTurnNum,
  mySessionIdValue,
}) => {
  const [diceNum, setDiceNum] = useState();


  // 주사위를 돌렸을 때는 자리 업데이트 정보만 주면된다.
  const onRollHandler = (value) => {
    // console.warn('포지션정보', posList);

    // 자리 계산
    const myPos = posList[myTurnNum];
    if (value > 4) {
      value = value - 4;
    }
    // 테스트용 숫자(value 크게함)
    // value = value + 10;
    setDiceNum(value);
    const tempPosNum = (myPos + value) % 20;

    // emit 데이터 준비
    let nextPosList = [...posList];
    nextPosList[myTurnNum] = tempPosNum;
    // 미니게임 랜덤
    // const nextMinigameType = Math.floor(Math.random() * 220) // 0 ~ 219 랜덤
    // let rand = Math.random() * 100;
    // const random = (Math.random() * 220) * (Math.random() * rand);
    // const nextMinigameType = Math.floor(random % 220) // 0 ~ 219 랜덤

    // 시간값을 사용하자..?
    let nowDate = new Date();
    let rand = Math.random() * 220;
    rand = (rand + nowDate.getSeconds()) * nowDate.getMinutes();
    const nextMinigameType = (Math.floor(rand) + nowDate.getSeconds()) % 220;

    console.error(nextMinigameType);
    let sendData = {};
    // 20칸이면 .. 우승자 나옴
    if (myPos + value > 19) {
      nextPosList[myTurnNum] = 19;
      sendData = {
        session: mySessionIdValue,
        to: [], // all user
        data: JSON.stringify({
          // nextUserName: nextUserName, // 다음사람
          // nextTurn: nextTurn, // 다음 턴
          nextIsGameDone: true,
          nextPosList: nextPosList, // 자리 업데이트                    
        }),
        type: 'GAME_STATE_DONE',
      }
    } else {
      // 다음게임상태 emit
      sendData = {
        session: mySessionIdValue,
        to: [], // all user
        data: JSON.stringify({
          // nextUserName: nextUserName, // 다음사람
          // nextTurn: nextTurn, // 다음 턴
          nextPosList: nextPosList, // 자리 업데이트
          isRoll: !isRoll,
          nextMinigameType: nextMinigameType,
          nextwhatDiceNum: value,
        }),
        type: 'GAME_STATE_CHANGED',
      };
    }

    fetch('https://i7e101.p.ssafy.io:4443/openvidu/api/signal', {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + btoa('OPENVIDUAPP:e101ssafy71'),
        'Content-type': 'application/json',
      },
      body: JSON.stringify(sendData),
    });
  };

  const faces = [dice1, dice2, dice3, dice4, dice1, dice2];

  return (
    <DiceRollerBlock>
      <Dice
        size={100}
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
