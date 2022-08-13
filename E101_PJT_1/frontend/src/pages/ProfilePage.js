import styled from "styled-components";
import Header from "../components/common/header";
import ProfileContent from "../components/personal/ProfileContent";
import background from '../media/images/totalBack.png'

const ProfilePageBlock = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  background-color: #352208;  
  background: url(${background}) center no-repeat;
  background-size: 100vw 100vh;
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