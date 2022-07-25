import styled from "styled-components";
import background from '../../media/images/headerMenuBackGround.png'

const ProfileContentBlock = styled.div`
  background: url(${background});
  width: 100%;
  margin: 10px;
`;

const ProfileContent = () => {
  return (
    <ProfileContentBlock>
      <h2>프로필 페이지입니다.</h2>
    </ProfileContentBlock>
  );
};

export default ProfileContent;