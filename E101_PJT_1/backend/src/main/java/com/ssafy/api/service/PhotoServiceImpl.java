package com.ssafy.api.service;

import com.ssafy.common.myObject.PhotoInfo;
import com.ssafy.common.util.S3Uploader;
import com.ssafy.db.entity.Photo;
import com.ssafy.db.entity.TempPhoto;
import com.ssafy.db.repository.PhotoRepository;
import com.ssafy.db.repository.TempPhotoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;

/**
 * 추억 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("photoService")
public class PhotoServiceImpl implements PhotoService {

    @Autowired
    S3Uploader s3Uploader;

    @Autowired
    PhotoRepository photoRepository;

    @Autowired
    TempPhotoRepository tempPhotoRepository;

    /**
     * 유저 닉네임과 날짜로 추억 사진 불러오는 메서드
     */
    @Override
    public List<PhotoInfo> getAllPhotoByNicknameAndDate(String date, String nickname) {
        return photoRepository.getAllPhotoByDateAndNickname(date, nickname);
    }

    /**
     * 유저 닉네임으로 추억 사진 불러오는 메서드
     */
    @Override
    public List<PhotoInfo> getAllPhotoByNickname(String nickname) {
        return photoRepository.getAllPhotoByNickname(nickname);
    }

    /**
     * 게임 진행하는 동안 캡쳐된 사진을 우선 S3에 저장하는 메서드
     */
    @Override
    @Transactional
    public String saveTempPhoto(MultipartFile multipartFile, String date, String roomSeq) throws IOException {
        // S3에 저장
        String[] dateSplit = date.split(" ")[0].split("/");
        String dirDate = dateSplit[2] + "년" + dateSplit[0] + "월" + dateSplit[1] + "일";
        String result = s3Uploader.upload(multipartFile, "temp/" + roomSeq + "-" + dirDate);

        // DB에 저장
        TempPhoto photo = new TempPhoto();
        photo.setRoomSeq(Long.parseLong(roomSeq));
        photo.setPhotoUrl(result);
        tempPhotoRepository.save(photo);
        return result;
    }

    /**
     * S3에 저장된 사진들 중 최대 6개 선정하여 추억으로 남기기 위해 DB에 저장하는 메서드
     */
    @Override
    public void savePhotoUrl(String photo_url, String roomSeq) {
        Photo photo = new Photo();
        photo.setRoomSeq(Long.parseLong(roomSeq));
        photo.setPhotoUrl(photo_url);
        photoRepository.save(photo);
    }

    @Override
    public List<PhotoInfo> showAllTempPhoto(String roomSeq) {
        return tempPhotoRepository.getAllByRoomSeq(Long.parseLong(roomSeq));
    }
}
