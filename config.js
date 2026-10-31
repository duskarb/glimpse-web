// Glimpse web — 설정
// API 키는 여기에 쓰지 마세요 (레포가 공개라 노출됩니다).
// 전시 컴퓨터에서 setup.html 을 열어 A, B 키와 모델을 넣으면 그 브라우저에만 저장됩니다.

window.GLIMPSE = {
  // setup.html 에서 고르지 않았을 때 쓰는 기본 모델
  MODEL_A: 'gemini-2.5-flash',
  MODEL_B: 'gemini-2.5-flash-lite',
  SYSTEM_A: 'Reply in fewer than three sentences.',
  SYSTEM_B: 'Reply in fewer than three sentences.',
  MAX_SENTENCES: 2,      // 지시를 어겨도 화면에는 완성된 문장 최대 2개까지만
  MAX_TOKENS: 350,       // 한 발화 최대 길이. 문장이 중간에 잘리지 않도록 넉넉하게
  TURNS: 5,              // A, B 각각 5번 = 10발화
  CONTEXT_WINDOW: 10,
  SESSION_MAX_MS: 100000, // 세션 상한. 끝난 뒤 HOLD + 페이드까지 2분 미만
  CHAR_MS: 35,           // 글자당 최대 지연. 글이 길면 세션 안에 끝나도록 자동으로 빨라짐
  PAUSE_MS: 800,         // 발화 사이 쉬는 시간
  HOLD_MS: 12000,        // 끝난 뒤 결과를 보여주는 시간
  MAX_INPUT: 200,
  // 폰 → 전시 화면 중계 (ntfy.sh 공개 pub/sub, 서버 불필요)
  RELAY: 'https://ntfy.sh',
};
