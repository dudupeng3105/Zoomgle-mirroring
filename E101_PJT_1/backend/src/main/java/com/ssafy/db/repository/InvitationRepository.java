package com.ssafy.db.repository;

import com.ssafy.db.entity.Invitation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 게임 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface InvitationRepository extends JpaRepository<Invitation, Long> {
    // 아래와 같이, Query Method 인터페이스(반환값, 메소드명, 인자) 정의를 하면 자동으로 Query Method 구현됨.

    List<Invitation> findAllByReceiver(String user);

    List<Invitation> findAllByRoomCode(long roomCode);

    Invitation findByRoomCodeAndReceiverAndSender(long roomCode, String receiver,String sender);
}
