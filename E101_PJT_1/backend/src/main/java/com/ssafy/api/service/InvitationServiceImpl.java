package com.ssafy.api.service;

import com.ssafy.db.entity.Invitation;
import com.ssafy.db.entity.Player;
import com.ssafy.db.entity.Room;
import com.ssafy.db.repository.InvitationRepository;
import com.ssafy.db.repository.PlayerRepository;
import com.ssafy.db.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service("invitationService")
public class InvitationServiceImpl implements InvitationService {

    @Autowired
    RoomRepository roomRepository;
    
    @Autowired
    InvitationRepository invitationRepository;

    @Autowired
    PlayerRepository playerRepository;
    
    @Override
    /**
     * 게임 초대장을 생성하는 메서드
     */
    public void createInvitationPostReq(long roomCode, String sender, String receiver) {

        Invitation invitation = new Invitation();
        invitation.setRoomCode(roomCode);
        invitation.setSender(sender);
        invitation.setReceiver(receiver);

        invitationRepository.save(invitation);
    }

    /**
     * user의 모든 초대장을 확인하는 메서드
     */
    @Override
    public List<Invitation> getAllInvite(String user) {
        return invitationRepository.findAllByReceiver(user);
    }

    /**
     * 초대 승낙시 Player에 추가
     */
    @Override
    public void joinPlayer(String user, long roomCode, long invitationSeq) {
        Player player = new Player();

        player.setRoomCode(roomCode);
        player.setUser(user);

        playerRepository.save(player);

        // 게임방 cnt++
        Optional<Room> updatedRoom = roomRepository.findByRoomSeq(roomCode);
        if ( updatedRoom.isPresent() ) {
            updatedRoom.get().setCnt(updatedRoom.get().getCnt() + 1);
        }
        roomRepository.save(updatedRoom.get());
    }

    @Override
    public void deleteInvitation(long invitationSeq) {
        invitationRepository.deleteById(invitationSeq);
    }

}
