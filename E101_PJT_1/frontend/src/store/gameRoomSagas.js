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

import { gameRoomActions } from './gameRoom-slice';

// api import
import {
  takePictureApi,
  getPictureApi,
  postSelectedPictureApi,
  postGameDoneApi
} from './api';

function* takePictureStartAsync({ payload }) {
  const { takePictureSuccess, getRoomError } = gameRoomActions;  
  const { picData, roomSeq } = payload;  
  try {
    const response = yield call(takePictureApi, picData, roomSeq);
    console.log('사진찍기응답', response);
    if (response.status === 200) {      
      yield put(takePictureSuccess(response.data));
    }
  } catch (error) {
    yield put(getRoomError(error.response.data));
  }
}

function* getPictureListStartAsync({ payload }) {
  const { getPictureSuccess, getRoomError } = gameRoomActions;  
  const roomSeq = payload;  
  console.log(roomSeq);
  try {
    const response = yield call(getPictureApi, roomSeq);
    console.log('사진가져오기응답', response);
    if (response.status === 200) {      
      yield put(getPictureSuccess(response.data));
    }
  } catch (error) {
    yield put(getRoomError(error.response.data));    
  }
}

function* postSelectedPicture({ payload }) {
  const { postSelectedPicSuccess, getRoomError } = gameRoomActions;  
  const selectedPicInfo = payload.selectedPicInfo;
  const mvpName = payload.mvpName;
  console.log("selectedinfo", selectedPicInfo);
  // 여기서 나중에 게임 끝났다는거도 알려줘야함  
  try {
    const responseSelected = yield call(postSelectedPictureApi, selectedPicInfo);
    console.log('6장보내기응답', responseSelected);
    const gameDoneInfo = {
      mvp: mvpName,
      roomCode: selectedPicInfo.roomSeq
    }
    
    const response = yield call(postGameDoneApi, gameDoneInfo);
    console.log('mvp 응답', response);
    if (response.status === 200) {      
      yield put(postSelectedPicSuccess(response.data));
    }
  } catch (error) {
    yield put(getRoomError(error.response.data));
  }
}

// takePictureStart 보고 있다가 takePictureStart 실행되면 
// 그때 가로채서 takePictureStartAsync 실행한다.
function* ontakePicture() {
  const { takePictureStart } = gameRoomActions;
  yield takeLatest(takePictureStart, takePictureStartAsync);
}

function* ongetPictureList() {
  const { getPictureStart } = gameRoomActions;
  yield takeLatest(getPictureStart, getPictureListStartAsync);
}

function* onpostSelectedPicture() {
  const { postSelectedPicStart } = gameRoomActions;
  yield takeLatest(postSelectedPicStart, postSelectedPicture);
}

export const gameRoomSagas = [
  fork(ontakePicture),  
  fork(ongetPictureList), 
  fork(onpostSelectedPicture), 
];
