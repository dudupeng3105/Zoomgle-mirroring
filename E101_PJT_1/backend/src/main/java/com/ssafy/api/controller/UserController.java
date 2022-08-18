package com.ssafy.api.controller;

import com.ssafy.api.response.UserGameInfoRes;
import com.ssafy.common.cumtomObject.UserGameInfo;
import org.hibernate.PropertyValueException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.db.entity.User;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import springfox.documentation.annotations.ApiIgnore;

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "유저 API", tags = {"User"})
@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {
	
	@Autowired
	UserService userService;

	@ExceptionHandler(PropertyValueException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	public String handle404(PropertyValueException ex) {
		return "잘못된 body 입니다";
	}

	
	@PostMapping
	@ApiOperation(value = "회원 가입", notes = "<strong>아이디와 패스워드</strong>를 통해 회원가입 한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 400, message = "잘못된 요청"),
		@ApiResponse(code = 404, message = "바디 정보 오류"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<?> register(
			@RequestBody @ApiParam(value="회원가입 정보", required = true) UserRegisterPostReq registerInfo) {
		String userId = registerInfo.getUserId();
		String nickname = registerInfo.getNickname();
		if (userService.checkIdDuplicated(userId) && userService.checkNicknameDuplicated(nickname)) {
			User user = userService.createUser(registerInfo);
			return new ResponseEntity<>(userId + "의 회원가입이 완료되었습니다", HttpStatus.valueOf(200));
		}
		return new ResponseEntity<>("잘못된 요청입니다", HttpStatus.valueOf(400));
	}
	
	@GetMapping("my-info")
	@ApiOperation(value = "회원 본인 정보 조회", notes = "로그인한 회원 본인의 정보를 응답한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 400, message = "사용자 없음"),
		@ApiResponse(code = 401, message = "인증 실패"),
		@ApiResponse(code = 403, message = "토큰 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<?> getUserInfo(@ApiIgnore Authentication authentication) {

		if (authentication == null) {
			return new ResponseEntity<>("토큰이 없습니다", HttpStatus.valueOf(403));
		}
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String userId = userDetails.getUsername();
		User user = userService.getUserByUserId(userId);
		if (user != null) {
			return new ResponseEntity<User>(user, HttpStatus.valueOf(200));
		}
		return new ResponseEntity<>("잘못된 요청입니다", HttpStatus.valueOf(400));
	}

	@PutMapping(value="my-info")
	@ApiOperation(value = "회원 본인 정보 수정", notes = "로그인한 회원 본인의 정보를 수정한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 400, message = "잘못된 요청"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 403, message = "토큰 없음"),
			@ApiResponse(code = 404, message = "바디 정보 오류"),
			@ApiResponse(code = 405, message = "무결성 오류"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<?> updateUserInfo(@ApiIgnore Authentication authentication,
												  @RequestBody @ApiParam(value="회원가입 정보", required = true) UserRegisterPostReq updateInfo) {

		if (authentication == null) {
			return new ResponseEntity<>("토큰이 없습니다", HttpStatus.valueOf(403));
		}
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String userId = userDetails.getUsername();
		if (userId.equals(updateInfo.getUserId())) {
			User user = userService.updateUserInfo(userId, updateInfo);
			if (user == null)
				return new ResponseEntity<>("무결성 오류입니다", HttpStatus.valueOf(405));
			return new ResponseEntity<>(user, HttpStatus.valueOf(200));
		}
		return new ResponseEntity<>("잘못된 요청입니다", HttpStatus.valueOf(400));
	}

	@DeleteMapping(value="my-info")
	@ApiOperation(value = "회원 탈퇴", notes = "로그인한 회원 본인의 탈퇴를 처리한다")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 403, message = "토큰 없음"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<?> deleteUser(@ApiIgnore Authentication authentication) {
		if (authentication == null) {
			return new ResponseEntity<>("토큰이 없습니다", HttpStatus.valueOf(403));
		}
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String userId = userDetails.getUsername();
		User user = userService.getUserByUserId(userId);
		if (user == null) {
			return new ResponseEntity<>(userId + "의 회원 정보가 없습니다", HttpStatus.valueOf(404));
		}
		userService.deleteUser(user);
		return new ResponseEntity<>(userId + "의 회원 정보가 삭제되었습니다", HttpStatus.valueOf(200));
	}

	@GetMapping("check-id/{userId}")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	@ApiOperation(value = "아이디 중복 체크", notes = "중복이면 false, 유효하면 true")
	public ResponseEntity<Boolean> checkId(@PathVariable("userId") String userId) {
		return new ResponseEntity<Boolean>(userService.checkIdDuplicated(userId), HttpStatus.OK);
	}

	@GetMapping("check-nickname/{nickname}")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	@ApiOperation(value = "닉네임 중복 체크", notes = "중복이면 false, 유효하면 true")
	public ResponseEntity<Boolean> checkNickname(@PathVariable("nickname") String nickname) {
		return new ResponseEntity<Boolean>(userService.checkNicknameDuplicated(nickname), HttpStatus.OK);
	}

	@GetMapping("/user-game-info")
	@ApiResponses({
			@ApiResponse(code = 200, message = "게임 정보 불러오기 성공"),
			@ApiResponse(code = 401, message = "토큰 없음"),
			@ApiResponse(code = 403, message = "회원 정보 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<UserGameInfoRes> getUserGameInfo(@ApiIgnore Authentication authentication){
		// 토큰 정보 확인
		if (authentication == null) {
			return ResponseEntity.status(401).body(UserGameInfoRes.of(401, "토큰 정보가 없습니다.", null));
		}

		// 회원 정보 없음
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		User user = userService.getUserByUserId(userDetails.getUsername());
		if (user == null) {
			return ResponseEntity.status(403).body(UserGameInfoRes.of(403, "회원 정보가 없습니다.", null));
		}
		
		// 게임 정보 저장
		UserGameInfo userGameInfo = userService.getUserGameInfo(user.getNickname());
		return ResponseEntity.status(200).body(UserGameInfoRes.of(200, user.getNickname() + "님의 게임 정보를 불러왔습니다.", userGameInfo));
	}
}
