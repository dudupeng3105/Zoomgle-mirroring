package com.ssafy.api.service;

import com.ssafy.db.entity.Player;
import com.ssafy.db.entity.Room;
import com.ssafy.db.repository.PlayerRepository;
import com.ssafy.db.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service("roomService")
public class RoomServiceImpl implements RoomService{

    @Autowired
    RoomRepository roomRepository;

    @Autowired
    PlayerRepository playerRepository;
    
    @Override
    /**
     * 게임방을 생성하는 메서드
     */
    public boolean createRoom(String host, String date, int maxCapacity) {
        try {
            Room room = new Room();
            room.setHost(host);
            room.setDate(date);
            room.setMaxCapacity(maxCapacity);
            room.setCnt(1);

            long roomCode = roomRepository.save(room).getRoomSeq();

            // 방장은 자동으로 게임 초대

            Player player = new Player();

            player.setRoomCode(roomCode);
            player.setUser(host);

            playerRepository.save(player);

            return true;
        } catch (Exception e) {
            return false;
        }
    }



    @Override
    public Optional<Room> getRoomByRoomCode(long roomCode) {
        return roomRepository.findByRoomSeq(roomCode);
    }

    @Override
    public List<Player> getPlayerByRoomCode(long roomCode) {
        return playerRepository.findAllByRoomCode(roomCode);
    }

    @Override
    public Optional<Room> getRoomByRoomCodeAndMvpNull(long roomCode) {
        return roomRepository.findByRoomSeqAndMvpNull(roomCode);
    }

    @Override
    public Optional<Room> getRoomByRoomCodeAndMvpNotNull(long roomCode) {
        return roomRepository.findByRoomSeqAndMvpNotNull(roomCode);
    }

    /**
     * user의 모든 게임방 리스트를 확인하는 메서드
     */
    @Override
    public List<Player> getAllPlayer(String user) {
        return playerRepository.findAllByUser(user);
    }

    @Override
    public void deleteRoom(long roomCode) {
        roomRepository.deleteById(roomCode);
    }
}
