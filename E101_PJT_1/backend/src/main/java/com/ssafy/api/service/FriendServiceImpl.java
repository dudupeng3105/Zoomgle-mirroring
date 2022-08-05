package com.ssafy.api.service;

import com.ssafy.common.myObject.FriendInfoInterface;
import com.ssafy.db.entity.Friend;
import com.ssafy.db.repository.FriendRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 친구 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("friendService")
public class FriendServiceImpl implements FriendService {
	@Autowired
	FriendRepository friendRepository;

	/**
	 * 내 닉네임으로 친구 정보 얻어오는 메서드
	 */
	@Override
	public List<FriendInfoInterface> getAllFriendInfo(String myNickname) {
		return friendRepository.findAllFriendByNickname(myNickname);
	}


	@Override
	/**
	 * 친구관계 추가하는 메서드
	 */
	public Friend createFriend(String myNickname, String friendNickname) {
		Friend friend = new Friend();
		friend.setMyNickname(myNickname);
		friend.setFriendNickname(friendNickname);
		return friendRepository.save(friend);
	}

	
	@Override
	/**
	 * 친구관계가 존재하는지 확인하는 메서드
	 */
	public boolean alreadyFriend(String myNickname, String friendNickname) {
		if(friendRepository.findByMyNicknameAndFriendNickname(myNickname, friendNickname) == null){
			return false;
		} else {
			return true;
		}
	}


}
