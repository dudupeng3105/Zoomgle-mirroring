import styled from "styled-components";
import background from '../../media/images/headerMenuBackGround.png'

const FriendsContentBlock = styled.div`
  background: url(${background});
  width: 100%;
  margin: 10px;
`;

const FriendsContent = () => {
  return (
    <FriendsContentBlock>
      <h2>모험가(친구) 페이지입니다.</h2>
    </FriendsContentBlock>
  );
};

export default FriendsContent;