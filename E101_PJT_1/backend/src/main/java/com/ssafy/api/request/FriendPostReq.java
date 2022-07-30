package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 친구 추가 API ([POST] /api/friends) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("FriendPostRequest")
public class FriendPostReq {
	@ApiModelProperty(name="내 id", example="MyId")
	String myId;
	@ApiModelProperty(name="친구 id", example="FriendId")
	String friendId;
}
