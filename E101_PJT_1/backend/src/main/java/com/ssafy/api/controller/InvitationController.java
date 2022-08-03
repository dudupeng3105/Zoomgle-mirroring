package com.ssafy.api.controller;

import com.ssafy.api.request.CreateInvitationPostReq;
import com.ssafy.api.request.UpdateInvitationPostReq;
import com.ssafy.api.response.InvitationListRes;
import com.ssafy.api.service.InvitationService;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.db.entity.Invitation;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@Api(value = "게임초대 API", tags = {"Invitations"})
@RestController
@RequestMapping("/invitations")
@CrossOrigin // api 요청 모두 허용
public class InvitationController {

    @Autowired // 의존성 주입
    UserService userService;

    @Autowired // 의존성 주입
    InvitationService invatationService;

    // 게임 초대하기
    @PostMapping
    @ApiOperation(value = "게임 초대하기", notes = "[gameSeq, sender, receiver]로 게임에 초대장을 보낸다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public void inviteMessage(@ApiIgnore Authentication authentication, @RequestBody @ApiParam(value = "게임 초대", required = true) CreateInvitationPostReq createInvitationPostReq) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();

        long roomCode = createInvitationPostReq.getRoomCode();
        String sender = userDetails.getUser().getUserId();
        String receiver = createInvitationPostReq.getReceiver();

        invatationService.createInvitationPostReq(roomCode, sender, receiver);
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
    public ResponseEntity<InvitationListRes> getInvitationList(@ApiIgnore Authentication authentication) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String user = userDetails.getUser().getUserId();
        System.out.println(user);

        List<Invitation> invitationList = invatationService.getAllInvite(user);

        if(invitationList.size() == 0){
            return ResponseEntity.status(401).body(InvitationListRes.of(401, "초대장이 없습니다.", invitationList));
        }

        return ResponseEntity.status(200).body(InvitationListRes.of(200, "초대장이 " + invitationList.size() + "장 있습니다.", invitationList));

    }

    // 초대장 관리(승낙/거절)
    @PostMapping("/manager")
    public void InvitationManager(@ApiIgnore Authentication authentication, @RequestBody @ApiParam(value = "초대장 관리", required = true) UpdateInvitationPostReq updateInvitationPostReq) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String user = userDetails.getUser().getUserId();

        long roomCode = updateInvitationPostReq.getRoomCode();
        long invitationSeq = updateInvitationPostReq.getInvitationSeq();

        boolean join = updateInvitationPostReq.isJoin();

        if (join == true) {
            // player에 넣기
            invatationService.joinPlayer(user, roomCode, invitationSeq);
        }

        // 디비 드랍
        invatationService.deleteInvitation(invitationSeq);

    }
}

