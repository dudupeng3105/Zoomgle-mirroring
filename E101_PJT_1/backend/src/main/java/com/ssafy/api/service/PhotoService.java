package com.ssafy.api.service;

import com.ssafy.common.cumtomObject.PhotoInfo;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

/**
 * 추억 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface PhotoService {

    List<PhotoInfo> getAllPhotoByNicknameAndDate(String date, String nickname);

    List<PhotoInfo> getAllPhotoByNickname(String nickname);

    String saveTempPhoto(MultipartFile multipartFile, String date, String roomSeq) throws IOException;

    void savePhotoUrl(String photoUrl, String roomSeq);

    List<PhotoInfo> showAllTempPhoto(String roomSeq);

    List<PhotoInfo> getAllPhotoByRoomSeq(long roomSeq);

}
