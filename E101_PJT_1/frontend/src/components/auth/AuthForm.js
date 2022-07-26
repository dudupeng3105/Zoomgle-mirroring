import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

/**
 * 회원가입 또는 로그인 폼을 보여줍니다.
 */

const AuthFormBlock = styled.div`
  display: flex;  
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60%;  
  height: 100%;
  h3 {
    margin: 0;
    color: black;
    text-decoration: underline;
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  form {    
    display: flex;
    flex-direction: column;
    width: 100%;   
    /* justify-content: center; */
    align-items: center;
  }
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

/**
 * 폼 하단에 로그인 혹은 회원가입 링크를 보여줌
 */
// const Footer = styled.div`
//   margin-top: 2rem;
//   text-align: right;
//   a {
//     color: lightcyan;
//     text-decoration: underline;
//     &:hover {
//       color: cyan;
//     }
//   }
// `;

const ButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
`;

const textMap = {
  login: '로그인',
  register: '회원가입'
};

/**
 * 에러를 보여줍니다
 */
const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 2rem;
  margin-top: 1rem;
`;

const AuthForm = ({ type, form, onChange, onSubmit, error }) => {
  const text = textMap[type];
  return (
    <AuthFormBlock>
      <h3>{text}</h3>
      <form onSubmit={onSubmit}>
        {type=== 'register' && <StyledInput
          autoComplete="userId"
          name="userId"
          placeholder="아이디"
          onChange={onChange}
          value={form.userId}
        />}
        {type=== 'register' && <StyledInput
          autoComplete="name"
          name="name"
          placeholder="이름"          
          onChange={onChange}
          value={form.name}
        />}        
        <StyledInput
          autoComplete="email"
          name="email"
          placeholder="이메일"
          type="email"
          onChange={onChange}
          value={form.email}
        />
        <StyledInput
          autoComplete="password"
          name="password"
          placeholder="비밀번호"  
          type="password"        
          onChange={onChange}
          value={form.password}
        />
        {type=== 'register' && <StyledInput
          autoComplete="nickName"
          name="nickName"
          placeholder="nickName"  
          type="text"        
          onChange={onChange}
          value={form.nickName}
        />}
        {/* {type === 'register' && (
          <StyledInput
            autoComplete="new-password"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            type="password"
            onChange={onChange}
            value={form.passwordConfirm}
          />
        )} */}
        {/* 에러 출력 */}
        {error && <ErrorMessage>{error}</ErrorMessage>}        
        <ButtonWithMarginTop>{text}</ButtonWithMarginTop>        
      </form>
      {/* <Footer>
        {type === 'login' ? (
          <Link to="/register">회원가입</Link>
        ) : (
          <Link to="/login">로그인</Link>
        )}
      </Footer> */}
    </AuthFormBlock>
  );
};

export default AuthForm;