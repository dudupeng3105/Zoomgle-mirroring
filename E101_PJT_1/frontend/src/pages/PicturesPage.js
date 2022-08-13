import styled from "styled-components";
import Header from "../components/common/header";
import PicturesContent from "../components/personal/PicturesContent";
import background from '../media/images/totalBack.png'

const PicturesPageBlock = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;  
  background-color: #352208;  
  background: url(${background}) center no-repeat;
  background-size: 100vw 100vh;
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