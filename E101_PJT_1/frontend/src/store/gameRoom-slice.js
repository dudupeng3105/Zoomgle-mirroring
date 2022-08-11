import { createSlice } from '@reduxjs/toolkit';

// GameRoom 관련 슬라이스
// 슬라이스
const initialGameRoomState = {
  // gamePlanList: [],
  // invitationList: [],
  loading: null,
  takePicResult: null,
};

const gameRoomSlice = createSlice({
  name: 'gameRoom',
  initialState: initialGameRoomState,
  reducers: {
    // 사진 찍기 시작
    takePictureStart(state, action) {
      state.loading = true;
      state.takePicResult = null;
    },
    // 게임플랜리스트 성공 시 state 업데이트
    takePictureSuccess(state, action) {
      state.loading = false;
      state.takePicResult = action.payload.message;
    },
    // 모든 에러 이걸로 처리함
    getError(state, action) {
      state.loading = false;
      state.takePicResult = action.payload.message;
    },
  },
});

export const gameRoomActions = gameRoomSlice.actions;

export default gameRoomSlice.reducer;