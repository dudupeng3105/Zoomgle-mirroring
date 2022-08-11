package com.ssafy.api.service;

import com.ssafy.db.entity.Invitation;

import java.util.List;

/**
 *	게임 초대 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface InvitationService {
	// 게임 초대장 만들기
	boolean createInvitationPostReq(long roomCode, String sender, String receiver);

	// user의 모든 초대
	List<Invitation> getAllInvite(String user);

	// 초대 승낙
	void joinPlayer(String user, long roomCode, long invitationSeq);

	// 초대 거절
	boolean deleteInvitation(long roomCode);

	boolean deleteInvitationByRoomCode(long roomCode);

	boolean deletePlayer(long roomCode);
}
