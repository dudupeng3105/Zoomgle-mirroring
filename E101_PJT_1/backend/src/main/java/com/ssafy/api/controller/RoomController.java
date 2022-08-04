package com.ssafy.api.controller;

import com.ssafy.api.request.CreateRoomPostReq;
import com.ssafy.api.response.RoomInfoListRes;
import com.ssafy.api.service.RoomService;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.myObject.RoomInfo;
import com.ssafy.db.entity.*;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
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
        String userId = userDetails.getUsername();

        roomService.createRoom(userId, createRoomPostReq.getDate(), createRoomPostReq.getMaxCapacity());



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
        String user = userDetails.getUser().getUserId();

        List<RoomInfo> roomInfoList = new ArrayList<>();

        // 내 게임 리스트 확인 -> roomCode 가지고 와서
        List<Player> playerList = roomService.getAllPlayer(user);
        System.out.println("1>>"+playerList.get(0).getRoomCode());

        for ( Player player : playerList ) {
            System.out.println(player.getRoomCode());
            // roomCode로 room 정보 가지고 오기
            Optional<Room> room = roomService.getRoomByRoomCode(player.getRoomCode());

            System.out.println("2>>"+room.get().getHost());

            // roomCode로 playerList에서 같은 게임하는 user 가져와서 list로 담기
            List<Player> roomPlayerList = roomService.getPlayerByRoomCode(player.getRoomCode());
            System.out.println("3>>"+roomPlayerList.get(0).getUser());

            RoomInfo insert = new RoomInfo();
            insert.setRoomCode(room.get().getRoomSeq());
            insert.setHost(room.get().getHost());
            insert.setDate(room.get().getDate());
            insert.setPlayerList(roomPlayerList);
            roomInfoList.add(insert);
        }

        if(roomInfoList.size() == 0){
            return ResponseEntity.status(401).body(RoomInfoListRes.of(401, "예정된 게임이 없습니다.", roomInfoList));
        }

        return ResponseEntity.status(200).body(RoomInfoListRes.of(200, "게임이 " + roomInfoList.size() + "개 있습니다.", roomInfoList));
    }
}
