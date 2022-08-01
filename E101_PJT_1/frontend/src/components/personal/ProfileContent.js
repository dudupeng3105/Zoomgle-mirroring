import styled from "styled-components";
// import background from '../../media/images/profile_back.jpg'
import background from '../../media/images/headerMenuBackGround.png'
import ProfileContentModal from "../auth/ProfileContentModal";

const ProfileContentBlock = styled.div`
  background: url(${background});
  width: 100%;
  margin: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-direction: column; 
`;

/**
 * 스타일링된 input
 */
 const StyledInput = styled.input`
 background: #E2D6BA;
 border: 3px solid #000000;
 border-radius: 5px;
 font-size: 1.2rem;
 padding: 1rem 0.5rem;
 width: 100%;    
 height: 100%;
 ::placeholder {
   font-size: 1.2rem;    
 }
 &:focus {
   border: 3px solid white;
   ::placeholder {
     color: transparent;
   }
   /* border-bottom: 1px solid yellow; */
 }
 & + & {
   margin-top: 1rem;
 }
`;

const ProfileContent = () => {
  return (
    <ProfileContentBlock>
      {/* <h1>회원 정보</h1> */}
      <ProfileContentModal>
      </ProfileContentModal>
    </ProfileContentBlock>
  );
};

export default ProfileContent;