// Glimpse — Gemini 중계. 키(KEY_A, KEY_B)는 Cloudflare 비밀값에만 있다.
// POST { speaker: 'A'|'B', model, system, prompt, maxTokens } → { text }

const MODEL = /^(gemini|gemma)-[\w.-]{1,60}$/;

export default {
  async fetch(req, env) {
    const origin = req.headers.get('Origin') || '';
    const allowed = env.ALLOWED_ORIGINS.split(',').includes(origin);
    const cors = {
      'Access-Control-Allow-Origin': allowed ? origin : 'null',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Vary': 'Origin',
    };
    const reply = (body, status = 200) => new Response(JSON.stringify(body),
      { status, headers: { ...cors, 'Content-Type': 'application/json' } });

    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (!allowed) return reply({ error: 'origin not allowed' }, 403);
    if (req.method !== 'POST') return reply({ error: 'POST only' }, 405);

    let b;
    try { b = await req.json(); } catch (_) { return reply({ error: 'bad json' }, 400); }
    const key = { A: env.KEY_A, B: env.KEY_B }[b.speaker];
    if (!key) return reply({ error: `no key for speaker ${b.speaker}` }, 500);
    if (!MODEL.test(b.model || '')) return reply({ error: 'bad model' }, 400);
    const system = String(b.system || '').slice(0, 500);
    const prompt = String(b.prompt || '').slice(0, 8000);
    const maxTokens = Math.min(Math.max(Number(b.maxTokens) || 350, 16), 1000);

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${b.model}:generateContent`;
    const post = body => fetch(url, { method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key }, body: JSON.stringify(body) });
    let res = await post({
      systemInstruction: { parts: [{ text: system }] },
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { maxOutputTokens: maxTokens, thinkingConfig: { thinkingBudget: 0 } },
    });
    if (res.status === 400) {  // system instruction이나 thinkingConfig를 받지 않는 모델 (Gemma 등)
      res = await post({
        contents: [{ role: 'user', parts: [{ text: `${system}\n\n${prompt}` }] }],
        generationConfig: { maxOutputTokens: maxTokens },
      });
    }
    const j = await res.json().catch(() => ({}));
    if (!res.ok) return reply({ error: `${b.model}: ${res.status} ${j.error?.message || ''}` }, 502);
    const parts = j.candidates?.[0]?.content?.parts || [];
    return reply({ text: parts.filter(p => !p.thought).map(p => p.text || '').join('').trim() });
  },
};
