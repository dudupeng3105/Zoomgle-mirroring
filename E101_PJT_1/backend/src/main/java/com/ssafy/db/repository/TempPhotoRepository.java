package com.ssafy.db.repository;

import com.ssafy.common.cumtomObject.PhotoInfo;
import com.ssafy.db.entity.TempPhoto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 임시추억사진 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface TempPhotoRepository extends JpaRepository<TempPhoto, Long> {
    // 아래와 같이, Query Method 인터페이스(반환값, 메소드명, 인자) 정의를 하면 자동으로 Query Method 구현됨.

    @Query(value = "select photo_url from temp_photo where room_seq = :roomSeq", nativeQuery = true)
    List<PhotoInfo> getAllByRoomSeq(@Param(value = "roomSeq") Long roomSeq);
}