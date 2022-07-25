import {
  take,
  takeEvery,
  takeLatest,
  put,
  all,
  delay,
  fork,
  call,
} from "redux-saga/effects";

import { authActions } from './auth-slice';

// api import
import { createUserApi, loginUserApi } from './api';

function* onCreateUserStartAsync ({payload}) {
  const { createUserSuccess, createUserError } = authActions;
  try {
    const response = yield call(createUserApi, payload);
    // console.log(response)
    if(response.status === 201){      
      // 201 created!
      yield put(createUserSuccess(response.data)) ;
    }
  } catch(error) {
    yield put(createUserError(error.response.data));
  }  
}

function* onLoginUserStartAsync ({payload}) {
  const { loginUserSuccess, loginUserError } = authActions;
  try {
    // console.log(payload)
    const response = yield call(loginUserApi, payload);
    // console.log(response)
    if(response.status === 200){      
      // 201 created!
      yield put(loginUserSuccess(response.data)) ;
    }
  } catch(error) {
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