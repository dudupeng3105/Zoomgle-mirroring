package com.ssafy.common.myObject;

import com.ssafy.db.entity.Player;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomInfo {
    // 게임방코드, 호스트 정보, 시간 정보, 참여자 리스트
    private long roomCode;
    private String host;
    private int year;
    private int month;
    private int day;
    private int hour;
    private int minute;
    private int second;
    private List<Player> playerList;
}