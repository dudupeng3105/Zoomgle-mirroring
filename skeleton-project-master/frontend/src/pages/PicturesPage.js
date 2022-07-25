import styled from "styled-components";
import Header from "../components/common/header";
import PicturesContent from "../components/personal/PicturesContent";

const PicturesPageBlock = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  background-color: #352208;  
`;

const PicturesPage = () => {
  return (
    <PicturesPageBlock>
      <Header></Header>
      <PicturesContent></PicturesContent>
    </PicturesPageBlock>
  );
};

export default PicturesPage;