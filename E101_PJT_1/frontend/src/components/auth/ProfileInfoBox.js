import styled from "styled-components";

const ProfileInfoBoxBlock = styled.div`
  height: 14vh;
  display: flex;  
  align-items: center;
  border: 2px solid blue;
`


const ProfileInfoBox = (props) => {
  return (
    <ProfileInfoBoxBlock>
      <h1>{props.title}: {props.info}</h1>
    </ProfileInfoBoxBlock>
  );
};

export default ProfileInfoBox;