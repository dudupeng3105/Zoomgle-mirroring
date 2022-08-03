import { createSlice } from '@reduxjs/toolkit';

// GamePlan 관련 슬라이스
// 슬라이스
const initialGamePlanState = {
  gamePlanList: [],
  invitationList: [],
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
    getGamePlanListStart(state) {
      state.loading = true;
      state.error = null;
    },
    // 게임플랜리스트 성공 시 state 업데이트
    getGamePlanListSuccess(state, action) {
      console.log(action.payload.playerList);
      state.loading = false;
      state.gamePlanList = action.payload.playerList;
    },
    // 초대장리스트 스타트
    getInvitaionListStart(state) {
      state.loading = true;
      state.error = null;
    },
    // 초대장리스트 성공
    getInvitaionListSuccess(state, action) {
      console.log(action.payload);
      state.loading = false;
      state.invitationList = action.payload.invitationList;
      
    },
    // 초대장리스트 스타트
    sendInvitaionStart(state) {
      state.loading = true;
      state.error = null;
    },
    // 초대장리스트 성공
    sendInvitaionSuccess(state, action) {
      console.log(action.payload);
      state.loading = false;
      // state.gamePlanList = action.payload.playerList;
    },
    // 초대장승락 스타트    
    checkInvitaionStart(state) {
      state.loading = true;
      state.error = null;
    },
    // 초대장승락 성공
    checkInvitaionSuccess(state, action) {
      console.log(action.payload);
      state.loading = false;
      // state.gamePlanList = action.payload.playerList;
    },
    // 모든 에러 이걸로 처리함
    getError(state, action) {
      console.log(action.payload.error);
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const gamePlanActions = gamePlanSlice.actions;

export default gamePlanSlice.reducer;
