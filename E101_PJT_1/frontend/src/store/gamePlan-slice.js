import { createSlice } from '@reduxjs/toolkit';

// GamePlan 관련 슬라이스
// 슬라이스
const initialGamePlanState = {
  gamePlanList: [],
  invitationList: [],
  gameDoneList: [],
  gameDonePhoto: [],
  invitationResult: 0,
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
      console.log(action.payload.roomInfoList);
      state.loading = false;
      state.gamePlanList = action.payload.roomInfoList;
    },
    // 초대장리스트 스타트
    getInvitaionListStart(state) {
      state.loading = true;
      state.error = null;
    },
    // 초대장리스트 성공
    getInvitaionListSuccess(state, action) {
      // gamePlanSagas의 getInvitaionListAsync의 
      // getInvitaionListSuccess(response.data)가 들어감
      console.log(action.payload);
      state.loading = false;
      // 받은 값을 state에 담음
      state.invitationList = action.payload.invitationInfoList;
      
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
      state.invitationResult = 1;
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
    // 종료된 게임 불러오기(사진첩에서 사용)
    getGameDoneListStart(state){
      state.loading = true;
      state.error = null;
    },
    getGameDoneListSuccess(state, action){
      state.loading = true;
      state.gameDoneList = action.payload.roomInfoList;
    },
    // 종료된 게임의 사진불러오기(사진첩에서 사용)
    getGameDonePhotoStart(state){
      state.loading = true;
      state.error = null;
    },
    getGameDonePhotoSuccess(state, action){
      state.loading = true;
      state.gameDonePhoto = action.payload.photoList;
    },
    // 예정된 게임 취소(게임 취소)
    deleteGamePlanStart(state){
      state.loading = true;
      state.error = null;
    },
    // 모든 에러 이걸로 처리함
    getError(state, action) {
      console.log(action.payload.error);
      state.loading = false;
      state.invitationResult = 2;
      state.error = action.payload.error;
    },
    resetResult(state) {
      state.invitationResult = 0;
    }
  },
});

export const gamePlanActions = gamePlanSlice.actions;

export default gamePlanSlice.reducer;
