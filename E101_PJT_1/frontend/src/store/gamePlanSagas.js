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
} from './api';

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
    console.log('게임플랜리스트응답', response.data);
    if (response.status === 200) {
      // 게임플랜리스트가져오기 성공
      yield put(getGamePlanListSuccess(response.data));
    }
  } catch (error) {
    yield put(getError(error.response.data));
  }
}

function* oncreateGamePlan() {
  const { createGamePlanStart } = gamePlanActions;
  yield takeLatest(createGamePlanStart, oncreateGamePlanAsync);
}

function* onGamePlanList() {
  const { getGamePlanListStart } = gamePlanActions;
  yield takeLatest(getGamePlanListStart, getGamePlanListAsync);
}

export const gamePlanSagas = [
  fork(oncreateGamePlan),
  fork(onGamePlanList)
];
