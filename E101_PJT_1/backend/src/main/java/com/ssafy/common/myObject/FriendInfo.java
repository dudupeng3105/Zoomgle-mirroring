package com.ssafy.common.myObject;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class FriendInfo {
    private String userId;
    private String nickname;
    private long profileImgNum;
}
