package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 친구추가 API ([POST] /api/friends) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("FriendPostResponse")
public class FriendPostRes extends BaseResponseBody{

	public static FriendPostRes of(Integer statusCode, String message) {
		FriendPostRes res = new FriendPostRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		return res;
	}
}
