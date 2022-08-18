package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.common.cumtomObject.FriendInfoInterface;
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
	// 이름 프로필이미지 닉네임
	List<FriendInfoInterface> friendList;
	
	public static FriendRes of(Integer statusCode, String message, List<FriendInfoInterface> friendList)  {
		FriendRes res = new FriendRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		res.setFriendList(friendList);
		return res;
	}

}
