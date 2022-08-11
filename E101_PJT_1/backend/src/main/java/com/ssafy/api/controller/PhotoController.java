package com.ssafy.api.controller;

import com.ssafy.api.request.PhotoGetReq;
import com.ssafy.api.request.PhotoPostReq;
import com.ssafy.api.response.PhotoRes;
import com.ssafy.api.service.PhotoService;
import com.ssafy.api.service.RoomService;
import com.ssafy.common.myObject.PhotoInfo;
import com.ssafy.common.util.S3Uploader;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Api(value = "사진 API", tags = {"Photo."})
@RequiredArgsConstructor
@RestController
@RequestMapping("/photos")
@CrossOrigin
public class PhotoController {

    private final S3Uploader s3Uploader;

    @Autowired
    PhotoService photoService;
    @Autowired
    RoomService roomService;

    @PostMapping("")
    @ApiOperation(value = "사진 저장", notes = "DB에 추억으로 저장하고 싶은 사진 URL저장")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "사진 리스트 없음"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public String upload(@RequestBody @ApiParam(value = "추억으로 놔두고 싶은 사진 URLs", required = true) List<String> photo_urls,
                         @RequestBody @ApiParam(value = "게임 룸코드", required = true) String roomSeq) throws IOException {
        for (String s : photo_urls) {
            photoService.savePhotoUrl(s, roomSeq);
        }
        return photo_urls.size() + "개의 사진을 저장하였습니다.";
    }

    @PostMapping("/temp")
    @ApiOperation(value = "사진 임시 저장", notes = "S3에 임시로 사진 저장")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "사진 리스트 없음"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public String tempUpload(@RequestPart @ApiParam(value = "캡쳐 사진 파일", required = true) MultipartFile photo,
                             @RequestPart @ApiParam(value = "게임 룸 정보", required = true) PhotoPostReq roomInfo) throws IOException {
        String date = roomInfo.getDate();
        String roomSeq = roomInfo.getRoomSeq();
        photoService.saveTempPhoto(photo, date, roomSeq);

        String[] dateSplit = date.split(" ")[0].split("/");
        String dirDate = dateSplit[2] + "년" + dateSplit[0] + "월" + dateSplit[1] + "일";
        return "사진을 S3의 /temp/" + roomSeq + "-" + dirDate + " 폴더에 저장하였습니다.";
    }

    @GetMapping("")
    @ApiOperation(value = "추억 사진 리스트 확인", notes = "사진 리스트를 확인 할 수 있다 (Date가 null일경우 모든 사진 확인, DATE가 있을경우 해당 날짜의 사진 확인)")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = PhotoRes.class),
            @ApiResponse(code = 401, message = "사진 리스트 없음"),
            @ApiResponse(code = 404, message = "유저 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<PhotoRes> photoListDate
            (@RequestBody @ApiParam(value = "사진 불러오는 유저의 닉네임과 불러올 날짜(날짜는 null가능)", required = true) PhotoGetReq info) {
        String date = info.getDate();
        String nickname = info.getNickname();

        List<PhotoInfo> photoInfoList = null;
        if (date == null) { // 모든 사진 리스트 불러오기
            photoInfoList = photoService.getAllPhotoByNickname(nickname);

            if (photoInfoList.size() == 0) {
                return ResponseEntity.status(200).body(PhotoRes.of(401, "추억 사진이 없습니다.", photoInfoList));
            }

            return ResponseEntity.status(200).body(PhotoRes.of(200, nickname + "님의 추억을 불러왔습니다.", photoInfoList));
        } else { // 해당 날짜의 사진 리스트 불러오기
            photoInfoList = photoService.getAllPhotoByNicknameAndDate(date, nickname);

            if (photoInfoList.size() == 0) {
                return ResponseEntity.status(200).body(PhotoRes.of(401, "추억 사진이 없습니다.", photoInfoList));
            }
            String onlyDate = date.split(" ")[0];
            String[] splitDate = onlyDate.split("/");
            return ResponseEntity.status(200).body(PhotoRes.of(200, nickname + "님의 "
                    + splitDate[2] + "년 " + splitDate[0] + "월 " + splitDate[1] + "일 (" + date.split(" ")[1] + ")의 추억을 불러왔습니다", photoInfoList));
        }
    }

    @GetMapping("/tempPhoto/{roomSeq}")
    @ApiOperation(value = "게임 중 캡쳐된 사진", notes = "게임을 진행하는 동안 캡쳐된 모든 사진들을 보여준다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = PhotoRes.class),
            @ApiResponse(code = 401, message = "게임 룸 정보 없음"),
            @ApiResponse(code = 404, message = "게임 중 캡쳐된 사진 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<PhotoRes> showTempPhotoList(@PathVariable @ApiParam(value = "게임 룸 정보", required = true) String roomSeq) {

        try {
            roomService.getRoomByRoomCode(Long.parseLong(roomSeq));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(PhotoRes.of(401, roomSeq + "번 방의 정보가 없습니다.", null));
        }

        List<PhotoInfo> photoInfoList = photoService.showAllTempPhoto(roomSeq);
        if (photoInfoList.size() == 0) {
            return ResponseEntity.status(404).body(PhotoRes.of(404, roomSeq + "번 방의 캡쳐된 사진이 하나도 없습니다.", photoInfoList));
        }

        return ResponseEntity.status(200).body(PhotoRes.of(200, roomSeq + "번 방의 캡쳐된 사진을 불러왔습니다. (총" + photoInfoList.size() + "개)", photoInfoList));
    }
}
