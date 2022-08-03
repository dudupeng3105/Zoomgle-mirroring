package com.ssafy.api.service;

import com.ssafy.db.entity.Player;
import com.ssafy.db.entity.Room;

import java.util.List;

/**
 *	게임 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface RoomService {
	void createRoom(String host, String date, int maxCapacity);

	// user의 게임 리스트
	List<Player> getAllPlayer(String user);
}

