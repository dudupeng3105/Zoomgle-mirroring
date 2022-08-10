package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.common.myObject.InvitationInfo;
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
public class InvitationInfoListRes extends BaseResponseBody {
	@ApiModelProperty(name="Invitation")
	List<InvitationInfo> invitationInfoList;

	public static InvitationInfoListRes of(Integer statusCode, String message, List<InvitationInfo> invitationInfoList)  {
		InvitationInfoListRes res = new InvitationInfoListRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		res.setInvitationInfoList(invitationInfoList);

		return res;
	}
}
