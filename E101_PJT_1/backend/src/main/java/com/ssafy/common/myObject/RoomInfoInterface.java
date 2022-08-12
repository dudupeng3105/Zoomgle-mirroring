package com.ssafy.common.myObject;

/**
 * 게임 방 정보를 저장하는 객체 정의
 */
public interface RoomInfoInterface {
    long getRoom_Seq();

    String getDate();

    String getHost();

    int getMax_Capacity();

    String getMvp();
}
