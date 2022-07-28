import styled from "styled-components";
import CustomDatePicker from "../utils/CustomDatePicker";

const PlanGameDetailBlock = styled.div`
  border: 3px solid white;
  width: 100%;
  height: 80vh;
`;

const PlanGameDetail = () => {
  return (
    <PlanGameDetailBlock>
      <CustomDatePicker></CustomDatePicker>      
    </PlanGameDetailBlock>
  );
};

export default PlanGameDetail;