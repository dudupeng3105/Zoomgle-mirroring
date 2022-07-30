package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Friend;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * 친구 리스트 조회 API ([GET] /api/friends/{userId}) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("FriendResponse")
public class FriendRes extends BaseResponseBody {
	@ApiModelProperty(name="User ID")
	List<Friend> friendList;
	
	public static FriendRes of(Integer statusCode, String message, List<Friend> list)  {
		FriendRes res = new FriendRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		res.setFriendList(list);
		return res;
	}
}
