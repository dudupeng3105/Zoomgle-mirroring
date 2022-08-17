import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';

import btnClickSound from '../../media/sounds/05_btn.wav';

const PersonNumCounterBlock = styled.div`
  /* border: 3px solid blue; */
  width: 40vmin;
  height: 15vmin;
  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
    font-size: 5vmin;
  }
`;

export const PersonNumCounterLeftBtn = styled.div`
  width: 0;
  height: 0;
  border-radius: 10px;
  border-top: 1rem solid transparent;
  border-bottom: 1rem solid transparent;
  border-right: 1rem solid grey;
`;

export const PersonNumCounterRightBtn = styled.div`
  width: 0;
  height: 0;
  border-radius: 10px;
  border-top: 1rem solid transparent;
  border-bottom: 1rem solid transparent;
  border-left: 1rem solid grey;
`;

const PersonNumCounter = ({count, setCount}) => { 

  const onIncrease = () => {
    if (count === 6) {
      setCount(2)
    } else {
      setCount(count + 1)
    }
  };

  const onDecrease = () => {
    if (count === 2) {
      setCount(6)
    } else {
      setCount(count - 1)
    }
  };

  function btnClick() {
    var audio = new Audio(btnClickSound);
    audio.play();
  }

  return (
    <PersonNumCounterBlock>
      <PersonNumCounterLeftBtn onClick={() => {btnClick(); onDecrease()}} />
      <p>{count}명</p>
      <PersonNumCounterRightBtn onClick={() => {btnClick(); onIncrease()}} />
    </PersonNumCounterBlock>
  );
};

export default PersonNumCounter;
