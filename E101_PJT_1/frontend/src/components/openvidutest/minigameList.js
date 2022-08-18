// 0(그리기 게임같은(현재 턴인 사람한테만 정답을 보여줘야하는 게임))
// 1(이외 게임)

export const minigameList = [
  ['줄무늬 옷', 10, 1, "몸을 지키기 위한 최소한의 물건을 가져와라."],
  ['양말 세 켤레', 10, 1, "발이 푹푹 빠지는 늪, 다음 물건을 가져올 것"],
  ['장갑', 10, 1, "가시 덤불을 안전하게 치우기 위해 다음 물건을 가져와라"],
  ['청바지', 10, 1, "몸을 지키기 위한 최소한의 물건을 가져올 것"],
  ['텀블러', 10, 1, "이 곳을 탈출하려면 챙기는 것이 좋을 것이다. 다음 물건을 가져오시오"],
  ['빨간색 펜', 10, 1, "중요한 것은 기록하는 것이 좋다. 다음 물건을 가져와라"],
  ['전 애인의 추억에 물건', 30, 1, "추억은 독이기도 하겠지,,, 물건을 가져와라"],
  ['화장품', 10, 1, "이런 곳에서도 아름다움은 무기가 될 것이다. 물건을 가져올 것"],
  ['고무장갑', 15, 1, "물에 빠트린 물건을 건지기 위해 다음 물건을 가져와라"],
  ['과일 아무거나', 15, 1, "그 열매는 갈증과 배고픔을 모두 해결해 줄 것이다. 다음을 가져와라"],
  // 10개 ================================
  ['식용유', 15, 1, "맛있는 식사는 삶의 희망이지.. 다음 물건을 가져올 것"],
  ['리모컨', 10, 1, "문명의 도구는 언제나 도움이 된다. 다음 물건을 가져올 것"],
  ['숟가락', 10, 1, "별 것 아닐지라도 귀중할 지 모른다, 다음 물건을 가져올 것"],
  ['노래와 관련된 물건', 15, 1, "음악은 마음을 위로해준다. 다음 물건을 가져올 것"],
  ['빗', 10, 1, "조금이라도 쾌적한 생활이 필요한가? 다음 물건을 가져올 것"],
  ['보조배터리', 10, 1, "문명의 도구는 언제나 도움이 된다. 다음 물건을 가져올 것"],
  ['이어폰', 10, 1, "귀를 막을 수 있다면... 그 무엇이든, 다음 물건을 가져올 것"],
  ['휴지/티슈 한 칸', 10, 1, "나뭇잎 보다는 나을 것이다. 다음 물건을 가져올 것"],
  ['메달', 10, 1, "귀중한 보물처럼 보일지도 모른다.. 다음 물건을 가져올 것"],
  ['충전기', 10, 1, "문명의 도구는 언제나 도움이 된다. 다음 물건을 가져올 것"],
  // 20개 ================================  
  ['노트 1권', 10, 1, "기록은 문명의 시작. 다음 물건을 가져올 것"],
  ['물 한잔(병)', 15, 1, "시드는 생명을 깨우는 다음 물건을 가져올 것"],
  ['빨간색 물건 아무거나', 10, 1, "서로를 알아보기에는 강렬한 것이 필요하다. 다음 물건을 가져올 것"],
  ['분홍색 물건', 10, 1, "별 것 아닐지라도 귀중할 지 모른다, 다음 물건을 가져올 것"],
  ['수건 2개', 10, 1, "쓸모가 많은 것이다, 다음 물건을 가져올 것"],
  ['검은색 가방', 10, 1, "물건을 들고다니기엔 힘들 것이다. 다음 물건을 가져올 것"],
  ["손수건", 10, 1, "쓸모가 많은 것이다, 다음 물건을 가져올 것"],
  ['hey mama (스우파) 춤 동작하기', 7, 1, "부족의 축제에 자연스럽게 녹아들 것, 지령을 수행해라"],
  ['캐릭터 옷 입기', 15, 1, "밤에는 몸의 체온을 유지해야지,, 지령을 수행해라"],
  ['개인기 하나', 20, 1, "그들과는 우호를 쌓는 것이 좋을 것이다. 지령을 수행해라"],
  // 30개 ================================
  ['스쿼트 5번', 10, 1, "체력 단련은 언제나 중요하다. 지령을 수행해라"],
  ['양말 신고오기', 10, 1, "길고 조용한 사신은 바닥에서 우리를 노린다. 지령을 수행해라"],
  ['노란색 옷 입기', 10, 1, "붉은 색 보다는 나을 것이다. 지령을 수행해라"],
  ['머리 묶고 오기', 10, 1, "긴 머리는 아무런 도움이 되지 않는다. 지령을 수행해라"],
  ['반바지 입고오기', 10, 1, "더위에 지지 않으려면 다음 지령을 수행해라"],
  ['비상구 포즈 하기', 10, 1, "빠르게 달아나는 것만이 살 길이다. 지령을 수행해라"],
  ['스파이더맨 포즈 하기', 5, 1, "지령을 수행해라"],
  ['버피테스트 5개', 10, 1, "체력 단련은 언제나 중요하다. 지령을 수행해라"],
  ['핸드크림 바르기', 10, 1, "피부를 보호 할 방법은 없다. 지령을 수행해라"],
  ['파란색 옷 입기', 15, 1, "노란 색 보다는 나을 것이다. 지령을 수행해라"],
  // 40개 ================================
  ['물구나무서기', 15, 1, "지령을 수행해라"],
  ['이불개기', 15, 1, "추격자를 피하려면 흔적을 남겨서는 안된다. 지령을 수행해라"],
  ['물티슈로 손 닦기', 15, 1, "위생은 언제나 중요한 것, 지령을 수행해라"],
  ['마스크 쓰고오기', 10, 1, "작은 먼지 하나가 목숨을 앗아갈 것이다. 지령을 수행해라"],
  ['겉옷 하나 입고오기', 10, 1, "체온을 유지하기 위해서는 다음 지령을 수행해라"],
  ['저기 저 뜀틀이 내가 뛸 뜀틀인가 내가 안 뛸 뜀틀인가', 4, 1, "그들의 언어를 이해하라. 발음테스트"],
  ['중앙청 창살은 쌍창살이고 시청의 창살은 외창살이다.', 5, 1, "그들의 언어를 이해해라. 발음테스트"],
  ['고려고 교복은 고급 교복이고 고려고 교복은 고급 원단을 사용했다.', 5, 1, "그들의 언어를 이해하라. 발음테스트"],
  ['시골 찹쌀 햇찹쌀 도시 찹쌀 촌찹쌀', 4, 1, "그들의 언어를 이해해라. 발음테스트"],
  ['현재 1등 얼굴', 20, 0, "동료를 찾기 위해 몽타주를 그려라, 다음 제시어를 그림으로 표현해라."],
  // 50개 ================================
  ['자화상 그리기', 20, 0, "동료를 찾기 위해 몽타주를 그려라, 다음 제시어를 그림으로 표현해라"],
  ['토끼보다 빠른 거북이', 15, 0, "돌에 남겨진 벽화를 알아봐라, 다음 제시어를 그림으로 표현해라."],
  ['뛰어오르는 돌고래', 15, 0, "돌에 남겨진 벽화를 알아봐라, 다음 제시어를 그림으로 표현하라"],
  ['구워져서 입 벌린 홍합', 15, 0, "돌에 남겨진 벽화를 알아봐라, 다음 제시어를 그림으로 표현하라."],
  ['퇴학', 15, 0, "동료에게 전해야하는 메시지를 남겨라, 다음 제시어를 그림으로 표현해라"],
  ['크라잉넛', 15, 0, "동료에게 전해야하는 메시지를 남겨라, 다음 제시어를 그림으로 표현해라"],
  ['포크레인', 10, 0, "동료에게 필요한 물건을 알려라, 다음 제시어를 그림으로 표현하라."],
  ['작업모', 10, 0, "동료에게 필요한 물건을 알려라, 다음 제시어를 그림으로 표현하라."],
  ['노트북', 10, 0, "동료에게 필요한 물건을 알려라, 다음 제시어를 그림으로 표현하라"],
  ['치킨', 10, 0, "동료에게 필요한 물건을 알려라, 다음 제시어를 그림으로 표현해라"],
  // 60개 ===============================
  ['우거지', 15, 0, "동료에게 필요한 물건을 알려라, 다음 제시어를 그림으로 표현해라."],
  ['카카오톡', 10, 0, "우리만 알 수 있는 표식을 남겨라, 다음 제시어를 그림으로 표현해라"],
  ['디스코드', 10, 0, "우리만 알 수 있는 표식을 남겨라, 다음 제시어를 그림으로 표현하라."],
  ['크롬', 10, 0, "우리만 알 수 있는 표식을 남겨라, 다음 제시어를 그림으로 표현하라"],
  ['귓속말', 15, 0, "동료에게 전해야하는 메시지를 남겨라, 다음 제시어를 그림으로 표현해라."],
  ['카레이서', 15, 0, "동료에게 전해야하는 메시지를 남겨라, 다음 제시어를 그림으로 표현하라."],

  ["축구", 10, 0, "말이 통하지 않는다면 행동으로 소통해라, 다음 스포츠를 몸으로 표현할 것"],
  ["발레", 10, 0, "말이 통하지 않는다면 행동으로 소통해라, 다음 스포츠를 몸으로 표현할 것"],
  ["골프", 10, 0, "말이 통하지 않는다면 행동으로 소통해라, 다음 스포츠를 몸으로 표현할 것"],
  ["스키", 10, 0, "말이 통하지 않는다면 행동으로 소통해라, 다음 스포츠를 몸으로 표현하라"],
  // 70개 ===============================
  ["수영", 10, 0, "말이 통하지 않는다면 행동으로 소통해라, 다음 스포츠를 몸으로 표현해라"],
  ["컬링", 10, 0, "말이 통하지 않는다면 행동으로 소통하라, 다음 스포츠를 몸으로 표현할 것"],
  ["리듬체조", 10, 0, "말이 통하지 않는다면 행동으로 소통하라, 다음 스포츠를 몸으로 표현할 것"],

  ["수박", 12, 0, "굶주린 배를 채우려면 움직여라, 다음 음식을 몸으로 표현할 것"],
  ["라면", 12, 0, "굶주린 배를 채우려면 움직여라, 다음 음식을 몸으로 표현할 것"],
  ["바나나", 12, 0, "몸을 움직여 굶주린 배를 채워라, 다음 음식을 몸으로 표현하라"],
  ["짜장면", 12, 0, "몸을 움직여 굶주린 배를 채워라, 다음 음식을 몸으로 표현하라"],

  ["모델", 15, 0, "자신이 누군지 어떻게든 전달하라. 다음 직업을 몸으로 표현할 것"],
  ["광부", 15, 0, "자신이 누군지 어떻게든 전달해라. 다음 직업을 몸으로 표현할 것"],
  ["화가", 15, 0, "자신이 누군지 어떻게든 전달해라. 다음 직업을 몸으로 표현할 것"],
  // 80개 =====================================
  ["지휘자", 15, 0, "자신이 누군지 어떻게든 전달해라. 다음 직업을 몸으로 표현할 것"],
  ["나무꾼", 15, 0, "자신이 누군지 어떻게든 전달하라. 다음 직업을 몸으로 표현할 것"],
  ["요리사", 15, 0, "자신이 누군지 어떻게든 전달하라. 다음 직업을 몸으로 표현할 것"],
  ["치어리더", 15, 0, "자신이 누군지 어떻게든 전달하라. 다음 직업을 몸으로 표현해라"],
  ["스튜어디스", 15, 0, "자신이 누군지 어떻게든 전달해라. 다음 직업을 몸으로 표현해라"],

  ["뱁새가 황새 따라가려다 다리가 찢어진다", 15, 0, "분수에 맞는 행동으로 스스로를 보호하기를, 다음 속담을 몸으로 표현해라"],
  ["꼬리가 길면 밟힌다", 15, 0, "흔적이 남지 않는 일은 없다. 다음 속담을 몸으로 표현하라"],
  ["쇠 뿔도 단 김에 빼라", 15, 0, "마음 먹었다면 주저하지 말지어다. 다음 속담을 몸으로 표현하라"],
  ["아니 땐 굴뚝에 연기 나랴", 15, 0, "모든 일에는 원인이 있는 법.. 다음 속담을 몸으로 표현하라"],
  ["목 마른 사람이 우물 판다", 15, 0, "필요한 사람이 움직여야 할 지니, 다음 속담을 몸으로 표현해라"],
  // 90개 ======================================
  ["세살 버릇 여든 간다", 15, 0, "작은 습관이었을 뿐이다. 다음 속담을 몸으로 표현해라"],
  ["하늘이 무너져도 솟아날 구멍은 있다", 15, 0, "희망을 잃지 않는 것이 중요하다. 다음 속담을 몸으로 표현해라"],
  ["똥 묻은 개가 재묻은 개 나무란다", 15, 0, "다음 속담을 몸으로 표현해라"],
  ["뛰는놈 위에 나는 놈", 15, 0, "늘 최고의 자리를 유지하기엔 어렵지, 다음 속담을 몸으로 표현해라"],
  ["공든 탑이 무너지랴", 15, 0, "노력한다면, 그 끝은.. 다음 속담을 몸으로 표현하라"],
  ["서당개 3년이면 풍월을 읊는다", 10, 0, "그들도 학습한다. 다음 속담을 몸으로 표현해라"],
  ["등잔 밑이 어둡다", 10, 0, "밝은 빛이 모든것을 비추기만 하는가? 다음 속담을 몸으로 표현해라"],
  ["누워서 침 뱉기", 10, 0, "의미없는 짓임을 알고 있지 않은가? 다음 속담을 몸으로 표현하라"],
  ['닭 쫒던 개 지붕 쳐다본다', 15, 0, "들키지 않고 이야기를 전달하라, 다음 속담을 그림으로 표현하라."],
  ["쇠 귀에 경읽기", 15, 0, "들키지 않고 이야기를 전달해라, 다음 속담을 그림으로 표현해라"],
  // 100개 ======================================
  ["박장대소하는 고양이", 15, 0, "눈에 띄는 존재를 기록해라. 다음 제시어를 그림으로 표현해라."],
  ["해바라기씨 먹는 햄스터", 15, 0, "눈에 띄는 존재를 기록해라. 다음 제시어를 그림으로 표현해라."],
  ["춤추는 개", 15, 0, "눈에 띄는 존재를 기록해라. 다음 제시어를 그림으로 표현해라."],
  ["울다 지쳐 잠든 소", 15, 0, "눈에 띄는 존재를 기록해라. 다음 제시어를 그림으로 표현하라."],
  ["하늘을 날고싶은 닭", 15, 0, "눈에 띄는 존재를 기록하라. 다음 제시어를 그림으로 표현하라."],
  ['고생끝에 낙이 온다', 15, 0, "소리를 듣지 못한다면 그림으로 대화하라, 다음 속담을 그림으로 표현해라."],
  ['자라보고 놀란 가슴 솥뚜껑 보고 놀란다', 15, 0, "소리를 듣지 못한다면 그림으로 대화해라, 다음 속담을 그림으로 표현해라."],
  ['까마귀 날자 배 떨어진다', 15, 0, "들키지 않고 이야기를 전달하라, 다음 속담을 그림으로 표현하라."],
  ['개똥도 약에 쓰려면 없다', 15, 0, "들키지 않고 이야기를 전달해라, 다음 속담을 그림으로 표현해라."],
  ['소 잃고 외양간 고친다', 15, 0, "들키지 않고 이야기를 전달해라, 다음 속담을 그림으로 표현해라."],
  // 110개 =======================================
  ['카페 브랜드 4개 말하기', 7, 1, "동료를 알아보기 위한 암호, 지령을 수행해라"],
  ['맥주 브랜드 3개 말하기', 5, 1, "당신이 나와 같은 곳에서 온 것이 맞는가? 지령을 수행해라"],
  ['술 종류 3개 말하기', 5, 1, "동료를 알아보기 위한 암호, 지령을 수행해라"],
  ['자동차 브랜드 3개 말하기', 5, 1, "당신이 나와 같은 곳에서 온 것이 맞는가? 지령을 수행해라"],
  ['아이스크림 종류 3개 말하기', 5, 1, "동료를 알아보기 위한 암호, 지령을 수행해라"],
  ['탄산음료 브랜드 3개 말하기', 5, 1, "당신이 나와 같은 곳에서 온 것이 맞는가? 지령을 수행해라"],
  ['초콜릿 브랜드 3개 말하기', 5, 1, "동료를 알아보기 위한 암호, 지령을 수행해라"],
  ['1글자 단어 3개 말하기', 5, 1, "당신이 나와 같은 곳에서 온 것이 맞는가? 지령을 수행해라"],
  ['국가의 수도명 3개 말하기', 5, 1, "동료를 알아보기 위한 암호, 지령을 수행해라"],
  ['빵 5종류 말하기', 7, 1, "당신이 나와 같은 곳에서 온 것이 맞는가? 지령을 수행해라"],
  // 120개 ======================================
  ['중국음식 5개 말하기', 6, 1, "동료를 알아보기 위한 암호, 지령을 수행해라"],
  ['면 요리 5개 말하기', 7, 1, "당신이 나와 같은 곳에서 온 것이 맞는가? 지령을 수행해라"],
  ['치킨 브랜드 5개 말하기', 6, 1, "동료를 알아보기 위한 암호, 지령을 수행해라"],
  ['동료 3명의 이름 말하기', 5, 1, "당신이 나와 같은 곳에서 온 것이 맞는가? 지령을 수행해라"],
  ['가수 이름 3개 말하기', 5, 1, "단어를 떠올리고 신뢰를 쌓아라, 지령을 수행해라"],
  ['나라의 수도 3개 말하기', 6, 1, "동료를 알아보기 위한 암호, 지령을 수행해라"],
  ['현악기 3개 말하기', 7, 1, "단어를 떠올리고 신뢰를 쌓아라, 지령을 수행해라"],
  ['한국 배우 5명 말하기', 8, 1, "단어를 떠올리고 신뢰를 쌓아라, 지령을 수행해라"],
  ['바다물고기 3종류 말하기', 7, 1, "동료를 알아보기 위한 암호, 지령을 수행해라"],
  ['사자성어 3개 말하기', 5, 1, "동료를 알아보기 위한 암호, 지령을 수행해라"],
  // 130개 ======================================
  ['견종 3종류 말하기', 5, 1, "단어를 떠올리고 신뢰를 쌓아라, 지령을 수행해라"],
  ['통으로 끝나는 단어 5개 말하기', 7, 1, "동료를 알아보기 위한 암호, 지령을 수행해라"],
  ['역으로 끝나는 단어 3개 말하기', 4, 1, "단어를 떠올리고 신뢰를 쌓아라, 지령을 수행해라"],
  ['국으로 끝나는 단어 5개 말하기', 7, 1, "동료를 알아보기 위한 암호, 지령을 수행해라"],
  ['작가 3명 말하기', 5, 1, "동료를 알아보기 위한 암호, 지령을 수행해라"],
  ['타악기 3개 말하기', 7, 1, "단어를 떠올리고 신뢰를 쌓아라, 지령을 수행해라"],
  ['외국 배우 5명 말하기', 8, 1, "단어를 떠올리고 신뢰를 쌓아라, 지령을 수행해라"],
  ['겨울스포츠 3개 말하기', 5, 1, "동료를 알아보기 위한 암호, 지령을 수행해라"],
  ['브라질 축구선수 3명 말하기', 7, 1, "단어를 떠올리고 신뢰를 쌓아라, 지령을 수행해라"],
  ['드라마 제목 3개 말하기', 6, 1, "동료를 알아보기 위한 암호, 지령을 수행해라"],
  // 140개 =====================================
  ['게임 이름 3개 말하기', 5, 1, "단어를 떠올리고 신뢰를 쌓아라, 지령을 수행해라"],
  ['천만 관객 영화 3개 말하기', 5, 1, "단어를 떠올리고 신뢰를 쌓아라, 지령을 수행해라"],
  ['포유류 5개 말하기', 7, 1, "동료를 알아보기 위한 암호, 지령을 수행해라"],
  ['대통령 3명 말하기', 5, 1, "동료를 알아보기 위한 암호, 지령을 수행해라"],
  ['식으로 끝나는 단어 3개 말하기', 4, 1, "단어를 떠올리고 신뢰를 쌓아라, 지령을 수행해라"],
  ['용으로 끝나는 단어 5개 말하기', 7, 1, "동료를 알아보기 위한 암호, 지령을 수행해라"],
  ['정으로 끝나는 단어 3개 말하기', 4, 1, "단어를 떠올리고 신뢰를 쌓아라, 지령을 수행해라"],
  ['원으로 끝나는 단어 5개 말하기', 7, 1, "동료를 알아보기 위한 암호, 지령을 수행해라"],
  ['커피 3종류 말하기', 4, 1, "단어를 떠올리고 신뢰를 쌓아라, 지령을 수행해라"],
  ['과일 이름 5개 말하기', 7, 1, "동료를 알아보기 위한 암호, 지령을 수행해라"],
  // 150개 ====================================
  ['신체 부위 4개 말하기', 5, 1, "단어를 떠올리고 신뢰를 쌓아라, 지령을 수행해라"],
  ['라디오 방송 3가지 말하기', 6, 1, "동료를 알아보기 위한 암호, 지령을 수행해라"],
  ['리로 끝나는 단어 3개 말하기', 4, 1, "단어를 떠올리고 신뢰를 쌓아라, 지령을 수행해라"],
  ['전으로 끝나는 단어 5개 말하기', 7, 1, "동료를 알아보기 위한 암호, 지령을 수행해라"],

  ['일 기 ○ ○', 2, 1, "당신은 그들의 단어를 얼마나 알고 있는가? 앞의 두 글자를 보고 뒤를 이어라"],
  ['지 푸 ○ ○', 2, 1, "그들의 언어를 이해하기 위한 연상력을 보겠다. 앞의 두 글자를 보고 뒤를 이어라"],
  ['갑 오 ○ ○', 2, 1, "그들의 언어를 이해하기 위한 연상력을 보겠다. 앞의 두 글자를 보고 뒤를 이어라"],
  ['동 그 ○ ○', 2, 1, "당신은 그들의 단어를 얼마나 알고 있는가? 앞의 두 글자를 보고 뒤를 이어라"],
  ['샌 드 ○ ○', 2, 1, "당신은 그들의 단어를 얼마나 알고 있는가? 앞의 두 글자를 보고 뒤를 이어라"],
  ['해 바 ○ ○', 2, 1, "그들의 언어를 이해하기 위한 연상력을 보겠다. 앞의 두 글자를 보고 뒤를 이어라"],
  // 160개 ====================================
  ['배 추 ○ ○', 2, 1, "당신은 그들의 단어를 얼마나 알고 있는가? 앞의 두 글자를 보고 뒤를 이어라"],
  ['초 등 ○ ○', 2, 1, "당신은 그들의 단어를 얼마나 알고 있는가? 앞의 두 글자를 보고 뒤를 이어라"],
  ['일 기 ○ ○', 2, 1, "그들의 언어를 이해하기 위한 연상력을 보겠다. 앞의 두 글자를 보고 뒤를 이어라"],
  ['코 스 ○ ○', 2, 1, "당신은 그들의 단어를 얼마나 알고 있는가? 앞의 두 글자를 보고 뒤를 이어라"],
  ['연 애 ○ ○', 2, 1, "당신은 그들의 단어를 얼마나 알고 있는가? 앞의 두 글자를 보고 뒤를 이어라"],
  ['오 마 ○ ○', 2, 1, "그들의 언어를 이해하기 위한 연상력을 보겠다. 앞의 두 글자를 보고 뒤를 이어라"],
  ['트 와 ○ ○', 2, 1, "당신은 그들의 단어를 얼마나 알고 있는가? 앞의 두 글자를 보고 뒤를 이어라"],
  ['포 스 ○ ○', 2, 1, "그들의 언어를 이해하기 위한 연상력을 보겠다. 앞의 두 글자를 보고 뒤를 이어라"],
  ['세 종 ○ ○', 2, 1, "당신은 그들의 단어를 얼마나 알고 있는가? 앞의 두 글자를 보고 뒤를 이어라"],
  ['케 이 ○ ○', 2, 1, "그들의 언어를 이해하기 위한 연상력을 보겠다. 앞의 두 글자를 보고 뒤를 이어라"],
  // 170개 ======================================
  ['나 무 ○ ○', 2, 1, "당신은 그들의 단어를 얼마나 알고 있는가? 앞의 두 글자를 보고 뒤를 이어라"],
  ['시 리 ○ ○', 2, 1, "그들의 언어를 이해하기 위한 연상력을 보겠다. 앞의 두 글자를 보고 뒤를 이어라"],
  ['호 접 ○ ○', 2, 1, "당신은 그들의 단어를 얼마나 알고 있는가? 앞의 두 글자를 보고 뒤를 이어라"],
  ['소 프 ○ ○', 2, 1, "그들의 언어를 이해하기 위한 연상력을 보겠다. 앞의 두 글자를 보고 뒤를 이어라"],
  ['스 파 ○ ○', 2, 1, "당신은 그들의 단어를 얼마나 알고 있는가? 앞의 두 글자를 보고 뒤를 이어라"],
  ['티 라 ○ ○', 2, 1, "그들의 언어를 이해하기 위한 연상력을 보겠다. 앞의 두 글자를 보고 뒤를 이어라"],
  ['숨 바 ○ ○', 2, 1, "당신은 그들의 단어를 얼마나 알고 있는가? 앞의 두 글자를 보고 뒤를 이어라"],
  ['겨 울 ○ ○', 2, 1, "당신은 그들의 단어를 얼마나 알고 있는가? 앞의 두 글자를 보고 뒤를 이어라"],
  ['뱀 파 ○ ○', 2, 1, "그들의 언어를 이해하기 위한 연상력을 보겠다. 앞의 두 글자를 보고 뒤를 이어라"],
  ['스 마 ○ ○', 2, 1, "당신은 그들의 단어를 얼마나 알고 있는가? 앞의 두 글자를 보고 뒤를 이어라"],
  // 180개 ======================================
  ['와 이 ○ ○', 2, 1, "그들의 언어를 이해하기 위한 연상력을 보겠다. 앞의 두 글자를 보고 뒤를 이어라"],
  ['아 이 ○ ○', 2, 1, "당신은 그들의 단어를 얼마나 알고 있는가? 앞의 두 글자를 보고 뒤를 이어라"],
  ['카 카 ○ ○', 2, 1, "그들의 언어를 이해하기 위한 연상력을 보겠다. 앞의 두 글자를 보고 뒤를 이어라"],
  ['셜 록 ○ ○', 2, 1, "당신은 그들의 단어를 얼마나 알고 있는가? 앞의 두 글자를 보고 뒤를 이어라"],

  ['오 케 ○ ○ ○', 2, 1, "어떠한 말을 하기위해서는 단어를 알아야지, 앞의 두 글자를 보고 뒤를 이어라"],
  ['트 랜 ○ ○ ○', 2, 1, "어떠한 말을 하기위해서는 단어를 알아야지, 앞의 두 글자를 보고 뒤를 이어라"],
  ['캐 스 ○ ○ ○', 2, 1, "어떠한 말을 하기위해서는 단어를 알아야지, 앞의 두 글자를 보고 뒤를 이어라"],
  ['트 라 ○ ○ ○', 2, 1, "어떠한 말을 하기위해서는 단어를 알아야지, 앞의 두 글자를 보고 뒤를 이어라"],
  ['피 아 ○ ○ ○', 2, 1, "어떠한 말을 하기위해서는 단어를 알아야지, 앞의 두 글자를 보고 뒤를 이어라"],
  ['버 킷 ○ ○ ○', 2, 1, "어떠한 말을 하기위해서는 단어를 알아야지, 앞의 두 글자를 보고 뒤를 이어라"],
  // 190개 ======================================
  ['마 트 ○ ○ ○', 2, 1, "어떠한 말을 하기위해서는 단어를 알아야지, 앞의 두 글자를 보고 뒤를 이어라"],
  ['아 메 ○ ○ ○', 2, 1, "어떠한 말을 하기위해서는 단어를 알아야지, 앞의 두 글자를 보고 뒤를 이어라"],
  ['아 이 ○ ○ ○', 2, 1, "어떠한 말을 하기위해서는 단어를 알아야지, 앞의 두 글자를 보고 뒤를 이어라"],
  ['자 유 ○ ○ ○', 2, 1, "어떠한 말을 하기위해서는 단어를 알아야지, 앞의 두 글자를 보고 뒤를 이어라"],
  ['오 르 ○ ○ ○', 2, 1, "대화를 얼마나 알아 들을 수 있을 것인가? 앞의 두 글자를 보고 뒤를 이어라"],
  ['카 시 ○ ○ ○', 2, 1, "대화를 얼마나 알아 들을 수 있을 것인가? 앞의 두 글자를 보고 뒤를 이어라"],
  ['장 수 ○ ○ ○', 2, 1, "대화를 얼마나 알아 들을 수 있을 것인가? 앞의 두 글자를 보고 뒤를 이어라"],
  ['케 미 ○ ○ ○', 2, 1, "대화를 얼마나 알아 들을 수 있을 것인가? 앞의 두 글자를 보고 뒤를 이어라"],
  ['카 트 ○ ○ ○', 2, 1, "대화를 얼마나 알아 들을 수 있을 것인가? 앞의 두 글자를 보고 뒤를 이어라"],
  ['오 세 ○ ○ ○', 2, 1, "대화를 얼마나 알아 들을 수 있을 것인가? 앞의 두 글자를 보고 뒤를 이어라"],
  // 200개 ======================================
  ['무 선 ○ ○ ○', 2, 1, "대화를 얼마나 알아 들을 수 있을 것인가? 앞의 두 글자를 보고 뒤를 이어라"],
  ['크 림 ○ ○ ○', 2, 1, "대화를 얼마나 알아 들을 수 있을 것인가? 앞의 두 글자를 보고 뒤를 이어라"],
  ['카 레 ○ ○ ○', 2, 1, "대화를 얼마나 알아 들을 수 있을 것인가? 앞의 두 글자를 보고 뒤를 이어라"],
  ['컬 리 ○ ○ ○', 2, 1, "대화를 얼마나 알아 들을 수 있을 것인가? 앞의 두 글자를 보고 뒤를 이어라"],

  ['우물에 가서 ___________', 3, 1, "오래된 말이 가지는 힘이 있다. 다음 속담의 부분을 보고 속담을 완성하라."],
  ['낮 말은 새가 듣고 ___________', 3, 1, "오래된 말이 가지는 힘이 있다. 다음 속담의 부분을 보고 속담을 완성하라."],
  ['남의 집 잔치에 ___________', 3, 1, "오래된 말이 가지는 힘이 있다. 다음 속담의 부분을 보고 속담을 완성해라."],
  ['언 발에 ___________', 3, 1, "오래된 말이 가지는 힘이 있다. 다음 속담의 부분을 보고 속담을 완성해라."],
  ['달면 삼키고 ___________', 3, 1, "오래된 말이 가지는 힘이 있다. 다음 속담의 부분을 보고 속담을 완성해라."],
  ['비 온 뒤에 ___________', 3, 1, "오래된 말이 가지는 힘이 있다. 다음 속담의 부분을 보고 속담을 완성하라."],
  // 210개 ======================================
  ['말은 해야 맛이고 ___________', 3, 1, "오래된 말이 가지는 힘이 있다. 다음 속담의 부분을 보고 속담을 완성하라."],
  ['누워서 ___________', 3, 1, "오래된 말이 가지는 힘이 있다. 다음 속담의 부분을 보고 속담을 완성해라."],
  ['같은 값이면 ___________', 3, 1, "오래된 말이 가지는 힘이 있다. 다음 속담의 부분을 보고 속담을 완성해라."],
  ['못된 송아지 ___________', 3, 1, "오래된 말이 가지는 힘이 있다. 다음 속담의 부분을 보고 속담을 완성하라."],

  ['여자 솔로가수 노래 한 소절 부르기', 15, 1, "당신의 존재를 알리기 위해서는 목소리를 내는 것이 좋다."],
  ['남자 솔로가수 노래 한 소절 부르기', 15, 1, "당신의 존재를 알리기 위해서는 목소리를 내는 것이 좋다."],
  ['겨울왕국 - let it go 한 소절 부르기', 15, 1, "당신의 존재를 알리기 위해서는 목소리를 내는 것이 좋다."],
  ['5인조 그룹의 노래 한 소절 부르기', 15, 1, "당신의 존재를 알리기 위해서는 목소리를 내는 것이 좋다."],
  ['아이유 - 좋은날 한 소절 부르기', 15, 1, "당신의 존재를 알리기 위해서는 목소리를 내는 것이 좋다."],
  ['자신있는 노래 한 소절 부르기', 15, 1, "당신의 존재를 알리기 위해서는 목소리를 내는 것이 좋다."],
  // 220개 ======================================
];


  // ['대피소', 15, 0, "동료에게 위치를 남겨라, 다음 제시어를 그림으로 표현하라."],
  // ['인쇄소', 15, 0, "동료에게 위치를 남겨라, 다음 제시어를 그림으로 표현하라."],
  // ["양궁", 10, 0, "말이 통하지 않는다면 행동으로 소통하라, 다음 스포츠를 몸으로 표현할 것"],
  // ["농구", 10, 0, "말이 통하지 않는다면 행동으로 소통하라, 다음 스포츠를 몸으로 표현할 것"],
  // ["사격", 10, 0, "말이 통하지 않는다면 행동으로 소통하라, 다음 스포츠를 몸으로 표현할 것"],
  // ["빙수", 12, 0, "굶주린 배를 채우려면 움직여라, 다음 음식을 몸으로 표현할 것"],
  // ["케이크", 12, 0, "몸을 움직여 굶주린 배를 채워라, 다음 음식을 몸으로 표현할 것"],
  // ["꽈배기", 12, 0, "몸을 움직여 굶주린 배를 채워라, 다음 음식을 몸으로 표현할 것"],
  // ["조각가", 15, 0, "자신이 누군지 어떻게든 전달하라. 다음 직업을 몸으로 표현할 것"],
  // ["간호사", 15, 0, "자신이 누군지 어떻게든 전달하라. 다음 직업을 몸으로 표현할 것"],
  // ["비보이", 15, 0, "자신이 누군지 어떻게든 전달하라. 다음 직업을 몸으로 표현할 것"],
  // ["피아니스트", 15, 0, "자신이 누군지 어떻게든 전달하라. 다음 직업을 몸으로 표현할 것"],
  // ["아이돌가수", 15, 0, "자신이 누군지 어떻게든 전달하라. 다음 직업을 몸으로 표현할 것"],
  // ["누워서 떡 먹기", 15, 0, "이보다 쉬운 일은 없을 것이다. 다음 속담을 몸으로 표현하라"],
  // ["우물에 가 숭늉 찾는다", 15, 0, "엄한 곳을 찾는구나, 다음 속담을 몸으로 표현하라"],
  // ["말은 해야 맛이고 고기는 씹어야 맛이다", 15, 0, "마음속 이야기를 하시길, 다음 속담을 몸으로 표현하라"],
  // ["미운 놈 떡 하나 더 준다", 15, 0, "바른 길을 가기 위해서는, 다음 속담을 몸으로 표현하라"],
  // ["바늘 도둑이 소 도둑 된다", 15, 0, "시작이 어려울 뿐이다. 다음 속담을 몸으로 표현하라"],
  // ["작은 고추가 더 맵다", 15, 0, "겉으로는 알 수 없는 것이 많다. 다음 속담을 몸으로 표현하라"],
  // ["찬 물도 위 아래가 있다", 15, 0, "순서를 지키는 것이 좋을 것이다. 다음 속담을 몸으로 표현하라"],
  // ["가재는 게 편이다", 15, 0, "친구는 친구인 이유가 있지, 다음 속담을 몸으로 표현하라"],
  // ["닭 잡아 먹고 오리발 내민다", 15, 0, "다음 속담을 몸으로 표현하라"],
  // ["비 온 뒤에 땅이 굳어진다", 15, 0, "분쟁은 도움이 되기도 한다. 다음 속담을 몸으로 표현하라"],
  // ["지렁이도 밟으면 꿈틀한다", 10, 0, "그들도 마냥 가만히 있지는 않는다. 다음 속담을 몸으로 표현하라"],
  // ["낫놓고 ㄱ 자도 모른다", 10, 0, "보고도 모른다면 답이 없겠지.. 다음 속담을 몸으로 표현하라"],
  // ["낮 말은 새가 듣고 밤 말은 쥐가 듣는다", 15, 0, "그들은 어디서나 너희를 주시한다. 다음 속담을 몸으로 표현하라"],
  // ["하룻강아지 범 무서운 줄 모른다", 10, 0, "겁을 상실한 자들이여.. 다음 속담을 몸으로 표현하라"],
  // ["오르지 못할 나무 쳐다보지도 마라", 15, 0, "그것은 용기인가 객기인기, 다음 속담을 몸으로 표현하라"],
  // ["개천에서 용난다", 15, 0, "들키지 않고 이야기를 전달하라, 다음 속담을 그림으로 표현하라"],
  // ["식은 죽 먹기", 15, 0, "들키지 않고 이야기를 전달하라, 다음 속담을 그림으로 표현하라"],
  // ["가는 말이 고와야 오는 말이 곱다", 15, 0, "들키지 않고 이야기를 전달하라, 다음 속담을 그림으로 표현하라"],
  // ["고래 싸움에 새우 등 터진다", 15, 0, "들키지 않고 이야기를 전달하라, 다음 속담을 그림으로 표현하라"],
  // ["윗 물이 맑아야 아랫물이 맑다", 15, 0, "들키지 않고 이야기를 전달하라, 다음 속담을 그림으로 표현하라"],
  // ['남의 집 잔치에 감놔라 배놔라 한다', 15, 0, "소리를 듣지 못한다면 그림으로 대화하라, 다음 속담을 그림으로 표현하라."],
  // ['방귀 뀐 놈이 성낸다', 15, 0, "소리를 듣지 못한다면 그림으로 대화하라, 다음 속담을 그림으로 표현하라."],
  // ['언 발에 오줌누기', 15, 0, "소리를 듣지 못한다면 그림으로 대화하라, 다음 속담을 그림으로 표현하라."],
  // ['낮 말은 새가 듣고 밤 말은 쥐가 듣는다', 15, 0, "소리를 듣지 못한다면 그림으로 대화하라, 다음 속담을 그림으로 표현하라."],
  // ['달면 삼키고 쓰면 뱉는다', 15, 0, "소리를 듣지 못한다면 그림으로 대화하라, 다음 속담을 그림으로 표현하라."],
  // ['4인 이상 걸그룹 노래 한 소절 부르기', 15, 1, "당신의 존재를 알리기 위해서는 목소리를 내는 것이 좋다."],
  // ['7인 이상 보이그룹 노래 한 소절 부르기', 15, 1, "당신의 존재를 알리기 위해서는 목소리를 내는 것이 좋다."],
  // ['방탄소년단 - 봄날 노래 한 소절 부르기', 15, 1, "당신의 존재를 알리기 위해서는 목소리를 내는 것이 좋다."],
  // ['소녀시대 노래 한 소절 부르기', 15, 1, "당신의 존재를 알리기 위해서는 목소리를 내는 것이 좋다."],


