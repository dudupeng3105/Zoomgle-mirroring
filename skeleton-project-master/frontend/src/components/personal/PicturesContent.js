import styled from "styled-components";
import background from '../../media/images/headerMenuBackGround.png'

const PicturesContentBlock = styled.div`
  background: url(${background});
  width: 100%;
  margin: 10px;
`;

const PicturesContent = () => {
  return (
    <PicturesContentBlock>
      <h2>사진첩 페이지입니다.</h2>
    </PicturesContentBlock>
  );
};

export default PicturesContent;