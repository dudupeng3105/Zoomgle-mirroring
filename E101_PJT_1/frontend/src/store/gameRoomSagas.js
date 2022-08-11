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
  takePictureApi
} from './api';

function* takePictureStartAsync({ payload }) {
  const { takePictureSuccess, getError } = gameRoomActions;  
  const { picData, roomSeq } = payload;  
  try {
    const response = yield call(takePictureApi, picData, roomSeq);
    console.log('사진찍기응답', response);
    if (response.status === 200) {      
      yield put(takePictureSuccess(response.data));
    }
  } catch (error) {
    yield put(getError(error.response.data));
  }
}

// takePictureStart 보고 있다가 takePictureStart 실행되면 
// 그때 가로채서 takePictureStartAsync 실행한다.
function* ontakePicture() {
  const { takePictureStart } = gameRoomActions;
  yield takeLatest(takePictureStart, takePictureStartAsync);
}

export const gameRoomSagas = [
  fork(ontakePicture),  
];
