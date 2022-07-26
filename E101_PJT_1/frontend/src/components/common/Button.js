import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const buttonStyle = css`  
  font-size: 1.5rem;
  font-weight: bold;
  padding: 1rem 3rem;
  color: white;  
  cursor: pointer;
  background: #29231C;
  border: 3px solid #b39860;
  border-radius: 5px;  
  &:hover {
    background: #E2D6BA;
    color: black;
    border: 3px solid #29231C;
  }  
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;

const StyledLink = styled(Link)`
  ${buttonStyle}
`;

const Button = props => {
  return props.to ? (
    <StyledLink {...props} />
  ) : (
    <StyledButton {...props} />
  );
};

export default Button;