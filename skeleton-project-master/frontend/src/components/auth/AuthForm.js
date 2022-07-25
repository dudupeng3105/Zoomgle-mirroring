import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

/**
 * 회원가입 또는 로그인 폼을 보여줍니다.
 */

const AuthFormBlock = styled.div`
  h3 {
    margin: 0;
    color: gray;
    margin-bottom: 1rem;
  }
`;

/**
 * 스타일링된 input
 */
const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid blue;
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid yellow;
  }
  & + & {
    margin-top: 1rem;
  }
`;

/**
 * 폼 하단에 로그인 혹은 회원가입 링크를 보여줌
 */
const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: lightcyan;
    text-decoration: underline;
    &:hover {
      color: cyan;
    }
  }
`;

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
  font-size: 0.875rem;
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
        <button>제출</button>
        {/* <ButtonWithMarginTop cyan fullWidth style={{ marginTop: '1rem' }}>
          {text}
        </ButtonWithMarginTop> */}
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