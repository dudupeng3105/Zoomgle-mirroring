# SSAFY 부울경 1반 공통프로젝트 E101

## 줌글(Zoomgle)

### 1. 프로젝트 설명
```
각자의 생활 속에서 시간이 없어 친구들과의 만남이 어려워지는 경험은 모두가 자연스레 겪게 되는 문제일 것입니다.
최근에는 다양한 플랫폼을 통해 서로 게임, 통화, 모임 등을 즐기기도 하지만 게임 화면과 목소리로만 교류하는 것에 피로감을 느끼기도 할 것입니다.
이런 고민과 피로감의 해결을 위해 화상 통화로 서로 얼굴을 보고, 게임을 즐길 수 있는 서비스를 제공합니다.
친구를 추가하고 게임 일정을 잡아 친구를 초대할 수 있습니다.
대기실에서 모두가 다 모이게 되면 게임을 시작할 수 있습니다. 게임을 시작하면 주사위를 굴리고, 미션을 수행하며 골인 지점에 누구보다 빨리 도착하여 탈출하시기 바랍니다.
게임을 즐긴 뒤에는 일지에서 게임의 기록과 게임 중 찍은 사진 또한 확인할 수 있습니다.
```

### 2. 기술스택 및 라이브러리

| Project | Version | Description |
| ------- | ------- | ----------- |
| Java     | 1.8     |  Back-End |
| SpringBoot  | 5.3.6 | Back-End |
| Gradle  | 6.7+ | Build Tool |
| MySQL   | 8.0CE | Database |
| JavaScript |      | Front-End |
| ReactJs   | 17.0.2 | Front-End |
| React-redux   | 8.0.2 | Front-End |
| Ubuntu   | 20.04 LTS | Server |
| Docker   | 20.10.17v | Server |
| Openvidu-browser   | 2.22.0 | WebRTC |
| Html2canvas   | 1.4.1 | ScreenShot |
| AWS S3   |     | Cloud Storage |

<!-- <img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=java&logoColor=white">
<img src="https://img.shields.io/badge/spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white">
<img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
<br>
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
<br>
<img src="https://img.shields.io/badge/amazonaws-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white">   -->


### 3. 기능 설명
1. 시작 페이지
    - 클릭 시 페이지 이동<br>
    <img src="https://bucket-e101-zoomgle.s3.ap-northeast-2.amazonaws.com/readme/1.PNG" width="80%" height="80%"><br>
    - 로그인/회원가입 가능<br>
    <img src="https://bucket-e101-zoomgle.s3.ap-northeast-2.amazonaws.com/readme/2.PNG" width="80%" height="80%"><br>

2. 메인 페이지
    - 가까운 모험 및 초대장 확인 가능
    - 모험일지 탭을 클릭하거나 Memories에서 화살표 클릭 시 페이지 이동
    - 모험일지 에서는 이전 모험에서 찍었던 추억 확인 가능 <br>
    <img src="https://bucket-e101-zoomgle.s3.ap-northeast-2.amazonaws.com/readme/3.PNG" width="80%" height="80%"><br>

    - 동료 명단 탭 클릭 시 동료 리스트 페이지 이동
    - 동료 추가 가능<br>
    <img src="https://bucket-e101-zoomgle.s3.ap-northeast-2.amazonaws.com/readme/4.PNG" width="80%" height="80%"><br>

    - 모험참여/생성 탭을 클릭하거나 나침반 클릭 시 페이지 이동
    - 모험 생성 및 동료 초대 가능<br>
    <img src="https://bucket-e101-zoomgle.s3.ap-northeast-2.amazonaws.com/readme/5.PNG" width="80%" height="80%"><br>

    - 내 정보 탭을 누르면 페이지 이동
    - 회원 정보 수정 버튼을 누르면 프로필 사진 변경 및 암호 변경 가능
    <img src="https://bucket-e101-zoomgle.s3.ap-northeast-2.amazonaws.com/readme/12.PNG" width="80%" height="80%"><br>

3. 보드게임 화면
    - 모험 참여시 대기실로 이동
    - 호스트는 참여자가 모두 들어올 때까지 기다렸다가 게임 시작 가능<br>
    <img src="https://bucket-e101-zoomgle.s3.ap-northeast-2.amazonaws.com/readme/6.PNG" width="80%" height="80%"><br>
    
    - 캠 화면을 보드게임의 말로 활용
    - 화면 중앙에는 게임 진행, 미션 지문, 투표, 현재 차례 사람의 화면 등이 표시
    - 주사위를 굴려 이동
    - 사진기를 클릭하여 추억 저장 가능<br>
    <img src="https://bucket-e101-zoomgle.s3.ap-northeast-2.amazonaws.com/readme/7.PNG" width="80%" height="80%"><br>

    - 게임 화면(미션 수행, 투표, 공략자(우승자), 사진고르기)
    - 호스트가 게임 종료 버튼을 누르면 메인 페이지로 이동
    <img src="https://bucket-e101-zoomgle.s3.ap-northeast-2.amazonaws.com/readme/8.PNG" width="80%" height="80%"><br>
    <img src="https://bucket-e101-zoomgle.s3.ap-northeast-2.amazonaws.com/readme/9.PNG" width="80%" height="80%"><br>
    <img src="https://bucket-e101-zoomgle.s3.ap-northeast-2.amazonaws.com/readme/10.PNG" width="80%" height="80%"><br>
    <img src="https://bucket-e101-zoomgle.s3.ap-northeast-2.amazonaws.com/readme/11.PNG" width="80%" height="80%"><br>

