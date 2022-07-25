import styled from "styled-components";
import background from '../../media/images/headerMenuBackGround.png'

const JoinGameContentBlock = styled.div`
  background: url(${background});
  width: 100%;
  margin: 10px;
`;

const JoinGameContent = () => {
  return (
    <JoinGameContentBlock>
      <h2>게임 생성 및 참여하기 페이지입니다.</h2>
    </JoinGameContentBlock>
  );
};

export default JoinGameContent;