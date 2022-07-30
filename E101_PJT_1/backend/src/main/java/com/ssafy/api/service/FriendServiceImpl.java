package com.ssafy.api.service;

import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.db.entity.Friend;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.FriendRepository;
import com.ssafy.db.repository.UserRepository;
import com.ssafy.db.repository.UserRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

/**
 * 친구 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("friendService")
public class FriendServiceImpl implements FriendService {
	@Autowired
	FriendRepository friendRepository;

	@Override
	/**
	 * myId로 친구 리스트 불러오는 메서드
	 */
	public List<Friend> getAllFriend(String myId) {
		return friendRepository.findAllByMyId(myId);
	}

	
	@Override
	/**
	 * 친구관계 추가하는 메서드
	 */
	public Friend createFriend(String myId, String friendId) {
		Friend friend = new Friend();
		friend.setMyId(myId);
		friend.setFriendId(friendId);
		return friendRepository.save(friend);
	}

	
	@Override
	/**
	 * 친구관계가 존재하는지 확인하는 메서드
	 */
	public boolean alreadyFriend(String myId, String friendId) {
		if(friendRepository.findByMyIdAndFriendId(myId, friendId) == null){
			return false;
		} else {
			return true;
		}
	}


}
