import styled from "styled-components";
import { Link } from "react-router-dom";
import longArrow from '../../media/images/longArrow1.png'


const HeaderMenuBlock = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3.5vmin;  
  height: 8vh;
  width: 18vw;
  /* margin: 15px 2px; */
  text-align: center;
  /* background-color: #352208; */
  background: url(${longArrow}) center no-repeat;
  background-size: 12vw 4vh;
  /* border: 3px solid #b39860; */
  padding-bottom: 4.5vh;
  color: #352208;
  border-radius: 5px;
  &:hover {
    /* background: url(${longArrow}) center no-repeat;
    background-size: 14vw 5vh; */
    color: white;
    /* border: 3px solid #29231C; */
  }  

`;

// const HeaderBlock = styled.div`
//   position: fixed;
//   width: 20%;
//   height: 100%;
//   background: black;
//   box-shadow: 0px 2px 4px rgba(1, 1, 255, 0.08);
// `;

const HeaderMenu = (props) => {
  const {to} = {...props};
  // console.log(to);
  return (
    <>            
      <HeaderMenuBlock to={to}>        
        {props.MenuName}
      </HeaderMenuBlock>
    </>
  );
};

export default HeaderMenu;