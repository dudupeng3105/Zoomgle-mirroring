package com.ssafy.api.controller;

import com.ssafy.api.request.CreateRoomPostReq;
import com.ssafy.api.response.RoomInfoListRes;
import com.ssafy.api.service.InvitationService;
import com.ssafy.api.service.RoomService;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.myObject.RoomInfo;
import com.ssafy.db.entity.*;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Api(value = "게임 방 API", tags = {"Room"})
@RestController
@RequestMapping ("/rooms")
@CrossOrigin // api 요청 모두 허용
public class RoomController {

    @Autowired // 의존성 주입
    UserService userService;

    @Autowired // 의존성 주입
    RoomService roomService;

    @Autowired // 의존성 주입
    InvitationService invitationService;

    // 게임방 생성
    @PostMapping
    @ApiOperation(value = "게임방 생성", notes = "[user, date, max]로 게임방을 생성한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public void createRoom(
            @ApiIgnore Authentication authentication,
            @RequestBody @ApiParam(value = "방 생성 정보", required = true) CreateRoomPostReq createRoomPostReq) {

        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String user = userDetails.getUser().getNickname();

        roomService.createRoom(user, createRoomPostReq.getDate(), createRoomPostReq.getMaxCapacity());



//        if(playerList.size() == 0){
//            return ResponseEntity.status(401).body(PlayerListRes.of(401, "예정된 게임이 없습니다.", playerList));
//        }
//
//        return ResponseEntity.status(200).body(PlayerListRes.of(200, "게임이 " + playerList.size() + "개 있습니다.", playerList));

    }

    // 내 게임 조회
    @GetMapping("/list")
    @ApiOperation(value = "게임방 목록 확인", notes = "내 게임 리스트를 확인 할 수 있다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<RoomInfoListRes> getRoomList(@ApiIgnore Authentication authentication) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String user = userDetails.getUser().getNickname();

        List<RoomInfo> roomInfoList = new ArrayList<>();

        // 내 게임 리스트 확인 -> roomCode 가지고 와서
        List<Player> playerList = roomService.getAllPlayer(user);

        for ( Player player : playerList ) {
            // roomCode로 room 정보 가지고 오기
            Optional<Room> room = roomService.getRoomByRoomCode(player.getRoomCode());

            // roomCode로 playerList에서 같은 게임하는 user 가져와서 list로 담기
            List<Player> roomPlayerList = roomService.getPlayerByRoomCode(player.getRoomCode());

            RoomInfo insert = new RoomInfo();
            insert.setRoomCode(room.get().getRoomSeq());
            insert.setHost(room.get().getHost());
            insert.setMaxCapacity(room.get().getMaxCapacity());
            insert.setCnt(room.get().getCnt());
            insert.setPlayerList(roomPlayerList);

            String[] str = room.get().getDate().split(" ");
            String[] dateInfo = str[0].split("/");
            String[] timeInfo = str[1].split(":");

            insert.setMonth(Integer.parseInt( dateInfo[0] ));
            insert.setDay(Integer.parseInt( dateInfo[1] ));
            insert.setYear(Integer.parseInt( dateInfo[2] ));

            insert.setHour(Integer.parseInt( timeInfo[0] ));
            insert.setMinute(Integer.parseInt( timeInfo[1] ));
            insert.setSecond(Integer.parseInt( timeInfo[2] ));

            roomInfoList.add(insert);
        }

        if(roomInfoList.size() == 0){
            return ResponseEntity.status(401).body(RoomInfoListRes.of(401, "예정된 게임이 없습니다.", roomInfoList));
        }

        return ResponseEntity.status(200).body(RoomInfoListRes.of(200, "게임이 " + roomInfoList.size() + "개 있습니다.", roomInfoList));
    }

    // 게임방 삭제
    @DeleteMapping("{roomCode}")
    @ApiOperation(value = "게임방 삭제", notes = "해당 roomCode 게임방을 삭제한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "삭제 성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "토큰 없음"),
            @ApiResponse(code = 404, message = "게임방 없음"),
            @ApiResponse(code = 405, message = "삭제 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> deleteRoom(@PathVariable("roomCode") long roomCode, @ApiIgnore Authentication authentication) {

        // host가 맞는지 체크
        /// 토큰의 nickName
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String user = userDetails.getUser().getNickname();

        /// roomCode로 host 정보를 가지고 온다.
        Optional<Room> deleteRoom;
        try{
            deleteRoom = roomService.getRoomByRoomCode(roomCode);
        }catch (Exception e) {
            return new ResponseEntity<>(roomCode + "의 게임방 정보가 없습니다", HttpStatus.valueOf(404));
        }

        String roomHost = deleteRoom.get().getHost();

        /// host 체크
        if (user.equals(roomHost)) {

            // 해당 roomCode의 room, invitation, player 삭제
            roomService.deleteRoom(roomCode);
            invitationService.deleteInvitation(roomCode);
            invitationService.deletePlayer(roomCode);

        }
        // roomCode로 room 조회
        if (roomService.getRoomByRoomCode(roomCode).equals(Optional.empty())) {
            return new ResponseEntity<>(roomCode + "의 게임방이 삭제되었습니다.", HttpStatus.valueOf(200));
        }
        return new ResponseEntity<>(roomCode + "의 게임방 삭제 도중 문제가 발생하였습니다.", HttpStatus.valueOf(405));
    }
}
