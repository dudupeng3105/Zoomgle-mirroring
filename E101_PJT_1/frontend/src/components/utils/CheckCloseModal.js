import styled from "styled-components";
import reject from '../../media/images/rejectButton.png';
import accept from '../../media/images/acceptButton.png';
import backImg from '../../media/images/Papyrus.png'

const CheckCloseModalBlock = styled.div`
  position: absolute;    
  background: url(${backImg});
  background-size: 30vw 45vh;
  width: 30vw;
  height: 45vh;
  z-index: 10;
  top: 30vh;
  left: 35vw;  
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  font-size: 5vmin;  
  padding-top: 5vh;
`;

const OxBtnContainer = styled.div`
  display: flex;
  width: 13vw;
  justify-content: space-between;
  margin-top: 5vh;
`;

const AcceptBtn = styled.div`
  cursor: pointer;
  width: 5vw;
  height: 5vh;
  background: url(${accept});
  background-size: 5vw 5vh;
  :active {
    transform: scale(0.95);
  }
`

const RejectBtn = styled.div`
  cursor: pointer;
  width: 5vw;
  height: 5vh;
  background: url(${reject});
  background-size: 5vw 5vh;
  :active {
    transform: scale(0.95);
  }
`

const CloseModalText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25vw;
  height: 10vh;
  color: ${(props => props.textColor)};
  font-size: ${(props => props.textSize)};;
`

const CheckCloseModal = ({title, content, deleteFunction, modalCloseToggle}) => {
  return (
    <CheckCloseModalBlock>
      <CloseModalText textColor={`#a70000`} textSize={`5vmin`}>{title}</CloseModalText>
      <CloseModalText textColor={`#421e22`} textSize={`4.5vmin`}>{content}</CloseModalText>
      <OxBtnContainer>
        <AcceptBtn onClick={() => deleteFunction()}></AcceptBtn>
        <RejectBtn onClick={() => modalCloseToggle(false)}></RejectBtn>      
      </OxBtnContainer>
    </CheckCloseModalBlock>
  );
};

export default CheckCloseModal;