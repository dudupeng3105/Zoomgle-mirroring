import styled from "styled-components";
import Header from "../components/common/header";
import background from '../media/images/headerMenuBackGround.png'
import PlannedGameList from "../components/common/PlannedGameList";
import PlanGameDetail from "../components/personal/PlanGameDetail";

const JoinGamePageBlock = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  background-color: #352208;  
`;

const JoinGameContent = styled.div`
  background: url(${background});
  width: 100%;
  margin: 10px;
  padding: 10px;
`;

const JoinGamePage = () => {
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