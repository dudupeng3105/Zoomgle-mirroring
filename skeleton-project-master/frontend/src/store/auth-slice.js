import { createSlice } from '@reduxjs/toolkit';

// Authentication 관련 슬라이스
// 슬라이스 - 이름, 초깃값, 리듀서 함수들 필요
// 리듀서의 이름이 액션타입이 됨
const initialAuthState = {
  // isAuthenticated: false
  // 회원가입관련
  register: {
    userId: '',
    name: '',
    email: '',
    password: '',
    nickName: '',
  },
  // 로그인관련
  login: {
    userId: '',
    password: '',
  },
  loading: false, // 로딩중/끝
  isAuth: null,  // 로그인 유무
  error: null, // 에러 유무
  user: null // 유저 정보 저장
};

// 참조
// 이경우에는 action.type이외의 다른 action.???이 쓰일 수 있으므로 action을 넣어준다.
// payloa는 아래와 같이 받음
// increase(state, action) {
//   state.counter = state.counter + action.payload;
// },

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    // form 업데이트
    changeField(state, action) {
      // register, email, abc@naver.com
      const {form, key, value} = action.payload;
      state[form][key] = value; 
      // ex > state.register.userId 변경
    },
    initializeForm(state, action) {
      console.log(action.payload)
      const type = action.payload;      
      // state[type] = initialAuthState[type];
      console.log(state.user)
      state.error = null;
    },
    // 회원가입
    createUserStart(state) {
      state.loading = true;
    },
    createUserSuccess(state, action) {
      state.loading = false;
      const {user, accessToken} = action.payload;
      state.user = user;
      localStorage.setItem('token', accessToken);
      localStorage.setItem('user', JSON.stringify(user));
      state.isAuth = true;
    },
    createUserError(state, action) {
      state.loading = false;
      state.error =  action.payload;
    }, 
    // 로그인
    loginUserStart(state) {
      state.loading = true;
    },
    loginUserSuccess(state, action) {
      state.loading = false;
      // console.log("페이로드", action.payload);
      const {user, accessToken} = action.payload;
      state.user = user;
      localStorage.setItem('token', accessToken);
      localStorage.setItem('user', JSON.stringify(user));
      state.isAuth = true;
    },
    loginUserError(state, action) {
      state.loading = false;
      state.isAuth = false; 
      state.error = action.payload;   
    }, 
    // setUser  
    setUser(state, action) {
      state.user = action.payload;
      state.isAuth = true;
    } 
  }
});

// 액션s 안에 액션오브젝트랑 타입이랑 다있음
// 그래서 순수 redux쓸 때처럼 액션타입, 액션객체 선언 필요없음
export const authActions = authSlice.actions;

export default authSlice.reducer;