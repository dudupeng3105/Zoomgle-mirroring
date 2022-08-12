package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * 추억 리스트 API ([POST] /api/photos) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("PhotoListPostRequest")
public class PhotoListPostReq {
    @ApiModelProperty(name = "Room Seq", example = "1")
    List<String> photoUrls;
    @ApiModelProperty(name = "날짜", example = "8/3/2022 16:30:00")
    String roomSeq;
}
