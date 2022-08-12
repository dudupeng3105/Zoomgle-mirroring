import { createSlice } from '@reduxjs/toolkit';

// GameRoom 관련 슬라이스
// 슬라이스
const initialGameRoomState = {
  gameTotalPicture: [],
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
    // 사진찍기 성공
    takePictureSuccess(state, action) {
      state.loading = false;
      state.takePicResult = action.payload.message;
    },
    // 해당 게임에서 찍은 사진 가져오기
    getPictureStart(state, action) {
      state.loading = true;
      state.gameTotalPicture = [];
    },
    // 사진 가져오기 성공
    getPictureSuccess(state, action) {
      state.loading = false;
      state.gameTotalPicture = action.payload.photoList;
    },
    // 6장 보내기 시작
    postSelectedPicStart(state, action) {
      state.loading = true;      
    },
    // 6장 보내기 성공
    postSelectedPicSuccess(state, action) {
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