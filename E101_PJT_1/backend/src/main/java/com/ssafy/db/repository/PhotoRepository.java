package com.ssafy.db.repository;

import com.ssafy.common.myObject.PhotoInfo;
import com.ssafy.db.entity.Photo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 추억사진 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface PhotoRepository extends JpaRepository<Photo, Long> {
    // 아래와 같이, Query Method 인터페이스(반환값, 메소드명, 인자) 정의를 하면 자동으로 Query Method 구현됨.

    @Query(value = "select photo_url from photo where room_seq " +
            " IN (select room_seq from room " +
            " where date = :date and room_seq " +
            " IN (select room_code from player where user = :nickname))", nativeQuery = true)
    List<PhotoInfo> getAllPhotoByDateAndNickname(@Param(value = "date") String date, @Param(value = "nickname") String nickname);

    @Query(value = "select ph.photo_url from player p, photo ph " +
            " where p.user = :nickname and p.room_code = ph.room_seq", nativeQuery = true)
    List<PhotoInfo> getAllPhotoByNickname(@Param(value = "nickname") String nickname);

    @Query(value = "select photo_url from photo where room_seq = :roomSeq", nativeQuery = true)
    List<PhotoInfo> getAllPhotoByRoomSeq(@Param(value = "roomSeq") long roomSeq);
}