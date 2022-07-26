import styled from "styled-components";
import background from '../../media/images/headerMenuBackGround.png'

const MyPageContentBlock = styled.div`
  background: url(${background});
  width: 100%;
  margin: 10px;
  padding: 10px;
`;

const MyPageContent = () => {
  return (
    <MyPageContentBlock>
      <h2>마이페이지입니다.</h2>
    </MyPageContentBlock>
  );
};

export default MyPageContent;