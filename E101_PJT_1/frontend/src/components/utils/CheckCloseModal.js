import styled from "styled-components";
import reject from '../../media/images/rejectButton.png';
import accept from '../../media/images/acceptButton.png';
import backImg from '../../media/images/Papyrus.png'

const CheckCloseModalBlock = styled.div`
  position: absolute;    
  background: url(${backImg});
  background-size: 35vw 25vh;
  width: 35vw;
  height: 25vh;
  top: 40vh;
  left: 35vw;  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 3.5vmin;  
`;

const OxBtnContainer = styled.div`
  display: flex;
  width: 30vw;
  justify-content: center;
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

const CheckCloseModal = ({title, content, deleteFunction, modalCloseToggle}) => {
  return (
    <CheckCloseModalBlock>
      <p>{title}</p>
      <p>{content}</p>
      <OxBtnContainer>
        <AcceptBtn onClick={() => deleteFunction()}></AcceptBtn>
        <RejectBtn onClick={() => modalCloseToggle(false)}></RejectBtn>      
      </OxBtnContainer>
    </CheckCloseModalBlock>
  );
};

export default CheckCloseModal;