package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.common.cumtomObject.RoomInfo;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * 게임방 정보 조회 API ([GET] /api/rooms/list) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("RoomInfoListRes")
public class RoomInfoListRes extends BaseResponseBody {
	@ApiModelProperty(name="player")
	List<RoomInfo> roomInfoList;

	public static RoomInfoListRes of(Integer statusCode, String message, List<RoomInfo> roomInfoList)  {
		RoomInfoListRes res = new RoomInfoListRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		res.setRoomInfoList(roomInfoList);

		return res;
	}
}
