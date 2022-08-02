// import axios from "axios";
import { customAxios, customJWTAxios } from "./customAxios";

// 회원가입 관련 - 아이디 중복 체크
export const checkUserId = async (userId) => (  
  await customAxios.get(`api/users/check-id/${userId}`)  
)
// 회원가입 - 닉네임 중복 체크
export const checkNickname = async (nickname) => (
  await customAxios.get(`api/users/check-nickname/${nickname}`)
)
// 회원가입 - 회원 가입 요청
export const createUserApi = async (user) => 
  await customAxios.post("api/users/", user);

export const loginUserApi = async (user) => 
  await customAxios.post("api/auth/login", user);
  
// 회원정보 수정(UPDATE)
export const updateUserApi = async (user) => 
  await customJWTAxios.put("api/users/my-info", user);

// 회원정보 겟(GET)
export const getUserApi = async () => 
  await customJWTAxios.get("api/users/my-info");


// 친구 - 친구 리스트, 친구 추가
export const getFriendsListApi = async (userId) => 
  await customAxios.get(`api/friends/${userId}`);

export const addFriendApi = async (infoId) => 
  await customAxios.post("api/friends", infoId);