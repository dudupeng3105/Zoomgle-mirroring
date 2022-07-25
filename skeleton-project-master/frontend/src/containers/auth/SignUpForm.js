import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { changeField, initializeForm, register } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { authActions } from '../../store/auth-slice';
// import { check } from '../../modules/user';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  const [error, setError] = useState(null);  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { form, isAuth, authError } = useSelector((state) => ({
    form: state.auth.register,
    isAuth: state.auth.isAuth,
    authError: state.auth.error,
    // user: user.user,
  }));

  // 0. 컴포넌트가 처음 렌더링 될 때 form 을 초기화함
  useEffect(() => {
    dispatch(authActions.initializeForm('register'));
  }, [dispatch]);


  // 1. 인풋 변경 이벤트 핸들러
  const onChange = (e) => {
    let {name, value} = e.target;
    dispatch(authActions.changeField({
      form: 'register',
      key: name,
      value,
    }),
    );   
  };

  // 2. 폼 등록 이벤트 핸들러
  const onSubmit = (e) => {
    e.preventDefault();
    const { userId, name, email, password, nickName } = form;
    if(userId && name && email && password && nickName) {
      dispatch(authActions.createUserStart(form));
      // console.log("디스패치 성공!!")
      // 마이페이지로 보내버림
      setTimeout(() => navigate("/mypage/"), 100)
    } else {
      // 위에 통과못했을때..
      setError('빈 칸을 모두 입력하세요.');
      return;
    }
  };

  // 3. 회원가입 성공 / 실패 처리
  useEffect(() => {
    if (authError) {
      // 계정명이 이미 존재할 때
      if (authError.response.status === 409) {
        setError('이미 존재하는 계정명입니다.');
        return;
      }
      // 기타 이유
      setError('회원가입 실패');
      return;
    }

    if (isAuth) {
      console.log('회원가입 성공');
      console.log(isAuth);
      // dispatch(check());
    }
  }, [isAuth, authError, dispatch]);

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
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default SignUpForm;