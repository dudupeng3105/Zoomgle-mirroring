package com.ssafy.db.repository;

import com.ssafy.common.myObject.FriendInfoInterface;
import com.ssafy.db.entity.Friend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 친구관계 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface FriendRepository extends JpaRepository<Friend, Long> {
    // 아래와 같이, Query Method 인터페이스(반환값, 메소드명, 인자) 정의를 하면 자동으로 Query Method 구현됨.

    Friend findByMyNicknameAndFriendNickname(String myNickname, String friendNickname);

    @Query(value = "select u.name, u.nickname, u.profile_img_num " +
            " from user u, friend f " +
            " where u.nickname = f.friend_nickname and f.my_nickname = ?1", nativeQuery = true)
    List<FriendInfoInterface> findAllFriendByNickname(String myNickname);

    int countAllByMyNickname(String nickname);
}