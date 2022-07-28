import axios from "axios";

// 회원가입 관련 - 아이디 중복 체크
export const checkUserId = async (userId) => (  
  await axios.get(`/users/check-id/${userId}`)  
)
// 회원가입 - 닉네임 중복 체크
export const checkNickname = async (nickname) => (
  await axios.get(`/users/check-nickname/${nickname}`)
)
// 회원가입 - 회원 가입 요청
export const createUserApi = async (user) => 
  await axios.post("/users/", user);

export const loginUserApi = async (user) => 
  await axios.post("/auth/login", user);