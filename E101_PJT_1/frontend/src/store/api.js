// import axios from "axios";
import { customAxios, customJWTAxios } from './customAxios';

// 회원가입 관련 - 아이디 중복 체크
export const checkUserId = async (userId) =>
  await customAxios.get(`api/users/check-id/${userId}`);
// 회원가입 - 닉네임 중복 체크
export const checkNickname = async (nickname) =>
  await customAxios.get(`api/users/check-nickname/${nickname}`);
// 회원가입 - 회원 가입 요청
export const createUserApi = async (user) =>
  await customAxios.post('api/users/', user);

export const loginUserApi = async (user) =>
  await customAxios.post('api/auth/login', user);

// 회원정보 수정(UPDATE)
export const updateUserApi = async (user) =>
  await customAxios.put('api/users/my-info', user, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

// 회원정보 겟(GET)
export const getUserApi = async () =>
  await customAxios.get('api/users/my-info', {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

// 친구 - 친구 리스트, 친구 추가
export const getFriendsListApi = async (nickname) =>
  await customAxios.get(`api/friends/${nickname}`);

export const addFriendApi = async (infoId) =>
  await customAxios.post('api/friends', infoId);

export const deleteFriendApi = async (friendDeleteInfo) => {
  console.log("요청", friendDeleteInfo)
  return await customAxios.delete('api/friends', {
    data: friendDeleteInfo,
  });
}

// 게임예약 - 게임 예약 만들기, 게임 리스트 가져오기
export const createGamePlanApi = async (planInfo) => {
  return await customAxios.post('api/rooms', planInfo, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const getGamePlanListApi = async () =>
  await customAxios.get('api/rooms/list', {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

export const sendInvitaionApi = async (inviteInfo) =>
  await customAxios.post('api/invitations', inviteInfo, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

// 초대장 get, 초대장 승락
export const getInvitaionListApi = async () =>
  await customAxios.get('api/invitations/list', {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

export const checkInvitaionApi = async (invitationInfo) =>
  await customAxios.post('api/invitations/manager', invitationInfo, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

// 사진 저장
export const takePictureApi = async (picData, roomSeq) =>
  await customAxios.post(`api/photos/temp/${roomSeq}`, picData);

// 사진 가져오기
export const getPictureApi = async (roomSeq) =>
await customAxios.get(`api/photos/tempPhoto/${roomSeq}`);

// 사진 6장 보내기
export const postSelectedPictureApi = async (selectedPicInfo) =>
await customAxios.post('api/photos', selectedPicInfo);

// 게임 끝난거 알려주기(MVP 정보)
export const postGameDoneApi = async(gameDoneInfo) =>
await customAxios.post('api/rooms/done', gameDoneInfo);

// 끝난 게임 가져오기
export const getGameDoneListApi = async () =>
  await customAxios.get('api/rooms/list/done', {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

// 해당 게임의 추억사진 가져오기
export const getGameDonePhotoApi = async (roomSeq) =>
  await customAxios.get(`api/photos/${roomSeq}`);

// 예정된 게임 삭제하기
export const deleteGamePlanApi = async (roomSeq) =>
  await customAxios.delete(`api/rooms/${roomSeq}`, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

// 유저 프로필 정보 가져오기
export const getUserProfileInfoApi = async () =>
  await customAxios.get('api/users/user-game-info', {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });


// export const getInvitaionListApi = async () =>
//   await customJWTAxios.get('api/invitations/list');
