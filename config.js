// Glimpse web — 설정
// Gemini API 키는 여기에 쓰지 마세요 (레포가 공개라 노출됩니다).
// 전시 컴퓨터에서 한 번만 index.html?key=YOUR_KEY 로 열면 그 브라우저에만 저장됩니다.

window.GLIMPSE = {
  MODEL_A: 'gemini-2.5-flash',
  MODEL_B: 'gemini-2.5-flash-lite',
  SYSTEM_A: 'Reply in one sentence.',
  SYSTEM_B: 'Reply in one sentence.',
  TURNS: 5,              // A, B 각각 5번 = 10문장
  CONTEXT_WINDOW: 10,
  SESSION_MAX_MS: 110000, // 세션 상한 (2분 미만)
  CHAR_MS: 35,           // 글자당 그리는 속도
  PAUSE_MS: 1500,        // 문장 사이 쉬는 시간
  HOLD_MS: 12000,        // 끝난 뒤 결과를 보여주는 시간
  MAX_INPUT: 200,
  // 폰 → 전시 화면 중계 (ntfy.sh 공개 pub/sub, 서버 불필요)
  RELAY: 'https://ntfy.sh',
};
