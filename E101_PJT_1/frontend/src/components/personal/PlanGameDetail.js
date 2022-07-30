import styled from "styled-components";
import CustomDatePicker from "../utils/CustomDatePicker";
import PersonNumCounter from "../utils/PersonNumCounter";

const PlanGameDetailBlock = styled.div`
  border: 3px solid white;
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
`;

const PlanGameDetailTitle = styled.div`
  font-size: 3rem;
  height: 10vh;
  color:  #412E22;
  padding-left: 4rem;
  text-decoration: underline;
`

const PlanGameDetailOption = styled.div`
  height: 20vh;
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

const PlanGameDetail = () => {
  return (
    <PlanGameDetailBlock>
      <PlanGameDetailTitle>모험 생성</PlanGameDetailTitle>
      {/* 달력 */}
      <PlanGameDetailOption>
        <PlanGameDetailOptionName>시간 설정</PlanGameDetailOptionName>
        <CustomDatePicker />
      </PlanGameDetailOption>
         
      {/* Personcounter */}
      <PlanGameDetailOption>
        <PlanGameDetailOptionName>인원 설정</PlanGameDetailOptionName>
        <PersonNumCounter />
      </PlanGameDetailOption>

    </PlanGameDetailBlock>
  );
};

export default PlanGameDetail;