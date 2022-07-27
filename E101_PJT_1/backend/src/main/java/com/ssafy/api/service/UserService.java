package com.ssafy.api.service;

import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.db.entity.User;

import java.util.List;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface UserService {
	User createUser(UserRegisterPostReq userRegisterInfo);
	User getUserByUserId(String userId);
	User updateUserInfo(String userId, User user);

	Boolean checkIdDuplicated(String userId);

	Boolean checkNicknameDuplicated(String nickname);

	List<User> getAllUsers();
}
