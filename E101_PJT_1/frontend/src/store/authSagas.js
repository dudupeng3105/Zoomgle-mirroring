import {
  take,
  takeEvery,
  takeLatest,
  put,
  all,
  delay,
  fork,
  call,
} from 'redux-saga/effects';

import { authActions } from './auth-slice';

// api import
import { createUserApi, checkNickname, checkUserId, loginUserApi } from './api';

function* onCreateUserStartAsync({ payload }) {
  const { createUserError, loginUserStart } = authActions;

  try {
    // console.log("회원가입 form", payload)
    const { userId, nickname, password } = payload;
    // 아이디 중복 체크
    const responseId = yield call(checkUserId, userId);
    if (!responseId.data) {
      console.log('아이디가 중복이에여');
      yield put(createUserError({error: "아이디가 중복입니다"}));
      return;
    }
    // 닉네임 중복 체크
    const responseNickname = yield call(checkNickname, nickname);
    if (!responseNickname.data) {
      console.log('닉네임이 중복이에여');
      yield put(createUserError({error: "닉네임이 중복이에여"}));
      return;
    }
    // 회원가입 요청
    const response = yield call(createUserApi, payload);
    if (response.status === 200) {
      // 200 created! -> 회원가입 성공하면 -> 로그인 시키기      
      yield put(loginUserStart({userId, password}));      
    }
  } catch (error) {
    yield put(createUserError(error.response.data));    
  }
}

function* onLoginUserStartAsync({ payload }) {
  const { loginUserSuccess, loginUserError } = authActions;
  try {
    const response = yield call(loginUserApi, payload);
    console.log(response);
    if (response.status === 200) {      
      yield put(loginUserSuccess(response.data));
    }
  } catch (error) {
    yield put(loginUserError(error.response.data));
  }
}

function* onCreateUser() {
  const { createUserStart } = authActions;
  // console.log(authActions);
  // console.log(createUserStart);
  yield takeLatest(createUserStart, onCreateUserStartAsync);
}

function* onLoginUser() {
  const { loginUserStart } = authActions;
  // console.log(authActions);
  // console.log(createUserStart);
  yield takeLatest(loginUserStart, onLoginUserStartAsync);
}

export const authSagas = [
  fork(onLoginUser),
  fork(onCreateUser),
  // fork(onDeleteUser),
  // fork(onUpdateUser),
];
