<p align="center">
  <img src="site/assets/icon.png" width="92" alt="Solenne AI" />
</p>

<h1 align="center">Solenne AI</h1>

<p align="center">
  A VRM companion who shares your desktop. She remembers what you told her,<br />
  has moods of her own, and can co-host a stream with you.
</p>

<p align="center">
  <b>English</b> · <a href="README.ru.md">Русский</a>
</p>

<p align="center">
  <img alt="Platform" src="https://img.shields.io/badge/platform-Windows%20%7C%20Android-7c5cff" />
  <img alt="Avatar" src="https://img.shields.io/badge/avatar-VRM%200.x%20%2F%201.0-e86fa6" />
  <img alt="Local first" src="https://img.shields.io/badge/local--first-LLM%20%2B%20voice-4cc38a" />
  <img alt="License" src="https://img.shields.io/badge/license-proprietary-8b8b96" />
</p>

## Screenshots

<table>
  <tr>
    <td width="50%" valign="top">
      <img src="site/screenshots/main-page.webp" alt="Main window: scene, dialogue and composer" />
      <br /><sub><b>The main window</b> — scene, dialogue and composer in one place.</sub>
    </td>
    <td width="50%" valign="top">
      <img src="site/screenshots/companion.webp" alt="Companion mode over the desktop" />
      <br /><sub><b>Companion mode</b> — a portrait over your desktop; empty areas pass clicks through.</sub>
    </td>
  </tr>
  <tr>
    <td valign="top">
      <img src="site/screenshots/voice-mode.webp" alt="Voice mode: she listens while you speak" />
      <br /><sub><b>Voice mode</b> — speak and she listens, then answers out loud.</sub>
    </td>
    <td valign="top">
      <img src="site/screenshots/status.webp" alt="Closeness, mood, memory and the diary" />
      <br /><sub><b>She is right here</b> — closeness, mood, memory and the diary.</sub>
    </td>
  </tr>
  <tr>
    <td valign="top">
      <img src="site/screenshots/models.webp" alt="Built-in characters and your own VRM" />
      <br /><sub><b>Models and costumes</b> — built-in characters, or your own VRM with outfit layers.</sub>
    </td>
    <td valign="top">
      <img src="site/screenshots/provider.webp" alt="Any OpenAI-compatible provider" />
      <br /><sub><b>Any model</b> — LM Studio, Ollama, Groq, NVIDIA or your own endpoint.</sub>
    </td>
  </tr>
  <tr>
    <td colspan="2" valign="top">
      <img src="site/screenshots/speech-providers.webp" alt="Voice providers" />
      <br /><sub><b>A voice of your choice</b> — Silero on-device, Edge, Fish Audio, ElevenLabs, or your own HTTP endpoint.</sub>
    </td>
  </tr>
</table>

---

## What this is

Solenne AI is a desktop companion built around one VRM character. She stays on the screen as a
full-body avatar: you type or talk, she answers out loud, and she moves while she speaks — lips,
gaze, hands, the way she stands.

No account is involved. The language model runs on your machine (LM Studio, Ollama, or any
OpenAI-compatible server), speech recognition runs on the CPU, and the Russian and English voice
is local as well. Cloud engines are optional and only used with your own key; without one, the
app sends nothing anywhere.

