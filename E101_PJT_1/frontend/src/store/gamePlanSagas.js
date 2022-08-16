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

import { gamePlanActions } from './gamePlan-slice';

// api import
import {
  createGamePlanApi,
  getGamePlanListApi,
  getInvitaionListApi,
  checkInvitaionApi,
  sendInvitaionApi,
  getGameDoneListApi,
  getGameDonePhotoApi,
  deleteGamePlanApi
} from './api';

// 비동기처리 함수
function* oncreateGamePlanAsync({ payload }) {
  const { getGamePlanListStart, getError } = gamePlanActions;
  try {
    console.log('게임예약인풋', payload);
    const response = yield call(createGamePlanApi, payload);
    console.log('게임예약응답', response.data);
    if (response.status === 200) {
      yield put(getGamePlanListStart());
    }
  } catch (error) {
    yield put(getError(error.response.data));
  }
}

function* getGamePlanListAsync({ payload }) {
  const { getGamePlanListSuccess, getError } = gamePlanActions;
  try {
    const response = yield call(getGamePlanListApi);
    console.log('게임플랜리스트응답', response);
    if (response.status === 200) {
      // 게임플랜리스트가져오기 성공
      yield put(getGamePlanListSuccess(response.data));
    }
  } catch (error) {
    yield put(getError(error.response.data));
  }
}

function* getInvitaionListAsync({ payload }) {
  const { getInvitaionListSuccess, getError } = gamePlanActions;
  try {    
    const response = yield call(getInvitaionListApi);
    console.log('초대장플랜리스트응답', response.data);
    if (response.status === 200 | response.status === 201) {
      // 초대장리스트가져오기 성공
      // getInvitaionListSuccess을 디스패치함(slice가서 확인)
      yield put(getInvitaionListSuccess(response.data));
    }
  } catch (error) {
    yield put(getError(error.response.data));
  }
}

function* SendInvitationAsync({ payload }) {
  const { sendInvitaionSuccess, getError } = gamePlanActions;
  try {
    console.log('초대장보내기인풋', payload);
    const response = yield call(sendInvitaionApi, payload);
    console.log('초대장보내기응답', response.data);
    if (response.status === 200) {
      // 초대장보내기 성공
      yield put(sendInvitaionSuccess(response.data));
    }
  } catch (error) {
    yield put(getError(error.response.data));
  }
}

function* CheckInvitationAsync({ payload }) {
  const { checkInvitaionSuccess, getError, getInvitaionListStart } = gamePlanActions;
  try {
    console.log('초대장승락인풋', payload);
    // checkInvitaionApi로 요청
    // call은 api call
    const response = yield call(checkInvitaionApi, payload);
    console.log('초대장승락응답', response.data);
    if (response.status === 200) {
      // 초대장 승낙 성공
      // 초대 리스트를 한번 더 들고옴
      yield put(getInvitaionListStart());
    }
  } catch (error) {
    // put은 액션을 디스패치
    yield put(getInvitaionListStart());
    yield put(getError(error.response.data));
  }
}


function* GetGameDoneListAsync() {
  const { getGameDoneListSuccess, getError } = gamePlanActions;
  try {
    const response = yield call(getGameDoneListApi);
    console.log('종료된 게임가져오기', response.data);
    if (response.status === 200) {      
      yield put(getGameDoneListSuccess(response.data));
    }
  } catch (error) {
    yield put(getError(error.response.data));
  }
}

function* GetGameDonePhotoAsync({payload}) {
  const { getGameDonePhotoSuccess, getError } = gamePlanActions;
  try {
    const response = yield call(getGameDonePhotoApi, payload);
    console.log('종료된 게임 사진가져오기', response.data);
    if (response.status === 200) {      
      yield put(getGameDonePhotoSuccess(response.data));
    }
  } catch (error) {
    yield put(getGameDonePhotoSuccess({
      photoList: []
    }))
    // yield put(getError(error.response.data));
  }
}

function* DeleteGamePlanAsync({payload}) {
  const { getGamePlanListSuccess, getError } = gamePlanActions;
  try {
    const responseDelete = yield call(deleteGamePlanApi, payload);
    console.log('게임 삭제하기', responseDelete);
    const response = yield call(getGamePlanListApi);
    if (response.status === 200) {      
      yield put(getGamePlanListSuccess(response.data));
    }
  } catch (error) {
    yield put(getError(error.response.data));
  }
}

// on : 바라보고 있는 함수
function* oncreateGamePlan() {
  const { createGamePlanStart } = gamePlanActions;
  yield takeLatest(createGamePlanStart, oncreateGamePlanAsync);
}

function* onGamePlanList() {
  const { getGamePlanListStart } = gamePlanActions;
  yield takeLatest(getGamePlanListStart, getGamePlanListAsync);
}

function* onInvitationList() {
  const { getInvitaionListStart } = gamePlanActions;
  yield takeLatest(getInvitaionListStart, getInvitaionListAsync);
}

function* onSendInvitation() {
  const { sendInvitaionStart } = gamePlanActions;
  yield takeLatest(sendInvitaionStart, SendInvitationAsync);
}

// checkInvitaionStart를 보고 있다가 checkInvitaionStart이 실행되면 
// 그때 가로채서 CheckInvitationAsync을 실행한다.
function* oncheckInvitaion() {
  const { checkInvitaionStart } = gamePlanActions;
  yield takeLatest(checkInvitaionStart, CheckInvitationAsync);
}

function* ongetGameDoneList() {
  const { getGameDoneListStart } = gamePlanActions;
  yield takeLatest(getGameDoneListStart, GetGameDoneListAsync);
}

function* ongetGameDonePhoto() {
  const { getGameDonePhotoStart } = gamePlanActions;
  yield takeLatest(getGameDonePhotoStart, GetGameDonePhotoAsync);
}

function* ondeleteGamePlan() {
  const { deleteGamePlanStart } = gamePlanActions;
  yield takeLatest(deleteGamePlanStart, DeleteGamePlanAsync);
}

export const gamePlanSagas = [
  fork(oncreateGamePlan),
  fork(onGamePlanList),
  fork(onInvitationList),
  fork(onSendInvitation),
  fork(oncheckInvitaion),
  fork(ongetGameDoneList),
  fork(ongetGameDonePhoto),
  fork(ondeleteGamePlan),
];
