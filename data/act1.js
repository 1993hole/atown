/* 자동 생성: act1.json → window.DATA_ACT1 (file:// 더블클릭 대응)
   대사·데이터 수정은 이 파일을 직접 편집하세요. */
window.DATA_ACT1 = {
  "id": "act1",
  "title": "ACT 1",
  "start": "opening",

  "hub": {
    "background": "manor_entrance_night",
    "title": "그레이번 저택",
    "subtitle": "손님들과 인사를 나눠라",
    "locations": [
      { "id": "ballroom", "name": "연회장",   "bg": "ballroom_full_night", "talks": ["talk_lucian", "talk_celeste", "talk_iris"] },
      { "id": "hall",     "name": "홀",       "bg": "hall_night",          "talks": ["talk_vera", "talk_reaper", "talk_silas"] },
      { "id": "bar",      "name": "바 코너",  "bg": "bar_corner_night",    "talks": ["talk_oli", "talk_tommy"] }
    ],
    "onComplete": "murder"
  },

  "scenes": {

    "opening": {
      "beats": [
        { "bg": "manor_exterior_night", "bgm": "ambient" },
        { "text": "10월 31일, 밤." },
        { "text": "그레이번 저택이 언덕 위에서 빛을 내뿜고 있다." },
        { "text": "유리창 너머로 음악 소리가 흘러나온다." },
        { "text": "오늘 밤은 저택의 주인인 에드먼드 블랙우드가 할로윈 파티를 연 날이다." },

        { "bg": "manor_entrance_night" },
        { "text": "문이 열리기도 전에, 먼저 말을 건네는 사람이 있다." },
        { "who": "lucian", "text": "그레이번 저택에 오신 것을 환영합니다." },
        { "who": "lucian", "text": "저는 집사 루시안 보스입니다." },
        { "who": "player", "text": "안녕하세요." },
        { "who": "lucian", "emote": "smile", "text": "저택이 넓죠? 제가 있다면 이 저택에서 길을 잃는 일은 없을 거예요." },
        { "who": "lucian", "text": "저택 위쪽은 파티 공간이 아니기 때문에, 그쪽으론 가지 않으시는 게 좋습니다." },
        { "who": "lucian", "text": "주인께서 곧 연설을 시작하실 겁니다. 연회장으로 안내해 드리죠." },

        { "bg": "ballroom_full_night", "bgm": "party" },
        { "text": "연회장은 호박과 촛불, 그리고 맛있는 음식들로 가득하다." },
        { "text": "할로윈 코스튬을 입은 손님들이 잔을 기울이며 대화를 나누는 모습이 보인다." },
        { "text": "그 중심에 저택의 주인인 에드먼드 블랙우드가 서 있다." },
        { "who": "edmund", "text": "여러분, 그레이번 저택에 오신 것을 환영합니다." },
        { "who": "edmund", "text": "할로윈은 경계가 사라지는 밤입니다." },
        { "who": "edmund", "text": "죽은 것과 산 것, 감춰진 것과 드러난 것. 오늘 밤만큼은, 모든 가면이 허락됩니다." },
        { "who": "edmund", "emote": "smile", "text": "모두 즐거운 시간이 되길 바랍니다." },
        { "text": "박수가 터진다. 할로윈 파티에 어울리는 우아하고 분위기 있는 인사말이다." },
        { "quest": { "action": "start", "id": "M1-1", "label": "손님들과 인사를 나눠라" } },
        { "hub": true }
      ]
    },

    "talk_lucian": {
      "beats": [
        { "bg": "ballroom_corner_night" },
        { "who": "lucian", "text": "불편한 점은 없으십니까?" },
        { "who": "player", "text": "네, 덕분에요. 굉장히 능숙하시네요. 이 저택에서 오래 일하셨나요?" },
        { "who": "lucian", "text": "10년이 됐습니다." },
        { "who": "player", "text": "긴 시간이네요." },
        { "who": "lucian", "text": "길다면 길고, 짧다면 짧은 시간이죠. 필요한 것이 있으시다면 언제든 불러주세요." },
        { "text": "당연한 집사의 말처럼 들린다." },
        { "hub": true }
      ]
    },

    "talk_celeste": {
      "beats": [
        { "bg": "ballroom_full_night" },
        { "who": "celeste", "emote": "smile", "text": "어머, 처음 보는 얼굴! 셀레스트 듀퐁이에요." },
        { "who": "player", "text": "안녕하세요. 에드먼드 씨와는 어떻게 아시는 사이예요?" },
        { "who": "celeste", "emote": "smile", "text": "오래된 지인이죠. 매년 이 파티에 초대해 준답니다!" },
        { "who": "celeste", "emote": "dark", "text": "(목소리를 낮추며) 있잖아요, 매년 올 때마다 궁금했어요." },
        { "who": "celeste", "emote": "dark", "text": "저 위 다락, 예전에 누군가 사라졌다는 소문이 있거든요." },
        { "who": "celeste", "emote": "dark", "text": "몇 년째 파티를 오지만 저 쪽을 가봤다는 사람은 못 봤어요. 집사가 제지한다나." },
        { "choice": "", "options": [
          { "label": "“그런 얘기, 할로윈 밤에 어울리네요.” (가볍게 받기)", "then": [
            { "who": "celeste", "emote": "smile", "text": "그쵸? 그냥 분위기 맞춘 얘기일 거예요." },
            { "text": "가볍게 웃으며 화제를 돌린다." }
          ] },
          { "label": "“사라진 분은 어떤 분이었어요?” (호기심)", "then": [
            { "who": "celeste", "emote": "dark", "text": "음… 자세히는 모르겠지만, 그 청년 — 마지막에 누군가에게 편지를 쓰고 있었대요." },
            { "who": "celeste", "text": "이름이 뭐였더라… 잊었네요. 옛날 얘기예요." },
            { "text": "가볍게 웃으며 화제를 돌린다." },
            { "note": { "title": "셀레스트의 증언", "body": "예전에 다락에서 청년 하나가 사라졌다는 소문. 마지막에 누군가에게 편지를 쓰고 있었다고 한다." } }
          ] }
        ] },
        { "hub": true }
      ]
    },

    "talk_iris": {
      "beats": [
        { "bg": "ballroom_entrance_night" },
        { "who": "iris", "text": "안녕하세요, 아이리스 베인입니다. 포토그래퍼예요." },
        { "who": "player", "text": "안녕하세요. 오늘 파티 기록을 맡으신 건가요?" },
        { "who": "iris", "text": "네. 에드먼드 씨 측에서 연례 파티 촬영 의뢰가 들어왔어요." },
        { "who": "player", "text": "이런 자리는 자주 찍으세요?" },
        { "who": "iris", "text": "할로윈 파티는 처음이에요. 뭐, 피사체만 좋으면 상관없죠." },
        { "text": "군더더기 없는 대답이다." },
        { "hub": true }
      ]
    },

    "talk_oli": {
      "beats": [
        { "bg": "bar_corner_night" },
        { "who": "oli", "emote": "smile", "text": "오! 처음 뵙겠습니다! 올리 파이크예요." },
        { "who": "player", "text": "안녕하세요. 에드먼드 씨와는 어떻게 아시는 사이예요?" },
        { "who": "oli", "text": "그레이번 지역 교회를 맡고 있어요. 에드먼드 씨가 종종 행사에 후원을 해주셔서 알게 됐죠." },
        { "who": "player", "text": "목사님이세요?" },
        { "who": "oli", "emote": "smile", "text": "하하, 맞아요. 그런데 있잖아요, 목사 일이라는 게 사람 얘기를 워낙 많이 듣다 보니까." },
        { "who": "oli", "emote": "dark", "text": "오늘 여기 모인 분들, 다들 뭔가 관계가 있는 것 같지 않아요? 제가 사람 보는 눈은 좀 있거든요." },
        { "text": "유쾌하고 붙임성 있는 사람이다." },
        { "hub": true }
      ]
    },

    "talk_vera": {
      "beats": [
        { "bg": "hall_window_night" },
        { "text": "흡혈귀 코스튬의 여자가 와인을 들고 창밖을 바라보고 있다." },
        { "who": "vera", "emote": "smile", "text": "어머, 처음 뵙는 얼굴이네요. 베라 애쉬모어예요." },
        { "who": "player", "text": "안녕하세요. 파티에 처음 왔는데, 분위기가 정말 좋네요." },
        { "who": "vera", "emote": "smile", "text": "에드먼드 씨 파티는 항상 이렇거든요. 매년 초대받는 게 감사하죠." },
        { "who": "player", "text": "에드먼드 씨와는 오래된 사이이신가요?" },
        { "who": "vera", "text": "(와인잔을 잠시 내려다보며) …네, 뭐, 오래됐죠." },
        { "who": "player", "text": "좋은 분인가요?" },
        { "who": "vera", "emote": "smile", "text": "훌륭한 분이에요. 이런 자리를 만들어주시는 것만 봐도 알 수 있잖아요." },
        { "text": "짧은 침묵이 있었던 것 같다." },
        { "choice": "", "options": [
          { "label": "자연스럽게 화제를 돌린다 — “오늘 분위기 정말 멋지네요.”", "then": [
            { "who": "vera", "emote": "smile", "text": "그렇죠? 매년 이렇답니다." },
            { "text": "대화가 가볍게 흘러간다." }
          ] },
          { "label": "살짝 캐묻는다 — “방금, 잠깐 무슨 생각을 하셨어요?”", "then": [
            { "who": "vera", "text": "(잔을 한 번 더 내려다보며) …아무것도 아니에요." },
            { "who": "vera", "emote": "smile", "text": "(다시 미소) 그냥, 잠시 옛 생각을 했을 뿐이에요." },
            { "text": "그 미소는 흠 잡을 데 없이 완벽하다. 하지만 그 짧은 침묵만큼은 기억에 남는다." },
            { "note": { "title": "베라의 빈틈", "body": "에드먼드 이야기에 잠시 말이 끊겼다. 완벽한 미소 뒤의 짧은 침묵." } }
          ] }
        ] },
        { "hub": true }
      ]
    },

    "talk_reaper": {
      "beats": [
        { "bg": "hall_corner_night" },
        { "text": "사신 풀코스튬의 인물이 홀 구석에 홀로 서 있다." },
        { "text": "후드 속에 얼굴이 보이지 않는다." },
        { "who": "player", "text": "인사드려도 될까요?" },
        { "who": "reaper", "text": "…" },
        { "who": "player", "text": "에드먼드 씨 지인이신가요?" },
        { "who": "reaper", "text": "그렇게 볼 수도 있죠." },
        { "who": "player", "text": "코스튬이 꽤 철저하네요." },
        { "who": "reaper", "text": "오늘 밤엔 모든 가면이 허락된다고 하지 않았나요." },
        { "text": "그 말을 끝으로 돌아선다. 이름도 묻지 않았다." },
        { "hub": true }
      ]
    },

    "talk_silas": {
      "beats": [
        { "bg": "hall_night" },
        { "who": "silas", "text": "처음 보는 얼굴이군요. 사일러스 그랜트입니다." },
        { "who": "player", "text": "안녕하세요, 에드먼드 씨와는 어떤 관계로 오셨나요?" },
        { "who": "silas", "text": "예전에 에드먼드 씨의 주치의였어요." },
        { "who": "player", "text": "지금은요?" },
        { "who": "silas", "text": "다른 일을 합니다." },
        { "text": "시선이 잠깐 베라 쪽을 향한다." },
        { "choice": "", "options": [
          { "label": "그 시선을 모른 척한다 (가볍게 넘김)", "then": [
            { "text": "대화는 그쯤에서 끝난다." }
          ] },
          { "label": "“베라 씨와 아는 사이세요?” (시선을 짚는다)", "then": [
            { "who": "silas", "text": "(잠시 정적) …오래된 지인이죠. 사교계가 그렇잖아요." },
            { "who": "silas", "emote": "smile", "text": "그게 다예요." },
            { "text": "그의 미소는 평온하지만, 너무 빠르게 정돈된 답이다." },
            { "note": { "title": "사일러스–베라 연결", "body": "사일러스의 시선이 베라를 향했다. 둘은 그저 ‘사교계 지인’이라고 한다 — 너무 빠르게 정돈된 대답." } }
          ] }
        ] },
        { "hub": true }
      ]
    },

    "talk_tommy": {
      "beats": [
        { "bg": "bar_corner_night" },
        { "who": "tommy", "text": "(술잔을 들며) 토미 펜이에요." },
        { "who": "player", "text": "안녕하세요. 이 파티는 어떻게 오셨어요?" },
        { "who": "tommy", "text": "그냥 아는 사람 따라왔어요." },
        { "who": "player", "text": "즐기고 계신 것 같진 않아 보이는데요." },
        { "who": "tommy", "text": "피곤해서요." },
        { "text": "술을 한 모금 더 마신다. 말이 끊긴다." },
        { "choice": "", "options": [
          { "label": "그냥 자리를 비킨다 (가볍게 지나감)", "then": [
            { "text": "가볍게 인사하고 자리를 옮긴다." }
          ] },
          { "label": "“기분이 좀 나아지셨으면 좋겠네요.” (다정한 한마디)", "then": [
            { "text": "토미가 한순간 고개를 든다." },
            { "who": "tommy", "text": "…고마워요." },
            { "text": "짧은 대답이지만, 그의 눈빛이 잠시 부드러워졌다." }
          ] }
        ] },
        { "hub": true }
      ]
    },

    "murder": {
      "beats": [
        { "bg": "ballroom_full_night" },
        { "text": "파티의 분위기는 무르익어가고, 모두가 대화의 꽃을 피우는 시간." },
        { "text": "순간, 불이 꺼진다." },
        { "blackout": true },
        { "text": "무언가 땅에 떨어지는 둔탁한 소리…" },
        { "bg": "corridor_crime_scene_night_red" },
        { "blackout": false },
        { "text": "불이 켜진다." },
        { "text": "에드먼드 블랙우드가 복도 끝에 쓰러져 있다." },
        { "text": "가슴 한가운데에는 낯선 문양이 새겨진 단검이 깊이 박혀 있다." },
        { "text": "복부 위로는 두 손등이 마주하고 있고, 다리는 가지런히 모여 있다. 우연히 쓰러진 자세가 아니다." },
        { "text": "그의 옆에는 접힌 쪽지가 하나 놓여 있다." },
        { "who": "tommy", "emote": "surprised", "text": "흐으, 흐으아아아악!" },
        { "who": "celeste", "emote": "surprised", "text": "세상에... 에드먼드가...!" },
        { "who": "silas", "emote": "tense", "text": "(시신 옆에 무릎을 꿇으며) …사망은 확실합니다." },
        { "quest": { "action": "start", "id": "M1-2", "label": "현장을 조사하라" } },
        { "goto": "lockdown" }
      ]
    },

    "lockdown": {
      "beats": [
        { "bg": "corridor_night" },
        { "who": "lucian", "text": "잠깐, 모두 진정하십시오." },
        { "who": "lucian", "emote": "tense", "text": "저택의 모든 출입구는 제가 봉쇄했습니다." },
        { "who": "lucian", "emote": "tense", "text": "이곳에서 아무도 떠날 수 없습니다." },
        { "who": "oli", "text": "잠깐! 이런 거라면 제가—" },
        { "who": "lucian", "emote": "tense", "text": "파이크 씨." },
        { "text": "짧은 한마디에 올리가 멈춘다." },
        { "who": "lucian", "text": "또 다른 사상자가 나오지 않도록, 모두 섣불리 행동하지 말아주십시오." },
        { "who": "silas", "emote": "tense", "text": "이런 상황에서 가만히 있으란 말입니까!" },
        { "who": "vera", "emote": "tense", "text": "그래요, 이래선 아무것도 해결이 되지 않아요. 뭔가를 해야만…" },
        { "who": "lucian", "text": "알겠습니다. 그럼 일단 이 주변을 조사해보죠." },
        { "goto": "investigate" }
      ]
    },

    "investigate": {
      "beats": [
        { "bg": "corridor_crime_scene_night" },
        { "text": "에드먼드가 발견된 복도. 루시안이 이미 구역을 정리해두고 있다." },
        { "who": "lucian", "text": "발견된 순서 그대로 손대지 않았습니다." },
        { "who": "player", "text": "감사합니다." },
        { "text": "가슴에 박힌 단검을 자세히 본다." },
        { "clue": "ritual_dagger" },
        { "text": "다시 시신을 살핀다. 두 손등이 마주하고, 다리는 가지런히 모여 있다. 누군가 일부러 자세를 잡아둔 듯한 배치다." },
        { "clue": "body_arrangement" },
        { "text": "그리고 에드먼드의 손 근처에 접힌 쪽지가 하나 있다. 펼쳐본다." },
        { "text": "“오늘 밤이 끝나기 전에 모든 게 제자리를 찾을 겁니다.”" },
        { "text": "빠르게 흘려 썼지만 일정한 리듬이 있는 필체다." },
        { "clue": "folded_note" },
        { "quest": { "action": "complete", "id": "M1-2", "label": "현장을 조사하라" } },
        { "unlockUI": true },
        { "goto": "reflection" }
      ]
    },

    "reflection": {
      "beats": [
        { "bg": "ballroom_corner_night", "bgm": "reflection" },
        { "text": "소란이 가라앉고, 잠시 혼자 남는다." },
        { "text": "수사 노트를 펼친다." },
        { "text": "…단서가 두 개. 단검의 문양은 본 적이 없다." },
        { "text": "자세는 — 일부러 잡아둔 것처럼 가지런했다." },
        { "text": "그리고 쪽지. “오늘 밤이 끝나기 전에 모든 게 제자리를 찾을 겁니다.”" },
        { "text": "이 글씨, 어디서 본 것 같은데. 아직은 모르겠다." },
        { "text": "일단 조사를 더 해봐야 한다." },
        { "text": "수사 노트를 덮는다." },
        { "end": true }
      ]
    }

  }
};
