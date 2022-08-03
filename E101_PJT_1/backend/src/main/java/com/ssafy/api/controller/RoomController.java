package com.ssafy.api.controller;

import com.ssafy.api.request.CreateRoomPostReq;
import com.ssafy.api.response.PlayerListRes;
import com.ssafy.api.service.RoomService;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.db.entity.*;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

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
    public ResponseEntity<PlayerListRes> getRoomList(@ApiIgnore Authentication authentication) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String user = userDetails.getUser().getUserId();
        System.out.println(user);

        List<Player> playerList = roomService.getAllPlayer(user);

        if(playerList.size() == 0){
            return ResponseEntity.status(401).body(PlayerListRes.of(401, "예정된 게임이 없습니다.", playerList));
        }

        return ResponseEntity.status(200).body(PlayerListRes.of(200, "게임이 " + playerList.size() + "개 있습니다.", playerList));

    }
}
