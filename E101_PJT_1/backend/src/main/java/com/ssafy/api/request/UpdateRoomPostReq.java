package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 게임방 업데이트 관리 API ([POST] /rooms/done) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("UpdateRoomPostReq")
public class UpdateRoomPostReq {
	@ApiModelProperty(name="게임방 코드")
	long roomCode;

	@ApiModelProperty(name = "MVP", example = "MVP 닉네임")
	String mvp;
}
