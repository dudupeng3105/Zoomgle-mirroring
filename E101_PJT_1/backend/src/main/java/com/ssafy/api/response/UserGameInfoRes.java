package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.common.myObject.PhotoInfo;
import com.ssafy.common.myObject.UserGameInfo;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * 유저 게임 통계 조회 API ([GET] /api/users/user-game-info) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("UserGameInfoResponse")
public class UserGameInfoRes extends BaseResponseBody {
    // 이메일, 닉네임, 가입 일, 플레이한 횟수, 앞으로 예정된 게임 수, mvp횟수, 친구 수
    UserGameInfo userGameInfo;

    public static UserGameInfoRes of(Integer statusCode, String message, UserGameInfo userGameInfo) {
        UserGameInfoRes res = new UserGameInfoRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setUserGameInfo(userGameInfo);
        return res;
    }

}
