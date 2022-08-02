package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 게임 초대장 관리 API ([POST] /invitations) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("CreateInvitationPostReq")
public class UpdateInvitationPostReq {

	@ApiModelProperty(name="초대 코드")
	long invitationSeq;

	@ApiModelProperty(name="게임방 코드")
	long roomCode;

	@ApiModelProperty(name = "승낙 여부", example = "true/false")
	boolean join;
}
