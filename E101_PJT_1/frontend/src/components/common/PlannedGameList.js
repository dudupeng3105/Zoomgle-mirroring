import styled from "styled-components";
import { PlanGameDetailTitle } from "../personal/PlanGameDetail";

const PlannedGameListBlock = styled.div`
  border: 3px solid white;
  width: 100%;
  height: 30vh;
`;

const PlannedGameList = () => {
  return (
    <PlannedGameListBlock>
      <PlanGameDetailTitle>예정된 모험</PlanGameDetailTitle>
    </PlannedGameListBlock>
  );
};

export default PlannedGameList;