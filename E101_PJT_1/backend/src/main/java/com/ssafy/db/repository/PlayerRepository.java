package com.ssafy.db.repository;

import com.ssafy.db.entity.Invitation;
import com.ssafy.db.entity.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 게임 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {
    // 아래와 같이, Query Method 인터페이스(반환값, 메소드명, 인자) 정의를 하면 자동으로 Query Method 구현됨.
    List<Player> findAllByUser(String user);

    Player findByRoomCodeAndUser(long roomCode, String user);

    List<Player> findAllByRoomCode(long roomCode);

    @Query(value = "select count(*) from room r, player p where r.room_seq = p.room_code and p.user = :nickname and r.mvp is not null;", nativeQuery = true)
    int countGamesDone(String nickname);

    @Query(value = "select count(*) from room r, player p where r.room_seq = p.room_code and p.user = :nickname and r.mvp is null;", nativeQuery = true)
    int countGamesNotDone(String nickname);

}