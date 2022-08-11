import styled from "styled-components";
import Header from "../components/common/header";
import background from "../media/images/friendback.png"
import FriendsContent from "../components/personal/FriendsContent";

const FriendsPageBlock = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  background-color: #352208;
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