The source code is closed. This repository is the product page: documentation, screenshots and
the website. See [License](#license) for what the builds allow.

---

## Highlights

| | |
|---|---|
| **She remembers, then brings it up** | Tell her about a bad day and three weeks later she asks how that thing at school ended. Small facts live apart from the chat log, so they come back as questions instead of search results. |
| **Mood and a daily caprice** | Closeness grows over weeks; mood changes over hours. On top of both sits one small caprice for the day. She can take offence, go quiet, or be unexpectedly tender for no clear reason. |
| **She keeps living** | Come back after a day away and there is something new: a find, a thought by the window, a plan she wrote down. Plans, diary and events arrive as one feed, not three screens. |
| **She sees what you see** | A screenshot when you ask, a shared window, a glance at the webcam, or a look at her own avatar. Every one of them is a button you press, off by default, and revoked with one click. |
| **A co-host, not a chatbot** | Twitch, YouTube and TikTok chat; a chroma-key window for OBS; solo mode or together mode where she hears your mic and sees your screen. |
| **Two companions, one call** | Invite a second character. Each keeps her own card, voice and memory, and they form an opinion about each other — jealousy included, if you write the cards that way. |

---

## Features

### A character, not a prompt

- Full-body **VRM 0.x / 1.0** avatar with spring-bone physics, blinking, gaze and idle motion.
- **Six built-in characters**, each with her own model, costume, voice and card. Drop any
  `.vrm` onto the window to use yours instead.
- Outfit layers: jacket, top, bottom, tights, shoes, accessories. These are real meshes, so
  the avatar changes rather than describing the change.
- Emotions and gestures are part of the answer: she writes `[emotion:tender]` or
  `[gesture:hug]` and the scene follows.
- A card per character: personality, speech style, backstory, lore, examples and a separate
  18+ block. Cards export and import as JSON.

### Memory that behaves like memory

Three layers, each doing a different job:

1. **Recent dialogue** goes into the prompt verbatim — 36 messages by default, trimmed to fit
   the model's context window.
2. **Structural memory** pulls facts, preferences, events and open threads out of an exchange.
   Duplicates merge; an outdated fact is superseded, not deleted.
3. **Digest, diary and life feed** keep the story: what happened, how she took it, what she
   plans next.

Search over older material stays local: word-stem matching plus a small multilingual ONNX
embedding model (~120 MB, downloaded once, runs in a Web Worker). If you regenerate an answer,
the version you rejected is removed from memory along with the facts it produced — otherwise
she would remember two contradictory versions of the same evening.

### A relationship with state

- **Closeness** grows from days together, conversations, warm moments, remembered facts and
  diary entries. Four stages decide how direct she is allowed to be.
- **Mood** is separate: your wording, her emotions and touch move it, and it drifts back to her
  baseline over about eight hours.
- **The caprice of the day** gives her a reason to be slightly off. It is explained in plain
  words in the "About her" panel, never as points or levels spoken out loud.
- **Offence and reconciliation**: she can take something badly, stay cool for a while, and come
  back when you actually apologise. The panel says why she is upset and has one button that
  sends the apology for you.
- **Rituals**: a morning hello, an evening talk about the day, a quiet nudge if you have been
  silent too long. Each fires once, and never during a call or a stream.
- Touch matters: a kiss, a hug, a stroke, a poke. Each has its own reaction and its own small
  effect on mood.

### Voice

| Engine | Where it runs | Notes |
|---|---|---|
| **Silero** | Local server, offline | Russian and English, the default |
| **Edge TTS** | Microsoft cloud through a local helper | Many voices, free, needs internet |
| **Fish Audio** | Cloud, your key | High quality, paid |
| **ElevenLabs** | Cloud, your key | High quality, paid |
| **Qwen3-TTS** | Your own Colab notebook | Bring your own endpoint |
| **Custom HTTP** | Anything you run | Your server, your rules |

Speech recognition is local as well: hold the mic button (or `Alt` anywhere in Windows) and a
Whisper `small` model (~181 MB, `whisper-rs`) transcribes you on the CPU. Audio is never saved
and never uploaded.

Replies are spoken sentence by sentence as they stream in, so she starts talking before the
whole answer exists. Lip-sync is computed from the real audio (FFT formants), not from text.

### She can see

- **Screenshot on request** — pick a region, one frame goes to the model.
- **Watch together** — she follows a window you choose, comments every few seconds, reacts to
  what changed. Her own app window is never in the list.
- **Live webcam** — a glance every few seconds, a reaction only when something changed, and a
  short text note of what she saw.
- **Screen awareness** in companion mode — a quiet periodic look, with a warning about the cost.
- **Her own portrait** — once per dialogue she gets a render of her avatar, so she knows how she
  looks right now.

Camera and screen are off by default, bound to explicit buttons, and never start with the app.
Frames are not stored; only a short text note survives in memory.

### Streaming

Turn on the stream section and the app becomes a co-host.

- **Chat** from Twitch (anonymous IRC), YouTube live chat, and TikTok through TikFinity or a
  direct URL.
- **Chroma-key window** for OBS: a separate clean window with a flat fill, subtitle bar, its own
  hotkeys and remembered position.
- **Two modes**:
  - *Solo* — she runs the show: greets the chat, reacts to the screen, answers viewers.
  - *Together* — she is on air with you: sees your screen, hears your mic, answers the chat but
    checks with you first ("want to take this one?") and hands the floor back.
- **Events** — new followers, subscriptions and gifts become actions rather than text. Gift
  tiers map to gestures, emotions and spoken thanks.
- **Viewer memory** — regulars are remembered as viewers, so a week later she can ask about the
  thing they promised to bring.
- **Recap and clips** — after the stream she writes a short summary to her diary and marks the
  moments worth clipping.
- A **hotkey** mutes her replies instantly without stopping the broadcast.

### Duo call

Two characters on one line, each with her own card, voice, memory switch and screen presence.
They hear each other, disagree, and keep a relationship value between them — jealousy included,
if that is how the cards are written.

### Minecraft

She joins a server as a bot (Mineflayer, separate process). The model does not micromanage
walking: it picks one task — "get three logs", "craft a workbench", "follow me" — and the bot
carries it out while she keeps talking. Built for local models where thinking takes ten seconds.

### Mobile

The same interface builds for Android (Tauri 2 target): a portrait layout with the avatar in the
middle, subtitles and the composer at the bottom.

### Desktop behaviour

- **Companion mode** — a small always-on-top portrait with click-through empty areas, so you can
  keep working while she stays on screen.
- **Chroma key** inside the main window or as a separate window.
- **Reactions to music** — Windows media session gives title and artist, the output meter gives
  loudness; she sways with the actual volume and sometimes comments on the track.
- **Themes and backgrounds** — six palettes, your own image, gradient rooms and bokeh.
- **Age gate** — date of birth is asked once. Under 18 closes the 18+ parts and tells the model
  your age so it keeps the conversation appropriate.
- Single instance, hotkeys, remembered window position, atomic settings writes with a backup.

---

## Under the hood

A short sketch, because it explains the choices above:

- **Shell**: Tauri 2 (Rust) + React + TypeScript, WebView2, three.js via `@pixiv/three-vrm`.
- **Rust side**: window management, model container decryption, camera and microphone access,
  Whisper, global hotkeys, media session, single-instance guard.
- **Speech**: a streaming sentence queue with cancellation, a synthesis breaker and one adapter
  per engine. With the local engine, audio never leaves the machine.
- **Memory**: lexical and embedding retrieval, structural extraction, digest and diary, all in
  one `settings.json` written atomically with a copy of the previous version.
- **Models**: bundled characters ship in an encrypted container (`AES-256-GCM`) and are decrypted
  into memory at load time. No plain `.vrm` is written to disk.
- **Tests**: about 740 unit tests over prompt building, memory, closeness and mood rules, the TTS
  queue, LLM streaming and UI helpers.

---

## Comparison

Checked against the public documentation in **October 2026**. "Not found" means "not confirmed
in the official docs", not "does not exist". All of these projects are good at something; the
point of the table is which tool fits which job.

| | **Solenne AI** | [AIRI](https://github.com/moeru-ai/airi) | [Open-LLM-VTuber](https://github.com/Open-LLM-VTuber/Open-LLM-VTuber) | [Amica](https://github.com/semperai/amica) | [Warudo](https://store.steampowered.com/app/2079120/Warudo/) |
|---|---|---|---|---|---|
| What it is | Desktop companion app | Open companion platform | Open VTuber front-end | Open web/desktop companion | 3D VTubing studio |
| Desktop app | **Windows** | Windows, macOS, Linux | Windows, macOS, Linux | Windows, macOS, Linux | Windows |
| Native mobile | **Android target** | Experimental pocket app | Not found | Web on phone | Not applicable |
| 3D avatar | **VRM 0.x / 1.0** | VRM + Live2D | Live2D only | VRM | VRM, .warudo |
| Local LLM | **LM Studio, Ollama, any OpenAI-compatible** | Many providers incl. local | Many providers incl. local | Many providers incl. local | — |
| Offline voice | **Silero (RU/EN)** | Kokoro and cloud engines | Many local engines | Coqui, Kokoro | — |
| Long-term memory | **Facts, digest, diary, semantic search** | Alaya is WIP | Disputed: the README removes Letta | Compressed logs | — |
| Mood / offence / caprice | **Yes** | Expressions only | Expressions only | Expressions only | Expressions only |
| Life between sessions | **Yes** | Not found | Not found | Amica Life (alpha) | — |
| Screen understanding | **Screenshot, watch together, awareness** | Screen capture | Yes | Vision, webcam | — |
| Webcam | **Yes, live mode** | Not confirmed | Yes | Yes | Face tracking (no AI) |
| Stream chat | **Twitch, YouTube, TikTok** | Not found | Bilibili | Not found | Twitch, YouTube, Bilibili |
| Two companions on one call | **Yes** | Not found | Yes | Not found | — |
| Minecraft | **Yes, as a bot** | Yes, parts WIP | Not found | Not found | — |
| License | Proprietary | MIT | MIT | MIT | Free for personal use |

**Where the others are stronger:** AIRI also does Live2D, runs on macOS and Linux, and has a much
longer provider list; Open-LLM-VTuber has more local TTS engines, Linux support and group chat
with several characters at once; Amica opens in a browser with nothing to install; Warudo is a far
deeper VTubing studio with props, lighting and full-body tracking. Solenne AI is Windows and
Android, VRM only, closed source — the trade is one opinionated experience: one window, one
character, one relationship.

---

## Requirements

**Desktop**

- Windows 10/11 (64-bit) with WebView2.
- A language model: LM Studio, Ollama, or any OpenAI-compatible endpoint, cloud or your own
  tunnel. A GPU is strongly recommended; a 7–8B model at Q4 is a comfortable baseline.
- For the local voice, a one-time Silero download, plus ~181 MB for the Whisper recognition model.

**Mobile**

- Android 8.0+, and a reachable LLM/TTS endpoint on your network.

---

## Download

Builds ship as a portable folder: `companion.exe` and the encrypted model container. No
installer, no admin rights.

- **Portable archive:** [Solenne-AI-Portable.zip](https://github.com/Stamir36/solenne-ai/releases/latest/download/Solenne-AI-Portable.zip)
  — always the latest release.
- **All builds:** [Releases](https://github.com/Stamir36/solenne-ai/releases).
- The archive contains no plain `.vrm` files and no source code.

---

## FAQ

**Which model should I use?**
Any OpenAI-compatible one. Locally, a quantised 7–12B model is the sweet spot for a desktop GPU.
The app shows the real prompt size and trims history to the context window you set, so 6k works
too: the character card and memory stay whole.

**Does it phone home?**
No. Without a cloud key there is no outbound traffic at all — the model, the voice, the embedding
search and the memory are local.

**Is my chat uploaded?**
Only to the endpoint you configured. Memory search, embeddings, voice and the diary are computed
on the device.

**Why is there an age gate?**
Because the app has an 18+ character mode, outfit controls and intimacy. Date of birth is asked
once; for a minor those parts are closed, and the model is told the age so it keeps the
conversation appropriate.

**Can I use my own character?**
Yes. Drop a `.vrm` onto the window, then edit the card. The name, costume and supported layers are
read from the file.

**Can I stream with it?**
Yes: OBS plus the chroma-key window, Twitch/YouTube/TikTok chat, and two modes — she runs the show
alone, or co-hosts while seeing your screen and hearing your microphone.

---

## License

**Proprietary, all rights reserved.** See [LICENSE](LICENSE).

You may download and use the application for personal purposes. Redistribution, publishing
modified builds, reverse engineering, extracting bundled assets, or presenting the project as your
own are not permitted.

The website in this repository (the `site` folder: `index.html`, `styles.css`, `app.js`,
screenshots) is provided for reference only.

Bundled 3D characters belong to their authors and are licensed to the project; they are not part of
this repository.

Screenshots show characters by their authors: Nayu (ぷらすわん), Rufina (蛸乃ゆえ / Takono Yue),
EME (Meidollia-Dolls), Selestia (STUDIO JINGO), Rindo and Manuka.

---

<p align="center">
  <sub>Solenne AI by Stamir36 — one window, one character, one relationship.</sub>
</p>
