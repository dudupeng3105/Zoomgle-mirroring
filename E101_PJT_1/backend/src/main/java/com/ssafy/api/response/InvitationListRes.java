package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Invitation;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * 게임 초대장 조회 API ([GET] /api/invitations/List) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("InvitationListRes")
public class InvitationListRes extends BaseResponseBody {
	@ApiModelProperty(name="Invitation")
	List<Invitation> invitationList;
	
	public static InvitationListRes of(Integer statusCode, String message, List<Invitation> invitationList)  {
		InvitationListRes res = new InvitationListRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		res.setInvitationList(invitationList);

		return res;
	}
}
