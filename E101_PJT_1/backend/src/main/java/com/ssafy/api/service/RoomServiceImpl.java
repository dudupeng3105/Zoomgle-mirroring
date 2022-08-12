package com.ssafy.api.service;

import com.ssafy.common.myObject.PhotoInfo;
import com.ssafy.common.myObject.RoomInfoAndPhoto;
import com.ssafy.common.myObject.RoomInfoInterface;
import com.ssafy.db.entity.Player;
import com.ssafy.db.entity.Room;
import com.ssafy.db.repository.PhotoRepository;
import com.ssafy.db.repository.PlayerRepository;
import com.ssafy.db.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service("roomService")
public class RoomServiceImpl implements RoomService{

    @Autowired
    RoomRepository roomRepository;

    @Autowired
    PlayerRepository playerRepository;

    @Autowired
    PhotoRepository photoRepository;
    
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

    // 게임방 업데이트
    @Override
    public boolean updateRoom(long roomCode, String mvp) {
        try {
            Optional <Room> updatedRoom = roomRepository.findByRoomSeq(roomCode);

            updatedRoom.get().setMvp(mvp);

            roomRepository.save(updatedRoom.get());
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
    public boolean deleteRoom(long roomCode) {
        try {
            roomRepository.deleteById(roomCode);

            return true;
        }catch (Exception e) {
            return false;
        }
    }

    /**
     * 닉네임과 날짜로 게임방 정보와 사진url 받아오기
     */
    @Override
    public List<RoomInfoAndPhoto> getRoomInfoAndPhotoByNicknameAndDate(String nickname, String date) {

        List<RoomInfoAndPhoto> roomInfoAndPhotoList = new ArrayList<>();

        // 닉네임, 날짜로 게임방정보 리스트 받아오기
        List<RoomInfoInterface> list = roomRepository.getRoomInfoByNicknameAndDate(nickname, date);

        // 게임 방 정보 리스트를 받아서 각 게임방의 사진리스트를 찾아서 같이 하나의 객체에 저장하고 리스트에 add
        for(RoomInfoInterface inter : list){
            long roomSeq = inter.getRoom_Seq();
            List<PhotoInfo> photoInfoList = photoRepository.getAllPhotoByRoomSeq(roomSeq);
            List<Player> players = playerRepository.findAllByRoomCode(roomSeq);

            RoomInfoAndPhoto roomInfoAndPhoto = new RoomInfoAndPhoto(inter, photoInfoList, players);
            roomInfoAndPhotoList.add(roomInfoAndPhoto);
        }

        return roomInfoAndPhotoList;
    }
}
