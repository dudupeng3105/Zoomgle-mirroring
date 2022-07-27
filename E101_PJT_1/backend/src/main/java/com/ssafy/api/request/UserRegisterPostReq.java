package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;

/**
 * 유저 회원가입 API ([POST] /users) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("UserRegisterPostRequest")
public class UserRegisterPostReq {
	@ApiModelProperty(name="유저 id", example="kimssafy")
	String userId;

	@ApiModelProperty(name="유저 password", example="kimssafy")
	String password;

	@ApiModelProperty(name="유저 name", example="kimssafy")
	private String name;

	@ApiModelProperty(name="유저 nickname", example="kimssafy")
	private String nickname;

	@ApiModelProperty(name="유저 Email", example="kimssafy@ssafy.com")
	private String email;

	@ApiModelProperty(name="유저 ProfileImgNum", example="1")
	private int profileImgNum;
}
