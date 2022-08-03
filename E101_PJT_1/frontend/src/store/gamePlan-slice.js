import { createSlice } from '@reduxjs/toolkit';

// GamePlan 관련 슬라이스
// 슬라이스
const initialGamePlanState = {
  gamePlanList: [],
  invitationsList: [],
  loading: null,
  error: null,
};

const gamePlanSlice = createSlice({
  name: 'gamePlan',
  initialState: initialGamePlanState,
  reducers: {
    // reset(state) {
    //   Object.assign(state, initialAuthState);
    // },

    // 게임 예약 만들기
    createGamePlanStart(state) {
      state.loading = true;
      state.error = null;
    },
    // 게임플랜리스트 스타트
    getGamePlanListStart(state, action) {
      state.loading = true;
      state.error = null;
    },
    // 게임플랜리스트 성공 시 state 업데이트
    getGamePlanListSuccess(state, action) {
      console.log(action.payload);
      state.loading = false;
    },
    // 모든 에러 이걸로 처리함
    getError(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const gamePlanActions = gamePlanSlice.actions;

export default gamePlanSlice.reducer;
