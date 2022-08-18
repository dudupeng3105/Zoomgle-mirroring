package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.common.cumtomObject.RoomInfoAndPhoto;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * 게임방 정보와 사진리스트 API ([GET] /api/rooms/date) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("RoomAndPhotoResponse")
public class RoomAndPhotoRes extends BaseResponseBody {
    List<RoomInfoAndPhoto> roomInfoAndPhotoList;

    public static RoomAndPhotoRes of(Integer statusCode, String message, List<RoomInfoAndPhoto> roomInfoAndPhotoList) {
        RoomAndPhotoRes res = new RoomAndPhotoRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setRoomInfoAndPhotoList(roomInfoAndPhotoList);
        return res;
    }

}
