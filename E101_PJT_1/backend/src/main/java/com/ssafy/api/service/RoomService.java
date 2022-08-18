package com.ssafy.api.service;

import com.ssafy.common.cumtomObject.RoomInfoAndPhoto;
import com.ssafy.db.entity.Player;
import com.ssafy.db.entity.Room;

import java.util.List;
import java.util.Optional;

/**
 *	게임 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface RoomService {
	boolean createRoom(String host, String date, int maxCapacity);

	boolean updateRoom(long roomCode, String mvp);

	Optional<Room> getRoomByRoomCode(long roomCode);

	List<Player> getPlayerByRoomCode(long roomCode);

	Optional<Room> getRoomByRoomCodeAndMvpNull(long roomCode);

	Optional<Room> getRoomByRoomCodeAndMvpNotNull(long roomCode);

	// user의 게임 리스트
	List<Player> getAllPlayer(String user);

	boolean deleteRoom(long roomCode);

	List<RoomInfoAndPhoto> getRoomInfoAndPhotoByNicknameAndDate(String nickname, String date);
}

