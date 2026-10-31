# Glimpse (web)

A person scans the QR code, writes one sentence on their phone, and steps back.
Two Gemini models talk to each other on the exhibition screen. Their sentences pile up at random positions.

- `index.html`: the exhibition screen (QR → session → back to QR)
- `input.html`: the phone input page (opened from the QR)
- `config.js`: models, turn count, speed

## Gemini API keys (A and B separately)

Do not put keys in the repo. They live only as secrets of the Cloudflare Worker in `worker/`,
so any computer can open the screen with no setup:

```
cd worker
npx wrangler secret put KEY_A
npx wrangler secret put KEY_B
```

Each command asks for the key and stores it in Cloudflare. To change a key, run it again.
Models are set in `config.js` (`MODEL_A`, `MODEL_B`). The Worker only answers requests from
`ALLOWED_ORIGINS` in `worker/wrangler.toml`. Deploy Worker changes with `npx wrangler deploy` in `worker/`.

`setup.html` still works as a per-browser override: a key saved there is called directly, without the Worker.

## Phone → screen relay

Uses the public [ntfy.sh](https://ntfy.sh) pub/sub. No server needed.
Each exhibition computer gets a random room id (saved in localStorage). It is encoded in the QR.
To fix the room id, use `?room=myroom`.
