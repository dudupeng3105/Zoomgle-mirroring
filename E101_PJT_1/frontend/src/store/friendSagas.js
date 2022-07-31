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

import { friendActions } from './friends-slice';

// api import
import { getFriendsListApi, addFriendApi } from './api';

function* onGetFriendListAsync({ payload }) {
  const { GetFriendListSuccess, GetFriendListError } = friendActions;
  try {
    console.log("친구리스트인풋", payload)
    const response = yield call(getFriendsListApi, payload);
    console.log("친구리스트응답", response.data);
    if (response.status === 200) {      
      yield put(GetFriendListSuccess(response.data));
    }
  } catch (error) {
    yield put(GetFriendListError(error.response.data));
  }
}

function* onAddFriendAsync({ payload }) {
  const { GetFriendListStart, AddFriendResultMessage } = friendActions;
  try {
    console.log("친구추가인풋", payload)
    const response = yield call(addFriendApi, payload);
    console.log("친구리스트응답", response.data);
    if (response.status === 200) {   
      // 친구 추가 됐으면 리스트 스타트해야함   
      yield put(GetFriendListStart(payload.myId)); // 리스트
      yield put(AddFriendResultMessage(response.data)); // 성공메시지표현위해
    }
  } catch (error) {
    // 401 유저없음
    // 402 이미친구관계
    // 404 사용자 없음
    // 500 서버 오류
    yield put(AddFriendResultMessage(error.response.data));
  }
}

function* onGetFriendList() {
  const { GetFriendListStart } = friendActions;  
  yield takeLatest(GetFriendListStart, onGetFriendListAsync);
}

function* onAddFriend() {
  const { AddFriendStart } = friendActions;  
  yield takeLatest(AddFriendStart, onAddFriendAsync);
}

export const friendSagas = [
  fork(onGetFriendList),  
  fork(onAddFriend),
];
