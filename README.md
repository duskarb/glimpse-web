# Glimpse (web)

A person scans the QR code, writes one sentence on their phone, and steps back.
Two Gemini models talk to each other on the exhibition screen. Their sentences pile up at random positions.

- `index.html`: the exhibition screen (QR → session → back to QR)
- `input.html`: the phone input page (opened from the QR)
- `config.js`: models, turn count, speed

## Gemini API key

Do not put the key in the repo. On the exhibition computer, open this once:

```
https://duskarb.github.io/<repo>/?key=YOUR_GEMINI_KEY
```

The key is saved in that browser's localStorage and removed from the address bar.
Phones never see it.
In Google AI Studio / Cloud Console, restrict the key with an HTTP referrer of `https://duskarb.github.io/*`.

## Phone → screen relay

Uses the public [ntfy.sh](https://ntfy.sh) pub/sub. No server needed.
Each exhibition computer gets a random room id (saved in localStorage). It is encoded in the QR.
To fix the room id, use `?room=myroom`.
