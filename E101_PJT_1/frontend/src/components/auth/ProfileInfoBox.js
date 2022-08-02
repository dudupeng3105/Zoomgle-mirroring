import styled from "styled-components";

const ProfileInfoBoxBlock = styled.div`
  height: 13vh;
  display: flex;  
  align-items: center;
  font-size: 5vmin;  
  /* border: 2px solid blue; */
`


const ProfileInfoBox = (props) => {
  return (
    <ProfileInfoBoxBlock>
      {props.info}
    </ProfileInfoBoxBlock>
  );
};

export default ProfileInfoBox;