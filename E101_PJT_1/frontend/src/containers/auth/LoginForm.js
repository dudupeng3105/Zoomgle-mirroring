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

  // 1. 인풋 변경 이벤트 핸들러
  const onChange = (e) => {
    let { name, value } = e.target;
    dispatch(
      authActions.changeField({
        form: 'login',
        key: name,
        value,
      }),
    );
  };

  // 2. 폼 등록 이벤트 핸들러
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("form", form)
    const { userId, password } = form;
    dispatch(authActions.loginUserStart({ userId, password }));
  };

  const onCheckEnter = (e) => {    
    if(e.key === 'Enter') {
      onSubmit(e);
    }
  }

  // 3. 로그인 성공 / 실패 처리
  useEffect(() => {
    if (authError) {
      // 로그인 중 에러났을 때
      setError(authError); // 이걸로 에러메시지 띄움(빨간글씨)
      return;
    }

    if (isAuth) {
      console.log('로그인 성공');
      navigate('/mypage');
    }
  }, [isAuth, authError, dispatch]);

  return (
    <AuthForm
      type="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
      onCheckEnter={onCheckEnter}
    />
  );
};

export default LoginForm;
