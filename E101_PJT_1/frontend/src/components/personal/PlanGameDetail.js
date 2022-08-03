import styled from "styled-components";
import CustomDatePicker from "../utils/CustomDatePicker";
import PersonNumCounter from "../utils/PersonNumCounter";
import { useState } from 'react';
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import { useDispatch } from "react-redux";
import { gamePlanActions } from "../../store/gamePlan-slice";

const PlanGameDetailBlock = styled.div`
  border: 3px solid white;
  width: 100%;
  height: 65vh;
  display: flex;  
  flex-direction: column;
`;

export const PlanGameDetailTitle = styled.div`
  font-size: 3rem;
  height: 10vh;
  color:  #412E22;
  padding-left: 4rem;
  text-decoration: underline;
`

const PlanGameDetailOption = styled.div`
  height: 15vh;
  display: flex;
  justify-content: left;
  align-items: center;
`

const PlanGameDetailOptionName = styled.div`
  font-size: 3rem;
  color:  #412E22;
  text-decoration: underline;
  padding-left: 30%;
  width: 50%;
`

const PlanGameApplyBtn = styled.div`
  font-size: 2rem;
  font-weight: bold;
  padding: 1rem 3rem;
  text-align: center;
  width: 40%;
  margin-left: 33%;
  color: white;  
  cursor: pointer;
  background: #29231C;
  border: 3px solid #b39860;
  border-radius: 5px;  
  &:hover {
    background: #E2D6BA;
    color: black;
    border: 3px solid #29231C;
  }
`

const ErrorMessage = styled.div`
  height: 6vh;
  margin-left: 57%;
  font-size: 2rem;
  color:red;
`

const PlanGameDetail = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 30), 16)
  );  
  
  const [count, setCount] = useState(2);
  const [newDate, setNewDate] = useState(0);
  const [error, setError] = useState('');

  const onDateChangeHandler = (givenDate) => {
    setStartDate(givenDate);
    const temp =
      givenDate.getMonth() +
      1 +
      '/' +
      givenDate.getDate() +
      '/' +
      givenDate.getFullYear() +
      ' ' +
      givenDate.getHours() +
      ':' +
      givenDate.getMinutes() +
      ':00';
    setNewDate(temp);
  };

  const onClickHandler = () => {
    if (newDate === 0) {
      setError('날짜를 선택해주세요')
    } else {
      setError(null);
      console.log(newDate, count)
      const planInfo = {
        "date": newDate,
        "maxCapacity": count  
      };
      dispatch(gamePlanActions.createGamePlanStart(planInfo));      
    }
    
  };

  return (
    <PlanGameDetailBlock>
      <PlanGameDetailTitle>모험 생성</PlanGameDetailTitle>
      {/* 달력 */}
      <PlanGameDetailOption>
        <PlanGameDetailOptionName>시간 설정</PlanGameDetailOptionName>
        <CustomDatePicker 
          startDate={startDate}
          setStartDate={setStartDate}   
          onDateChangeHandler={onDateChangeHandler}     
        />
      </PlanGameDetailOption>
      <ErrorMessage>{error}</ErrorMessage>
      {/* Personcounter */}
      <PlanGameDetailOption>
        <PlanGameDetailOptionName>인원 설정</PlanGameDetailOptionName>
        <PersonNumCounter 
          count={count}
          setCount={setCount}
        />
      </PlanGameDetailOption>
      <PlanGameApplyBtn
        onClick={() => {onClickHandler()}}
      >게임 예약하기</PlanGameApplyBtn>
    </PlanGameDetailBlock>
  );
};

export default PlanGameDetail;