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
    @ApiModelProperty(name = "사진 url 리스트", example = "{" +
            "\"https://bucket-e101-zoomgle.s3.ap-northeast-2.amazonaws.com/temp/1168-2022%EB%85%848%EC%9B%949%EC%9D%BC/1168-155443.jpeg\"," +
            "\"https://bucket-e101-zoomgle.s3.ap-northeast-2.amazonaws.com/temp/1168-2022%EB%85%848%EC%9B%949%EC%9D%BC/1168-155442.jpeg\"," +
            "}")
    List<String> photoUrls;
    @ApiModelProperty(name = "게임 방 번호", example = "1168")
    String roomSeq;
}
