package com.ssafy.api.service;

import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.db.entity.Friend;
import com.ssafy.db.entity.User;

import java.util.List;

/**
 *	친구 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface FriendService {
    List<Friend> getAllFriend(String myId);

    Friend createFriend(String myId, String friendId);

    boolean alreadyFriend(String myId, String friendId);
}
