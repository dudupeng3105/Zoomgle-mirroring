package com.ssafy.common.myObject;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserGameInfo {
    // user -> 이메일, 닉네임, 가입 일
    String nickname;
    String email;
    LocalDateTime reg_dtm;

    // player -> 플레이한 횟수, 앞으로 예정된 게임 수
    int pastGameCount;
    int futureGameCount;

    // room -> mvp횟수
    int mvpCount;

    // friend -> 친구 수
    int friendCount;
}
