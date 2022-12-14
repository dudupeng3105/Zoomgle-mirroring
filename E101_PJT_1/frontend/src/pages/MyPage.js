import styled from "styled-components";
import Header from "../components/common/header";
import MyPageContent from "../components/personal/MyPageContent";
import PlannedGameList from "../components/common/PlannedGameList";
import background from '../media/images/totalBack.png'

const MyPageBlock = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  /* background-color: #352208; */
  background: url(${background}) center no-repeat;
  background-size: 100vw 100vh;
`;

const MyPage = () => {
  return (
    <>
      <MyPageBlock>
        <Header></Header>
        <MyPageContent></MyPageContent>
      </MyPageBlock>
    </>
  );
};

export default MyPage;