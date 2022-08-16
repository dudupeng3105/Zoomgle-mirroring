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
  /* justify-content: start; */
  align-items: center;
  width: 60%;  
  height: 100vh;
  form {    
    display: flex;
    flex-direction: column;
    width: 100%;   
    /* justify-content: center; */
    align-items: center;
  }
  // 로그인
  &.jc-8 {
    justify-content: center;
  }

  // 회원가입
  &.jc-6 {
    justify-content: start;
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
  height: 8vh;
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

const FormTitle = styled.div`
  height: 10vh;
  margin-top: 3.5vh;
  margin-bottom: 5vh;
  font-size: 8vmin;
  text-decoration: underlines;
`

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

const FormBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4vmin;
  font-weight: bold;
  width: 20vw;
  height: 10vh;  
  margin-top: 2vh;
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
`
  

const textMap = {
  login: '입장',
  register: '모험가 등록'
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
    <AuthFormBlock className={`jc-${text.length}`}>
      <FormTitle>{text}</FormTitle>
      <form onSubmit={onSubmit}>
        <StyledInput
          autoComplete="userId"
          name="userId"
          placeholder="아이디"
          onChange={onChange}
          value={form.userId}
        />
        {type=== 'register' && <StyledInput
          autoComplete="name"
          name="name"
          placeholder="이름"          
          onChange={onChange}
          value={form.name}
        />}        
        {type=== 'register' && <StyledInput
          autoComplete="email"
          name="email"
          placeholder="이메일"
          type="email"
          onChange={onChange}
          value={form.email}
        />}
        <StyledInput
          autoComplete="password"
          name="password"
          placeholder="비밀번호"  
          type="password"        
          onChange={onChange}
          value={form.password}
        />
        {type=== 'register' && <StyledInput
          autoComplete="nickname"
          name="nickname"
          placeholder="nickname"  
          type="text"        
          onChange={onChange}
          value={form.nickname}
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
        <FormBtn onClick={onSubmit}>{text}</FormBtn>        
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