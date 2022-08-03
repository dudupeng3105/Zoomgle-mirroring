package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Player;
import com.ssafy.db.entity.Room;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * 게임방 목록 조회 API ([GET] /api/rooms/list) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("PlayerListRes")
public class PlayerListRes extends BaseResponseBody {
	@ApiModelProperty(name="player")
	List<Player> playerList;
	
	public static PlayerListRes of(Integer statusCode, String message, List<Player> playerList)  {
		PlayerListRes res = new PlayerListRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		res.setPlayerList(playerList);

		return res;
	}
}
