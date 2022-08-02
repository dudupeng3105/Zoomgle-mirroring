package com.ssafy.api.service;

import com.ssafy.db.entity.Player;
import com.ssafy.db.entity.Room;
import com.ssafy.db.repository.InvitationRepository;
import com.ssafy.db.repository.PlayerRepository;
import com.ssafy.db.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("roomService")
public class RoomServiceImpl implements RoomService{

    @Autowired
    RoomRepository roomRepository;
    
    @Autowired
    InvitationRepository invitationRepository;

    @Autowired
    PlayerRepository playerRepository;
    
    @Override
    /**
     * 게임방을 생성하는 메서드
     */
    public void createRoom(String host, String date, int max) {
        Room room = new Room();
        room.setHost(host);
        room.setDate(date);
        room.setMax(max);
        room.setCnt(1);

        roomRepository.save(room);

        // 방장은 자동으로 게임 초대
        Player player = new Player();

        player.setRoomCode( roomRepository.findByHostAndDate(host, date).getRoomSeq());
        player.setUser(host);

        playerRepository.save(player);
    }
}
