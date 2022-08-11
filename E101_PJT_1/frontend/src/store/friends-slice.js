import { createSlice } from '@reduxjs/toolkit';

const initialFriendState = {  
  friendList: [],  
  loading: false, // 로딩중/끝
  error: null, // 에러 유무  
  addMessage: null, // add됐는지, 에러났는지
  addResult: false // add 성공유무
};

const friendSlice = createSlice({
  name: 'friend',
  initialState: initialFriendState,
  reducers: {    
    // 친구목록불러오기    
    GetFriendListStart(state) {
      state.loading = true;
      state.error = null;      
    },
    GetFriendListSuccess(state, action) {
      state.loading = false;
      state.friendList = action.payload.friendList;      
    },
    GetFriendListError(state, action) {
      state.loading = false;            
      state.error = action.payload.message;
    },    
    // 친구추가하기 
    AddFriendStart(state) {
      state.loading = true;
      state.addMessage = null;
      state.addResult = false;
    },
    AddFriendResultMessage(state, action) {      
      state.loading = false;      
      state.addMessage = action.payload.message;
      console.log(action.payload.statusCode);
      if (action.payload.statusCode === 200) {
        state.addResult = true;
        return;
      } else {
        state.addResult = false;
        return;
      }
    },
  },
});

// 액션s 안에 액션오브젝트랑 타입이랑 다있음
// 그래서 순수 redux쓸 때처럼 액션타입, 액션객체 선언 필요없음
export const friendActions = friendSlice.actions;

export default friendSlice.reducer;
