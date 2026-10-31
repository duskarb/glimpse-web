// Glimpse web — 설정
// API 키는 여기에 쓰지 마세요 (레포가 공개라 노출됩니다).
// 키는 Cloudflare Worker 비밀값으로 넣습니다 (README 참고). 모델은 아래 MODEL_A, MODEL_B 로 바꿉니다.

window.GLIMPSE = {
  // 화자별 모델 (setup.html 에서 이 브라우저만 따로 바꿀 수도 있음)
  MODEL_A: 'gemini-3.5-flash',
  MODEL_B: 'gemini-3.5-flash',
  SYSTEM_A: 'Reply in fewer than three sentences.',
  SYSTEM_B: 'Reply in fewer than three sentences.',
  MAX_SENTENCES: 2,      // 지시를 어겨도 화면에는 완성된 문장 최대 2개까지만
  MAX_TOKENS: 350,       // 한 발화 최대 길이. 문장이 중간에 잘리지 않도록 넉넉하게
  TURNS: 10,             // A, B 각각 10번 = 20발화
  CONTEXT_WINDOW: 10,
  SESSION_MAX_MS: 285000, // 세션 상한. 끝난 뒤 HOLD + 페이드까지 5분 이내
  CHAR_MS: 35,           // 글자당 최대 지연. 글이 길면 세션 안에 끝나도록 자동으로 빨라짐
  PAUSE_MS: 800,         // 발화 사이 쉬는 시간
  HOLD_MS: 12000,        // 끝난 뒤 결과를 보여주는 시간
  MAX_INPUT: 200,
  // Gemini 키를 들고 있는 Cloudflare Worker (worker/ 폴더). 키는 Worker 비밀값에만 있다
  PROXY: 'https://glimpse-speak.prism011312.workers.dev',
  // 폰 → 전시 화면 중계 (ntfy.sh 공개 pub/sub, 서버 불필요)
  RELAY: 'https://ntfy.sh',
};
