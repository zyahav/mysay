# mysay CLI - Development Handoff Document

**Date:** 2025-11-28  
**Version:** 1.0.0  
**Status:** ✅ Phase 1 Complete  

---

## Project Overview

**mysay** is a CLI tool that enables AI agents to communicate with developers via voice (TTS) and visual emoji overlays. It uses ElevenLabs for speech synthesis and supports different voice "personalities" for different situations.

### Why This Exists

When AI agents work with developers, text responses can be missed. Voice notifications ensure the developer hears important updates. Different voice personalities and emoji overlays make it instantly clear what type of message it is.

---

## Current State (✅ COMPLETE)

### Project Location
```
/Users/zyahav/Documents/dev/mysay/
```

### Project Structure
```
mysay/
├── bin/
│   ├── mysay              # Main CLI script (bash)
│   └── emoji-pop          # Emoji overlay launcher (bash)
├── emoji-overlay/         # Electron app for floating emojis
│   ├── index.js           # Electron main process
│   ├── package.json       # Dependencies (electron)
│   └── node_modules/      # (after npm install)
├── docs/
│   ├── HANDOFF.md         # This file
│   ├── AGENT_PROMPT.md    # Instructions for AI agents
│   └── AGENT_ONBOARDING.md # Agent onboarding spec
├── templates/
│   └── DEVELOPER_PROFILE.md # User preferences template
├── .mysay.example         # Config template
├── .gitignore
├── install.sh             # Installation script
└── README.md
```

### Features Implemented

| Feature | Status | Description |
|---------|--------|-------------|
| ElevenLabs TTS | ✅ | Uses eleven_v3 model |
| 6 Voice Personalities | ✅ | done, question, start, error, idea, hi |
| Hebrew Support | ✅ | With nikud pronunciation |
| English Support | ✅ | Via --en flag |
| Emoji Overlay | ✅ | Zoom-style floating emojis |
| Config System | ✅ | ~/.mysay, ~/.config/mysay/config |
| Linux Audio | ✅ | mpv/aplay fallback |
| Help System | ✅ | --help, --version |
| Install Script | ✅ | ./install.sh |

---

## Installation

```bash
# Clone/navigate to project
cd /Users/zyahav/Documents/dev/mysay

# Run installer
./install.sh

# Add ElevenLabs API key
nano ~/.config/mysay/config

# Test
mysay --hi "שלום!"
```


---

## Technical Details

### Voice Personalities

| Flag | Emoji | Use Case | Voice ID |
|------|-------|----------|----------|
| `--done`, `-d` | 🎉 | Task complete | 4tRn1lSkEn13EVTuqb0g |
| `--question`, `-q` | ❓ | Need help | YOq2y2Up4RgXP2HyXjE5 |
| `--start`, `-s` | 🚀 | Starting work | si0svtk05vPEuvwAW93c |
| `--error`, `-e` | 🐛 | Problem/bug | flHkNRp1BlvT73UL6gyz |
| `--idea`, `-i` | 💡 | Suggestion | weA4Q36twV5kwSaTEL0Q |
| `--hi`, `-h` | 👋 | Greeting | Z7RrOqZFTyLpIlzCgfsp |
| `--en` | 🇺🇸 | English | IdfCM5gzYj8bcGLVUBAH |
| (default) | 🇮🇱 | Hebrew | 4H1tDNxkPIwJmpnc3x2E |

### Config File Locations (loaded in order)

1. `~/.mysay` - Simple format
2. `~/.config/mysay/config` - XDG format
3. `./.env.local` - Project-specific

### Config Variables

```bash
# Required
ELEVENLABS_API_KEY="sk_..."

# Optional - Override voice IDs
VOICE_DONE="voice-id"
VOICE_QUESTION="voice-id"
VOICE_START="voice-id"
VOICE_ERROR="voice-id"
VOICE_IDEA="voice-id"
VOICE_HI="voice-id"
VOICE_HEBREW="voice-id"
VOICE_ENGLISH="voice-id"

# Optional - Model
MODEL_ID="eleven_v3"  # Default

# Optional - Google Sheets logging
MYSAY_SHEET_ID="spreadsheet-id"
MYSAY_SA_FILE="path/to/service-account.json"
```

### Dependencies

| Component | Dependency | Required |
|-----------|------------|----------|
| mysay | curl, bash | Yes |
| Audio (macOS) | afplay | Yes (built-in) |
| Audio (Linux) | mpv or aplay | Yes |
| emoji-overlay | Node.js 18+, Electron | Optional |
| Google Sheets | Python 3, gspread | Optional |

---

## Future Phases

### Phase 2: Audio Storage (R2)
- Save audio files to Cloudflare R2
- Add audio URL to Google Sheets
- Re-listen for quality evaluation

### Phase 3: Agent Onboarding
- First-time personality questions
- Save preferences to DEVELOPER_PROFILE.md
- Profile travels across projects

See `AGENT_ONBOARDING.md` for full spec.

---

## Testing Checklist

- [x] Fresh install works
- [x] ElevenLabs TTS plays audio
- [x] All 6 voice personalities work
- [x] Hebrew with nikud pronounces correctly
- [x] English works with --en
- [x] Emoji overlay displays
- [x] Config file is read correctly
- [ ] Google Sheets logging (optional)
- [ ] Linux audio playback

---

## Files Migrated From speakit

The following were moved from `/Users/zyahav/Documents/dev/speakit/`:

- `bin/mysay` → Updated and enhanced
- `bin/emoji-pop` → New wrapper script
- `emoji-overlay/` → Electron app

Original speakit project still has its own copy (can be removed if desired).

---

## Contact

For questions or contributions, open an issue on GitHub.
