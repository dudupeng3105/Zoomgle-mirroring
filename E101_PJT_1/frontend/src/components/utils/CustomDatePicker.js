import React from 'react';
import styled from "styled-components";
import { useState } from 'react';
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const Wrapper = styled.div`  
  input {
    font-family: 'East Sea Dokdo', cursive;
    padding: 1rem 2rem;
    font-size:2rem ;
    border: 3px solid black;
    border-radius: 10px;
    background-color: #E2D6BA;    
  }
  input:focus {
    background-color: white;
  }

  //
  .react-datepicker__current-month, .react-datepicker-time__header, .react-datepicker-year-header {
    font-size: 1.5rem;
  }

  // 달력 header 배경 수정(Time)
  .react-datepicker__header {
    background-color: white;    
    border-bottom: 1px solid black;    
  }

  // 달력 백그라운드 스타일 수정
  .react-datepicker {
    font-family: 'East Sea Dokdo', cursive;
    font-size: 1.5rem;    
    background-color: #7A573A;    
  }

  .react-datepicker__day {
    color: white;
  }

  // 선택된 일자 스타일 수정
  .react-datepicker__day:hover {
    background-color: #E2D6BA;
    color: black;
  }

  .react-datepicker__day--selected {
    background-color: white;
    color: black;
  }  

  // 달력 월(月) 부분 사이즈 조정
  .react-datepicker__month {
    margin: 0.4em 1em;
  }

  .react-datepicker__navigation--previous {
    background-color: brown;        
  }

  .react-datepicker__navigation--next {
    background-color: brown;    
    right: 8rem;
  }

  //달력 시간 부분 사이즈 조정
  .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box {
    width: 8rem;
    /* overflow-x: hidden; */
    margin: 0 auto;
    text-align: center;    
    border-bottom-right-radius: 0.3rem;    
  }

  .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item {
    height: 30px;
    padding: 0 10px;
    white-space: nowrap;
  }

  .react-datepicker__time-container {
    width: 8rem;
    background-color: white;
    color: #7A573A;
  }  

  .react-datepicker__time {
    background-color: white;
    color: #7A573A;
    width: 8rem;
  }
  
  // 선택된 시간 디스플레이 스타일
  .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item--selected {
    background-color: white;
    color: black;
    border: 2px solid black;    
    border-radius: 3px;
  }

  
`

// 도입할 것 : Custom Input (input 모양 이쁘게)
// 

const CustomDatePicker = () => {
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 30), 16)
  );
  return (
    <Wrapper>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        // includeTimes={[
        //   setHours(setMinutes(new Date(), 0), 17),
        //   setHours(setMinutes(new Date(), 30), 18),
        //   setHours(setMinutes(new Date(), 30), 19),
        //   setHours(setMinutes(new Date(), 30), 17),
        // ]}
        dateFormat="MMMM d, yyyy h:mm aa"
      ></DatePicker>
    </Wrapper>
  );
};

export default CustomDatePicker;