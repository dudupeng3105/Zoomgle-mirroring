package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 게임 생성 API ([POST] /rooms) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("CreateRoomPostReq")
public class CreateRoomPostReq {

	@ApiModelProperty(name = "게임 날짜", example = "2022-01-01 09:00:00")
	String date;

	@ApiModelProperty(name = "최대 인원 수", example = "6")
	int maxCapacity;
}
