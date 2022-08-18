package com.ssafy.api.service;

import com.ssafy.common.cumtomObject.UserGameInfo;
import com.ssafy.db.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.db.entity.User;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("userService")
public class UserServiceImpl implements UserService {
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	UserRepositorySupport userRepositorySupport;
	
	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	PlayerRepository playerRepository;

	@Autowired
	RoomRepository roomRepository;

	@Autowired
	FriendRepository friendRepository;
	
	@Override
	public User createUser(UserRegisterPostReq userRegisterInfo) {
		User user = new User();
		user.setUserId(userRegisterInfo.getUserId());
		// 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
		user.setPassword(passwordEncoder.encode(userRegisterInfo.getPassword()));
		user.setNickname(userRegisterInfo.getNickname());
		user.setName(userRegisterInfo.getName());
		user.setEmail(userRegisterInfo.getEmail());
		user.setProfileImgNum(userRegisterInfo.getProfileImgNum());
		return userRepository.save(user);
	}

	@Override
	public User getUserByUserId(String userId) {
		// 디비에 유저 정보 조회 (userId 를 통한 조회).

		User user = userRepositorySupport.findUserByUserId(userId).get();
		return user;
	}

	@Override
	public User getUserByNickname(String nickname) {
		User user = userRepositorySupport.findUserByNickname(nickname).get();
		return user;
	}

	@Override
	public User updateUserInfo(String userId, UserRegisterPostReq updateInfo) {
		Optional<User> updatedUser = userRepositorySupport.findUserByUserId(userId);
		if (updatedUser.isPresent()) {
			updatedUser.get().setName(updateInfo.getName());
			if (userRepository.countByNickname(updateInfo.getNickname()) != 0) {
				if (!updatedUser.get().getNickname().equals(updateInfo.getNickname())) {
					return null;
				}
			}
			updatedUser.get().setNickname(updateInfo.getNickname());
			updatedUser.get().setPassword(passwordEncoder.encode(updateInfo.getPassword()));
			updatedUser.get().setProfileImgNum(updateInfo.getProfileImgNum());
			updatedUser.get().setEmail(updateInfo.getEmail());
		}
		userRepository.save(updatedUser.get());
		return updatedUser.get();
	}

	@Override
	public Boolean checkIdDuplicated(String userId) {
		if (userRepository.countByUserId(userId) == 0) {
			return true;
		};
		return false;
	}

	@Override
	public Boolean checkNicknameDuplicated(String nickname) {
		if (userRepository.countByNickname(nickname) == 0) {
			return true;
		};
		return false;
	}

	@Override
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}

	@Override
	public void deleteUser(User user) { userRepository.delete(user); }

	@Override
	@Transactional
	public UserGameInfo getUserGameInfo(String nickname) {
		UserGameInfo userGameInfo = new UserGameInfo();

		// 닉네임 이메일 가입 일
		Optional<User> user = userRepositorySupport.findUserByNickname(nickname);
		userGameInfo.setNickname(nickname);
		userGameInfo.setEmail(user.get().getEmail());
		userGameInfo.setReg_dtm(user.get().getREG_DTM());

		// 플레이 한 횟수, 예정된 게임 수
		userGameInfo.setPastGameCount(playerRepository.countGamesDone(nickname));
		userGameInfo.setFutureGameCount(playerRepository.countGamesNotDone(nickname));

		// mvp 횟수
		userGameInfo.setMvpCount(roomRepository.countAllByMvp(nickname));

		// 친구 수
		userGameInfo.setFriendCount(friendRepository.countAllByMyNickname(nickname));
		return userGameInfo;
	}
}
