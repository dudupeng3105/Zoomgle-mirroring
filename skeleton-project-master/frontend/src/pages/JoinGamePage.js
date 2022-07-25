import styled from "styled-components";
import Header from "../components/common/header";
import JoinGameContent from "../components/personal/JoinGameContent";

const JoinGamePageBlock = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  background-color: #352208;  
`;

const JoinGamePage = () => {
  return (
    <JoinGamePageBlock>
      <Header></Header>
      <JoinGameContent></JoinGameContent>
    </JoinGamePageBlock>
  );
};

export default JoinGamePage;