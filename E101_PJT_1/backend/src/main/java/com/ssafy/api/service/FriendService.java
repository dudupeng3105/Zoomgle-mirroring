package com.ssafy.api.service;

import com.ssafy.common.myObject.FriendInfoInterface;
import com.ssafy.db.entity.Friend;

import java.util.List;

/**
 *	친구 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface FriendService {

    List<FriendInfoInterface> getAllFriendInfo(String myNickname);

    Friend createFriend(String myNickname, String friendNickname);

    boolean alreadyFriend(String myNickname, String friendNickname);
}
