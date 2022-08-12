package com.ssafy.api.controller;

import com.ssafy.api.request.FriendPostReq;
import com.ssafy.api.response.FriendPostRes;
import com.ssafy.api.response.FriendRes;
import com.ssafy.api.service.FriendService;
import com.ssafy.api.service.UserService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.common.myObject.FriendInfoInterface;
import com.ssafy.db.entity.User;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 친구 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "친구 API", tags = {"Friend."})
@RestController
@RequestMapping("/friends")
@CrossOrigin
public class FriendController {
    @Autowired
    UserService userService;

    @Autowired
    FriendService friendService;

    @GetMapping("/{userId}")
    @ApiOperation(value = "친구 리스트 확인", notes = "내 친구리스트를 확인 할 수 있다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = FriendRes.class),
            @ApiResponse(code = 401, message = "친구 리스트 없음", response = BaseResponseBody.class),
            @ApiResponse(code = 404, message = "사용자 없음", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<FriendRes> friendList(@PathVariable String userId) {

        // 유저 아이디를 받아서 유저 닉네임을 얻고 닉네임을 통해서 친구 리스트를 받아온다.
        User my = userService.getUserByUserId(userId);
        List<FriendInfoInterface> friendList = friendService.getAllFriendInfo(my.getNickname());

        if (friendList.size() == 0) {
            return ResponseEntity.status(401).body(FriendRes.of(401, "친구가 없습니다.", friendList));
        }

        return ResponseEntity.status(200).body(FriendRes.of(200, "친구가 " + friendList.size() + "명 있습니다.", friendList));

    }

    @PostMapping()
    @ApiOperation(value = "친구 추가", notes = "닉네임을 통해서 친구를 팔로우 할 수 있다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = FriendPostRes.class),
            @ApiResponse(code = 401, message = "유저 없음", response = BaseResponseBody.class),
            @ApiResponse(code = 402, message = "이미 친구 관계", response = BaseResponseBody.class),
            @ApiResponse(code = 404, message = "사용자 없음", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<FriendPostRes> addFriend(@RequestBody @ApiParam(value = "친구 추가 정보", required = true) FriendPostReq friendInfo) {
        String myNickname = friendInfo.getMyNickname();
        String friendNickname = friendInfo.getFriendNickname();

        try { // 찾는 친구가 없다면
            User friend = userService.getUserByNickname(friendNickname);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(FriendPostRes.of(401, "찾는 친구가 없습니다."));
        }

        // 친구 추가
        if (!friendService.alreadyFriend(myNickname, friendNickname)) {
            friendService.createFriend(myNickname, friendNickname);
            return ResponseEntity.status(200).body(FriendPostRes.of(200, friendNickname + "를 팔로워했습니다."));
        } else { // 이미 있으면 안됨
            return ResponseEntity.status(402).body(FriendPostRes.of(402, "이미 친구 관계입니다."));
        }

    }

    @DeleteMapping("")
    @ApiOperation(value = "친구 추가", notes = "닉네임을 통해서 친구를 삭제 할 수 있다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "친구 삭제 성공", response = FriendPostRes.class),
            @ApiResponse(code = 401, message = "친구 삭제 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<FriendPostRes> deleteFriend(@RequestBody @ApiParam(value = "친구 삭제 정보") FriendPostReq friendPostReq) {
        String myNickname = friendPostReq.getMyNickname();
        String friendNickname = friendPostReq.getFriendNickname();

        if (friendService.deleteFriend(myNickname, friendNickname)) {
            return ResponseEntity.status(200).body(FriendPostRes.of(200, "친구 삭제 성공!"));
        } else {
            return ResponseEntity.status(401).body(FriendPostRes.of(401, "친구 삭제 실패"));
        }
    }
}
