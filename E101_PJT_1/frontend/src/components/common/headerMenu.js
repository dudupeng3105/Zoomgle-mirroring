import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderMenuBlock = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4vmin;  
  height: 15%;
  margin: 10px 2px;
  text-align: center;
  background-color: #352208;
  border: 3px solid #b39860;
  color: white;
  border-radius: 5px;
  &:hover {
    background: #E2D6BA;
    color: black;
    border: 3px solid #29231C;
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