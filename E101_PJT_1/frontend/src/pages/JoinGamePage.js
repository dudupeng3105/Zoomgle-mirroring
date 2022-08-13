import styled from "styled-components";
import Header from "../components/common/header";
// import background from '../media/images/headerMenuBackGround.png'
import background from '../media/images/joinGamePageBack.png'
import totalBackground from '../media/images/totalBack.png'
import PlannedGameList from "../components/common/PlannedGameList";
import PlanGameDetail from "../components/personal/PlanGameDetail";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gamePlanActions } from '../store/gamePlan-slice';
import { friendActions } from '../store/friends-slice';

const JoinGamePageBlock = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  background: url(${totalBackground}) center no-repeat;
  background-size: 100vw 100vh; 
`;

const JoinGameContent = styled.div`
  background: url(${background}) center no-repeat;
  background-size: 83vw 94vh;
  width: 83vw;
  height: 100vh;
  padding: 10px;
  /* overflow: hidden; */
`;

const JoinGamePage = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user.userId);

  useEffect(() => {
    dispatch(friendActions.GetFriendListStart(userId))
    dispatch(gamePlanActions.getGamePlanListStart());    
  }, []);

  return (
    <JoinGamePageBlock>
      <Header></Header>
      <JoinGameContent>
        {/* 1. PlannedGameList */}
        <PlannedGameList></PlannedGameList>
        {/* 2. PlanGameDetail */}
        <PlanGameDetail></PlanGameDetail>
      </JoinGameContent>
    </JoinGamePageBlock>
  );
};

export default JoinGamePage;