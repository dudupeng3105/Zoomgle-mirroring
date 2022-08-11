// 사가 관련
// import { applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { all } from 'redux-saga/effects';

// 스토어 통합관련(리듀서들, 사가들)
import { configureStore, combineReducers } from '@reduxjs/toolkit';

// saga 관리
import { authSagas } from './authSagas';
import { friendSagas } from './friendSagas';
import { gamePlanSagas } from './gamePlanSagas';
import { gameRoomSagas } from './gameRoomSagas';

// 관리하는 슬라이스들
import authReducer from './auth-slice';
import friendReducer from './friends-slice';
import gamePlanReducer from './gamePlan-slice';
import gameRoomReducer from './gameRoom-slice'

// rootReducers by using combineReducers
const rootReducers = combineReducers({
  auth: authReducer,
  friend: friendReducer,
  gamePlan: gamePlanReducer,
  gameRoom: gameRoomReducer,
});

// rootSaga
function* rootSaga() {
  yield all([...authSagas, ...friendSagas, ...gamePlanSagas, ...gameRoomSagas]);
}

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

// Store 구성 -> configureStore
// 여러가지 리듀서를 하나로 합칠 수 있음
// 왜냐면 store는 리듀서 하나만 가져야되서 합침
const store = configureStore({
  // 여러 슬라이서의 리듀서를 합침
  reducer: rootReducers,
  middleware: middlewares,
});

sagaMiddleware.run(rootSaga);

// 외부에서 쓰려고
export default store;

// react-redux 라이브러리를 깔면
// 귀찮게 subscribe 함수 쓸 필요없음
// import { createStore } from 'redux'
