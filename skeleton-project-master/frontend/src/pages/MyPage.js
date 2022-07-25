import styled from "styled-components";
import Header from "../components/common/header";
import MyPageContent from "../components/personal/MyPageContent";

const MyPageBlock = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  background-color: #352208;
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