import styled from "styled-components";
import Header from "../components/common/header";
import ProfileContent from "../components/personal/ProfileContent";

const ProfilePageBlock = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  background-color: #352208;  
`;

const ProfilePage = () => {
  return (
    <ProfilePageBlock>
      <Header></Header>
      <ProfileContent></ProfileContent>
    </ProfilePageBlock>
  );
};

export default ProfilePage;