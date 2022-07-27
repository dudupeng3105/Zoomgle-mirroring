import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthForm from '../../components/auth/AuthForm';
import { authActions } from '../../store/auth-slice';
// import { check } from '../../modules/user';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [error, setError] = useState(null);  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { form, isAuth, authError } = useSelector((state) => ({
    form: state.auth.login,
    isAuth: state.auth.isAuth,
    authError: state.auth.error,
    // user: user.user,
  }));
  
  // 0. 컴포넌트가 처음 렌더링 될 때 form 을 초기화함
  useEffect(() => {
    dispatch(authActions.initializeForm('login'));
  }, [dispatch]);


  // 1. 인풋 변경 이벤트 핸들러
  const onChange = (e) => {
    let {name, value} = e.target;
    dispatch(authActions.changeField({
      form: 'login',
      key: name,
      value,
    }),
    );   
  };

  // 2. 폼 등록 이벤트 핸들러
  const onSubmit = (e) => {
    e.preventDefault();
    const { userId, password } = form;
    dispatch(authActions.loginUserStart({ userId, password }));
  };


  // // 4. 회원가입 성공 / 실패 처리
  // useEffect(() => {
  //   if (authError) {
  //     // 계정명이 이미 존재할 때
  //     if (authError.response.status === 409) {
  //       setError('이미 존재하는 계정명입니다.');
  //       return;
  //     }
  //     // 기타 이유
  //     setError('회원가입 실패');
  //     return;
  //   }

  //   if (isAuth) {
  //     console.log('회원가입 성공');
  //     console.log(isAuth);
  //     // dispatch(check());
  //   }
  // }, [isAuth, authError, dispatch]);

  // user 값이 잘 설정되었는지 확인
  // useEffect(() => {
  //   if (user) {
  //     navigate('/'); // 홈 화면으로 이동
  //     try {
  //       localStorage.setItem('user', JSON.stringify(user));
  //     } catch (e) {
  //       console.log('localStorage is not working');
  //     }
  //   }
  // }, [navigate, user]);

  return (
    <AuthForm
      type="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default LoginForm;