# 🎙️ mysay

**Voice communication for AI agents** - Let your AI speak to you with different personalities and floating emoji reactions!

When AI agents work with developers, text responses can be missed. `mysay` uses ElevenLabs TTS to speak important updates aloud, with different voice personalities that instantly tell you what's happening.

## ✨ Features

- **6 Voice Personalities** - Different voices for different situations
- **Emoji Overlays** - Zoom-style floating reactions on your screen
- **Hebrew + English** - Full support for both languages with proper nikud
- **Emotion Tags** - `[excited]`, `[whispers]`, `[laughs]` and more
- **Agent-Ready** - Built for AI agents to communicate with developers

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/zuriel/mysay.git
cd mysay

# Install
./install.sh

# Add your ElevenLabs API key
nano ~/.config/mysay/config

# Test it!
mysay --hi "שלום!"
```

## 📖 Usage

```bash
# Basic usage (Hebrew by default)
mysay "שלום עולם!"

# With voice/mood selection
mysay --done "סיימתי את המשימה!"      # 🎉 Cheerful celebration
mysay --error "יש בעיה בקוד"           # 🐛 Dramatic alarm
mysay --question "האם להמשיך?"          # ❓ Thoughtful inquiry
mysay --start "מתחיל לעבוד!"           # 🚀 Energetic kickoff
mysay --idea "יש לי רעיון!"             # 💡 Mentor suggestion
mysay --hi "היי!"                       # 👋 Friendly greeting

# English
mysay --en "Hello world!"

# Custom emoji override
mysay --emoji ❤️ "I love this project!"
mysay --done --emoji 🏆 "We won!"

# Disable emoji overlay
mysay --no-emoji "Silent notification"

# With emotion tags (ElevenLabs feature)
mysay --done "[excited] הַמִּשִׁימָה הוּשְׁלְמָה!"
mysay --error "[worried] יֵשׁ בְּעָיָה"
```

## 🎭 Voice Personalities

| Flag | Emoji | Voice | Use When |
|------|-------|-------|----------|
| `--done` | 🎉 | Cheerleader | Task completed successfully |
| `--error` | 🐛 | Dramatic | Something went wrong |
| `--question` | ❓ | Philosopher | Need user input |
| `--start` | 🚀 | Energetic | Starting new work |
| `--idea` | 💡 | Mentor | Have a suggestion |
| `--hi` | 👋 | Friendly | Greeting/goodbye |
| `--en` | 🇺🇸 | English | English language |
| (default) | 🇮🇱 | Hebrew | Hebrew language |


## 🎨 Emoji Overlay

When `mysay` speaks, matching emojis float up your screen like Zoom reactions:

```bash
# Standalone emoji-pop usage
emoji-pop 🔥 15 3     # 15 fire emojis over 3 seconds
emoji-pop ❤️          # 15 hearts (default)
emoji-pop 🎉 20 5     # 20 party emojis over 5 seconds
```

## ⚙️ Configuration

Config is loaded from (in order):
1. `~/.mysay`
2. `~/.config/mysay/config`
3. `./.env.local`

```bash
# ~/.config/mysay/config
ELEVENLABS_API_KEY="sk_your_key_here"

# Optional: Custom voice IDs
VOICE_DONE="your-voice-id"
VOICE_ERROR="your-voice-id"
# ... etc
```

## 🤖 For AI Agents

Add to your agent's system prompt (CLAUDE.md, etc.):

```markdown
## Voice Communication

Use mysay to speak to the developer:

- Task done: `mysay --done "סיימתי!"`
- Error: `mysay --error "יש בעיה"`
- Question: `mysay --question "האם להמשיך?"`

ALWAYS end significant work with a voice notification.
Check ~/.config/mysay/DEVELOPER_PROFILE.md for preferences.
```

See [docs/AGENT_PROMPT.md](docs/AGENT_PROMPT.md) for full agent instructions.

## 📁 Project Structure

```
mysay/
├── bin/
│   ├── mysay          # Main CLI script
│   └── emoji-pop      # Emoji overlay launcher
├── emoji-overlay/     # Electron app for floating emojis
├── docs/
│   ├── HANDOFF.md     # Development handoff document
│   ├── AGENT_PROMPT.md    # Instructions for AI agents
│   └── AGENT_ONBOARDING.md # Agent onboarding flow
├── templates/
│   └── DEVELOPER_PROFILE.md # User preferences template
├── .mysay.example     # Config template
├── install.sh         # Installation script
└── README.md
```

## 🔧 Requirements

- **macOS** (Linux support planned)
- **Node.js 18+** (for emoji overlay)
- **ElevenLabs API key** (get one at [elevenlabs.io](https://elevenlabs.io))
- **curl** (usually pre-installed)

## 📄 License

MIT

## 🙏 Credits

Built by Zuriel for making AI agent communication more human.
