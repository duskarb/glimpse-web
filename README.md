# Glimpse (web)

A person scans the QR code, writes one sentence on their phone, and steps back.
Two Gemini models talk to each other on the exhibition screen. Their sentences pile up at random positions.

- `index.html`: the exhibition screen (QR → session → back to QR)
- `input.html`: the phone input page (opened from the QR)
- `config.js`: models, turn count, speed

## Gemini API keys (A and B separately)

Do not put keys in the repo. On the exhibition computer, open

```
https://duskarb.github.io/glimpse-web/setup.html
```

Enter a key for speaker A and one for speaker B (ideally from two different Google projects),
press "모델 목록 불러오기" to list the models each key can use, pick one per speaker, save, then "테스트".
Keys are saved only in that browser's localStorage. Phones never see them.
Restrict each key with an HTTP referrer of `https://duskarb.github.io/*`.

## Phone → screen relay

Uses the public [ntfy.sh](https://ntfy.sh) pub/sub. No server needed.
Each exhibition computer gets a random room id (saved in localStorage). It is encoded in the QR.
To fix the room id, use `?room=myroom`.
