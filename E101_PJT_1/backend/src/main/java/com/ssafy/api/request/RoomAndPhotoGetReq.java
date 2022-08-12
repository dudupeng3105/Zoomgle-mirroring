package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 게임방 정보와 사진리스트 API ([GET] /api/rooms/date) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("RoomAndPhotoGetRequest")
public class RoomAndPhotoGetReq {
    @ApiModelProperty(name = "닉네임", example = "myNickname")
    String nickname;
    @ApiModelProperty(name = "날짜", example = "8/3/2022")
    String date;
}
