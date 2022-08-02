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
import {
  createUserApi,
  checkNickname,
  checkUserId,
  loginUserApi,
  updateUserApi,
  getUserApi,
} from './api';

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
    console.log("로그인인풋", payload)
    const response = yield call(loginUserApi, payload);
    console.log("로그인응답", response.status);
    if (response.status === 200) {      
      yield put(loginUserSuccess(response.data));
    }
  } catch (error) {
    console.log(error)
    if (error.response.status === 401) {
      yield put(loginUserError("비밀번호가 틀렸습니다."));
    } else if (error.response.status === 500) {
      yield put(loginUserError("등록되지 않은 아이디 입니다."));
    } else {
      yield put(loginUserError("서버 오류나 기타 오류입니다."));
    }
  }
}
// 밑에 함수는 여기저기 아직 고칠 곳이 많습니다!!
function* onUpdateUserStartAsync({ payload }) {
  const { updateUserSuccess, updateUserError, getUser} = authActions;  
  try {
    console.log("업데이트유저인풋", payload)
    const response = yield call(updateUserApi, payload);
    console.log("업데이트유저응답(현재미완성이라성공해도500이올수있음)", response);
    // if (response.status === 200) {      
    //   yield put(loginUserSuccess(response.data));
    // }
  } catch (error) {
    yield put(getUser());
    console.log(error)     
  }
}
// 유저정보 가져오기!!
function* ongetUserStartAsync() {
  const { getUserSuccess, getUserError } = authActions;  
  try {
    // console.log("들어왔어요");
    const response = yield call(getUserApi);
    // console.log(response);
    yield put(getUserSuccess(response.data));    
  } catch (error) {
    console.log(error);
    yield put(getUserError(error.response.data));
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

function* onUpdateUser() {
  const { updateUser } = authActions;  
  yield takeLatest(updateUser, onUpdateUserStartAsync);
}

function* onGetUser() {
  const { getUser } = authActions;  
  yield takeLatest(getUser, ongetUserStartAsync);
}

export const authSagas = [
  fork(onLoginUser),
  fork(onCreateUser),
  fork(onUpdateUser),
  fork(onGetUser),
];
