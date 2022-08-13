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

  // 1. 인풋 변경 이벤트 핸들러
  const onChange = (e) => {
    let { name, value } = e.target;
    dispatch(
      authActions.changeField({
        form: 'register',
        key: name,
        value,
      }),
    );
  };

  // 2. 폼 등록 이벤트 핸들러
  const onSubmit = (e) => {
    e.preventDefault();
    const { userId, name, email, password, nickname } = form;
    if (nickname.length > 6) {
      setError('닉네임은 6자 이하로 해주세요');
      return;
    }
    if (userId && name && email && password && nickname) {
      dispatch(authActions.createUserStart(form));
    } else {
      // 위에 통과못했을때..
      setError('빈 칸을 모두 입력하세요.');
      return;
    }
  };

  // 3. 회원가입 성공 / 실패 처리
  useEffect(() => {
    if (authError) {
      // 회원가입 도중 에러났을 때
      setError(authError); // 이걸로 에러메시지 띄움(빨간글씨)
      return;
    }

    if (isAuth) {
      console.log('회원가입 성공');
      navigate('/mypage');
    }
  }, [isAuth, authError, dispatch]);

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
