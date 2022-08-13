import styled from "styled-components";
import Header from "../components/common/header";
import FriendsContent from "../components/personal/FriendsContent";
import background from '../media/images/totalBack.png'

const FriendsPageBlock = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  background: url(${background}) center no-repeat;
  background-size: 100vw 100vh;
`;

const FriendsPage = () => {
  return (
    <FriendsPageBlock>
      <Header></Header>
      <FriendsContent></FriendsContent>
    </FriendsPageBlock>
  );
};

export default FriendsPage;