### 4. 백엔드 디렉토리 구조

```
.
└── main
    ├── generated
    ├── java
    │   └── com
    │       └── ssafy
    │           ├── ZoomgleApplication.java
    │           ├── api  /* REST API 요청관련 컨트롤러, 서비스, 요청/응답 모델 정의*/
    │           │   ├── controller
    │           │   │   ├── AuthController.java
    │           │   │   ├── FriendController.java    
    │           │   │   ├── InvitationController.java
    │           │   │   ├── PhotoController.java    
    │           │   │   ├── RoomController.java
    │           │   │   └── UserController.java
    │           │   ├── request
    │           │   │   ├── CreateInvitationPostReq.java
    │           │   │   ├── CreateRoomPostReq.java
    │           │   │   ├── FriendPostReq.java
    │           │   │   ├── PhotoGetReq.java
    │           │   │   ├── PhotoListPostReq.java
    │           │   │   ├── PhotoPostReq.java
    │           │   │   ├── RoomAndPhotoGetReq.java
    │           │   │   ├── UpdateInvitationPostReq.java
    │           │   │   ├── UpdateRoomPostReq.java
    │           │   │   ├── UserLoginPostReq.java
    │           │   │   └── UserRegisterPostReq.java
    │           │   ├── response
    │           │   │   ├── FriendPostRes.java
    │           │   │   ├── FriendRes.java
    │           │   │   ├── InvitationInfoListRes.java
    │           │   │   ├── PhotoRes.java
    │           │   │   ├── RoomAndPhotoRes.java
    │           │   │   ├── RoomInfoListRes.java
    │           │   │   ├── UserGameInfoRes.java
    │           │   │   ├── UserLoginPostRes.java       
    │           │   │   └── UserRes.java
    │           │   └── service
    │           │       ├── FriendService.java
    │           │       ├── FirendServiceImpl.java
    │           │       ├── InvitationService.java
    │           │       ├── InvitationServiceImpl.java
    │           │       ├── PhotoService.java
    │           │       ├── PhotoServiceImpl.java
    │           │       ├── RoomService.java
    │           │       ├── RoomServiceImpl.java
    │           │       ├── UserService.java
    │           │       └── UserServiceImpl.java
    │           ├── common /* 공용 유틸, 응답 모델, 인증, 예외처리 관련 정의*/
    │           │   ├── auth
    │           │   │   ├── JwtAuthenticationFilter.java
    │           │   │   ├── SsafyUserDetailService.java
    │           │   │   └── SsafyUserDetails.java
    │           │   ├── customObject
    │           │   │   ├── FirendInfoInterface.java
    │           │   │   ├── InvitationInfo.java
    │           │   │   ├── PhotoInfo.java
    │           │   │   ├── RoomInfo.java
    │           │   │   ├── RoomInfoAndPhoto.java
    │           │   │   ├── RoomInfoInterface.java
    │           │   │   └── UserGameInfo.java
    │           │   ├── exception
    │           │   │   └── handler
    │           │   │       └── NotFoundHandler.java
    │           │   ├── model
    │           │   │   └── response
    │           │   │       └── BaseResponseBody.java
    │           │   └── util
    │           │       ├── JwtTokenUtil.java
    │           │       ├── ResponseBodyWriteUtil.java
    │           │       └── S3Uploader.java
    │           ├── config /* WebMvc 및 JPA, Security, Swagger 등의 추가 플러그인 설정 정의*/
    │           │   ├── JpaConfig.java
    │           │   ├── SecurityConfig.java
    │           │   ├── SwaggerConfig.java
    │           │   └── WebMvcConfig.java
    │           └── db /* 디비에 저장될 모델 정의 및 쿼리 구현 */
    │               ├── entity
    │               │   ├── BaseEntity.java
    │               │   ├── Friend.java
    │               │   ├── Invitation.java
    │               │   ├── Photo.java
    │               │   ├── Player.java
    │               │   ├── Room.java
    │               │   ├── TempPhoto.java
    │               │   └── User.java
    │               └── repository
    │                   ├── FriendRepository.java
    │                   ├── InvitationRepository.java
    │                   ├── PhotoRepository.java
    │                   ├── PlayerRepository.java
    │                   ├── RoomRepository.java
    │                   ├── TempPhotoRepository.java
    │                   ├── UserRepository.java
    │                   └── UserRepositorySupport.java
    └── resources
        └── application.properties /* 웹 리소스(서버 host/port, DB host/port/계정/패스워드), AWS S3 관련 설정 정의 */
```
### 5. 프론트엔드 디렉토리 구조
```
.
├─ jsconfig.json
├─ package-lock.json
├─ package.json
├─ public
│  ├─ favicon.ico
│  ├─ index.html
│  ├─ logo192.png
│  ├─ logo512.png
│  ├─ manifest.json
│  └─ robots.txt
├─ src
│  ├─ App.css
│  ├─ App.js
│  ├─ components
│  │  ├─ auth
│  │  │  ├─ AuthForm.js
│  │  │  ├─ AuthTemplate.js
│  │  │  ├─ ProfileContentModal.js
│  │  │  └─ ProfileInfoBox.js
│  │  ├─ common
│  │  │  ├─ Button.js
│  │  │  ├─ header.js
│  │  │  ├─ headerMenu.js
│  │  │  └─ PlannedGameList.js
│  │  ├─ display
│  │  │  ├─ StartPageModal.js
│  │  │  └─ StartStoryBoardBlock.js
│  │  ├─ openvidutest /* WebRTC 관련 컴포넌트 */
│  │  │  ├─ MainUserVideoComponent.js
│  │  │  ├─ minigameList.js
│  │  │  ├─ MvpPhaseComponent.js
│  │  │  ├─ OpenViduBlock.js
│  │  │  ├─ OpenViduSession.js
│  │  │  ├─ OvVideo.js
│  │  │  ├─ UserVideoComponent.js
│  │  │  └─ WaitingRoom.js
│  │  ├─ personal
│  │  │  ├─ FriendsContent.js
│  │  │  ├─ MyPageContent.js
│  │  │  ├─ PicturesContent.js
│  │  │  ├─ PlanGameDetail.js
│  │  │  └─ ProfileContent.js
│  │  └─ utils
│  │     ├─ CheckCloseModal.js
│  │     ├─ CustomDatePicker.js
│  │     ├─ DiceRoller.js
│  │     ├─ GameNumCounter.js
│  │     ├─ MyPageCalender.txt
│  │     ├─ PersonNumCounter.js
│  │     ├─ reactAudioPlayer.js
│  │     └─ useIntervals.js
│  ├─ containers
│  │  └─ auth
│  │     ├─ LoginForm.js
│  │     └─ SignUpForm.js
│  ├─ fonts
│  │  └─ EastSeaDokdo-Regular.ttf
│  ├─ index.css
│  ├─ index.js
│  ├─ media /* 프로젝트 이미지 및 소리 */
│  │  ├─ back_long.jpg
│  │  ├─ back_long1
│  │  ├─ images /* 프로젝트 이미지들 (파일생략) */
│  │  │  └─ images.png/jpeg
│  │  └─ sounds /* 프로젝트 소리 */
│  │     ├─ 01_firstpage.wav
│  │     ├─ 02_loginPage.wav
│  │     ├─ 03_homePage.wav
│  │     ├─ 04_nextPage.wav
│  │     ├─ 05_btn.wav
│  │     ├─ 06_waitingRoom.wav
│  │     ├─ 07_playerEnter.wav
│  │     ├─ 08_gameStart.wav
│  │     ├─ 09_gameBgm.wav
│  │     ├─ 10_myTurn.wav
│  │     ├─ 11_move.mp3
│  │     ├─ 12_gameAlert.wav
│  │     ├─ 13_countDown.wav
│  │     ├─ 14_voteSuccess.wav
│  │     ├─ 15_voteFail.wav
│  │     ├─ 17_mvpBgm.wav
│  │     ├─ 18_cameraSound.mp3
│  │     └─ animal.wav
│  ├─ pages /* 라우트와 관련된 컴포넌트 */
│  │  ├─ FriendsPage.js
│  │  ├─ JoinGamePage.js
│  │  ├─ LoginPage.js
│  │  ├─ MyPage.js
│  │  ├─ OpenviduPage.js
│  │  ├─ PicturesPage.js
│  │  ├─ ProfilePage.js
│  │  ├─ SignupPage.js
│  │  └─  StartPage.js
│  └─ store /* 리적스, 사가, 스토어, api관련 */
│     ├─ api.js
│     ├─ auth-slice.js
│     ├─ authSagas.js
│     ├─ customAxios.js
│     ├─ friends-slice.js
│     ├─ friendSagas.js
│     ├─ gamePlan-slice.js
│     ├─ gamePlanSagas.js
│     ├─ gameRoom-slice.js
│     ├─ gameRoomSagas.js
│     ├─ index.js
│     ├─ user-slice.txt
│     └─ userSagas.txt
├─ yarn.lock
└─ 참조자료.txt
```


