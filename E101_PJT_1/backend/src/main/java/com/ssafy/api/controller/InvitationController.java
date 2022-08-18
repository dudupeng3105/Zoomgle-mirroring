package com.ssafy.api.controller;

import com.ssafy.api.request.CreateInvitationPostReq;
import com.ssafy.api.request.UpdateInvitationPostReq;
import com.ssafy.api.response.InvitationInfoListRes;
import com.ssafy.api.service.InvitationService;
import com.ssafy.api.service.RoomService;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.cumtomObject.InvitationInfo;
import com.ssafy.db.entity.Invitation;
import com.ssafy.db.entity.Room;
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

@Api(value = "게임초대 API", tags = {"Invitations"})
@RestController
@RequestMapping("/invitations")
@CrossOrigin // api 요청 모두 허용
public class InvitationController {

    @Autowired // 의존성 주입
    UserService userService;

    @Autowired // 의존성 주입
    InvitationService invatationService;

    @Autowired // 의존성 주입
    RoomService roomService;

    // 게임 초대하기
    @PostMapping
    @ApiOperation(value = "게임 초대하기", notes = "[gameSeq, sender, receiver]로 게임에 초대장을 보낸다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> inviteMessage(@ApiIgnore Authentication authentication, @RequestBody @ApiParam(value = "게임 초대", required = true) CreateInvitationPostReq createInvitationPostReq) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();

        long roomCode = createInvitationPostReq.getRoomCode();
        String sender = userDetails.getUser().getNickname();
        String receiver = createInvitationPostReq.getReceiver();

        if ( invatationService.createInvitationPostReq(roomCode, sender, receiver) ) {
            return new ResponseEntity<>("게임 초대에 성공하였습니다.", HttpStatus.valueOf(200));
        }
        return new ResponseEntity<>("게임 초대에 실패하였습니다.", HttpStatus.valueOf(401));
    }

    // 초대장 목록 조회
    @GetMapping("/list")
    @ApiOperation(value = "게임 초대장 목록", notes = "게임 초대장 목록을 가져온다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<InvitationInfoListRes> getInvitationList(@ApiIgnore Authentication authentication) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String user = userDetails.getUser().getNickname();

        // 초대장 정보 리스트
        List<InvitationInfo> invitationInfoList = new ArrayList<>();

        List<Invitation> invitationList = invatationService.getAllInvite(user);
        for ( Invitation invitation : invitationList ) {
            InvitationInfo insert = new InvitationInfo();
            insert.setInvitationSeq(invitation.getInvitationSeq());
            insert.setRoomCode(invitation.getRoomCode());
            insert.setSender(invitation.getSender());
            insert.setReceiver(invitation.getReceiver());

            // 시간 정보 추가
            Optional<Room> room = roomService.getRoomByRoomCode(invitation.getRoomCode());

            String[] str = room.get().getDate().split(" ");
            String[] dateInfo = str[0].split("/");
            String[] timeInfo = str[1].split(":");

            insert.setMonth(Integer.parseInt( dateInfo[0] ));
            insert.setDay(Integer.parseInt( dateInfo[1] ));
            insert.setYear(Integer.parseInt( dateInfo[2] ));

            insert.setHour(Integer.parseInt( timeInfo[0] ));
            insert.setMinute(Integer.parseInt( timeInfo[1] ));
            insert.setSecond(Integer.parseInt( timeInfo[2] ));

            invitationInfoList.add(insert);
        }

        if(invitationList.size() == 0){
            return ResponseEntity.status(201).body(InvitationInfoListRes.of(201, "초대장이 없습니다.", invitationInfoList));
        }

        return ResponseEntity.status(200).body(InvitationInfoListRes.of(200, "초대장이 " + invitationInfoList.size() + "장 있습니다.", invitationInfoList));

    }

    // 초대장 관리(승낙/거절)
    @PostMapping("/manager")
    @ApiOperation(value = "초대장 관리", notes = "초대장 승낙/거절")
    @ApiResponses({
            @ApiResponse(code = 200, message = "게임 참가"),
            @ApiResponse(code = 401, message = "게임 초대 거절"),
            @ApiResponse(code = 402, message = "정원 초과"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> InvitationManager(@ApiIgnore Authentication authentication, @RequestBody @ApiParam(value = "초대장 관리", required = true) UpdateInvitationPostReq updateInvitationPostReq) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String user = userDetails.getUser().getNickname();

        long roomCode = updateInvitationPostReq.getRoomCode();
        long invitationSeq = updateInvitationPostReq.getInvitationSeq();

        boolean join = updateInvitationPostReq.isJoin();

        int curCnt = roomService.getRoomByRoomCode(roomCode).get().getCnt();
        int curMaxCapacity = roomService.getRoomByRoomCode(roomCode).get().getMaxCapacity();

        // cnt >= maxCapacity면 디비드랍, 리턴
        if (curCnt >= curMaxCapacity) {
            // 디비 드랍
            invatationService.deleteInvitation(invitationSeq);

            return new ResponseEntity<>("정원 초과입니다.", HttpStatus.valueOf(402));
        } else if (join == true) {
            // player에 넣고 db 드랍
            invatationService.joinPlayer(user, roomCode, invitationSeq);
            invatationService.deleteInvitation(invitationSeq);

            return new ResponseEntity<>(user + "님의 초대를 수락하셨습니다.", HttpStatus.valueOf(200));
        }

        // 초대 거절디비 드랍
//        invatationService.deleteInvitation(roomCode);
        invatationService.deleteInvitation(invitationSeq);
        return new ResponseEntity<>(user + "님의 초대를 거절하였습니다.", HttpStatus.valueOf(401));
    }
}

