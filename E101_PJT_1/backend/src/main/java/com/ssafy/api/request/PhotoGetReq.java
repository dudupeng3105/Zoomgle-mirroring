package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 추억 리스트 API ([GET] /api/photos) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("PhotoGetRequest")
public class PhotoGetReq {
    @ApiModelProperty(name = "날짜", example = "8/3/2022 16:30:00")
    String date;
    @ApiModelProperty(name = "닉네임", example = "myNickname")
    String nickname;
}
