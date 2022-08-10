import styled from 'styled-components';
import { useState } from 'react';
import Calendar from 'react-calendar';
import calender_back from '../../media/images/calendar.png'

const MyPageCalenderBlock = styled.div`
  width: 30vw;
  height: 40vh;
  /* border: 3px red solid; */
  margin-left: 3vw;
  margin-top: 10vh;
  display: inline-block;

/* react calendar */


.react-calendar { 
  width: 50vw;
  max-width: 100%;
  /* background-color: #7A573A; */
  background: url(${calender_back});
  background: 10vw 10vh;
  color: white;
  border-radius: 8px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  /* font-family: Arial, Helvetica, sans-serif; */
  line-height: 1.125em;
 }

 .react-calendar__navigation button {
  color: white;
  min-width: 44px;
  background:none;
  font-size: 16px;
  margin-top: 8px;
 }

.react-calendar--doubleView {
  width: 700px;
}
.react-calendar--doubleView .react-calendar__viewContainer {
  display: flex;
  margin: -0.5em;
}
.react-calendar--doubleView .react-calendar__viewContainer > * {
  width: 50%;
  margin: 0.5em;
}
.react-calendar,
.react-calendar *,
.react-calendar *:before,
.react-calendar *:after {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.react-calendar button {
  margin: 0;
  border: 0;
  outline: none;
}
.react-calendar button:enabled:hover {
  cursor: pointer;
}
.react-calendar__navigation {
  display: flex;
  height: 44px;
  margin-bottom: 1em;
}
.react-calendar__navigation button {
  min-width: 44px;
  /* background: none; */
}
.react-calendar__navigation button:enabled:hover,
.react-calendar__navigation button:enabled:focus {
  background-color: #e6e6e6;
}
.react-calendar__navigation button[disabled] {
  background-color: #f0f0f0;
}
.react-calendar__month-view__weekdays {
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.75em;
}
.react-calendar__month-view__weekdays__weekday {
  padding: 0.5em;
}
.react-calendar__month-view__weekNumbers .react-calendar__tile {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75em;
  font-weight: bold;
  padding: calc(0.75em / 0.75) calc(0.5em / 0.75);
}
.react-calendar__month-view__days__day--weekend {
  /* color: #d10000; */
  color: white;
}
.react-calendar__month-view__days__day--neighboringMonth {
  color: white;
}
.react-calendar__year-view .react-calendar__tile,
.react-calendar__decade-view .react-calendar__tile,
.react-calendar__century-view .react-calendar__tile {
  padding: 2em 0.5em;
}
.react-calendar__tile {
  max-width: 100%;
  text-align: center;
  padding: 0.75em 0.5em;
  background: none;
}
.react-calendar__tile:disabled {
  background-color: #f0f0f0;
}
.react-calendar__tile:enabled:hover,
.react-calendar__tile:enabled:focus {
  background-color: #e6e6e6;
}
.react-calendar__tile--now {
  /* background: #ffff76; */
  background-color: #6f48eb;
}
.react-calendar__tile--now:enabled:hover,
.react-calendar__tile--now:enabled:focus {
  background: #ffffa9;
}
.react-calendar__tile--hasActive {
  background: #76baff;
}
.react-calendar__tile--hasActive:enabled:hover,
.react-calendar__tile--hasActive:enabled:focus {
  background: #a9d4ff;
}
.react-calendar__tile--active {
  background: #6f48eb;
  color: white;
}
.react-calendar__tile--active:enabled:hover,
.react-calendar__tile--active:enabled:focus {
  background: #1087ff;
}
.react-calendar--selectRange .react-calendar__tile--hover {
  background-color: #e6e6e6;
}

`;

const MyPageCalender = () => {
  const [date, setDate] = useState(new Date());
  return (
    <MyPageCalenderBlock>
      <div className="app">
        {/* <h1 className="header">React Calendar</h1> */}
        <div className="calendar-container">
          <Calendar onChange={setDate} value={date} />
        </div>
        <div className="text-center">Selected date: {date.toDateString()}</div>
      </div>

      {/* <p>캘린더 자리</p> */}
    </MyPageCalenderBlock>
  );
};

export default MyPageCalender;
