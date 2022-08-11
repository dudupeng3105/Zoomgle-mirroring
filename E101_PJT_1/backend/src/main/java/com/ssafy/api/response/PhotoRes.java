package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.common.myObject.PhotoInfo;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * 추억 리스트 조회 API ([GET] /api/photo/*) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("PhotoResponse")
public class PhotoRes extends BaseResponseBody {
    // 이름 프로필이미지 닉네임
    List<PhotoInfo> photoList;

    public static PhotoRes of(Integer statusCode, String message, List<PhotoInfo> photoList) {
        PhotoRes res = new PhotoRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setPhotoList(photoList);
        return res;
    }

}
