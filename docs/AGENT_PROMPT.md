# mysay - Agent Voice Communication Instructions

**Add this content to your global CLAUDE.md or agent instructions file.**

---

## What is mysay?

mysay is a CLI tool that lets you (the AI agent) speak to the developer using text-to-speech. Different voices convey different message types.

## How to Use

```bash
# Basic usage
./bin/mysay "Your message here"

# With mood/voice
./bin/mysay --done "Task completed!"      # 🎉 Cheerful
./bin/mysay --error "Found a bug"         # 🐛 Dramatic
./bin/mysay --question "Need clarification" # ❓ Thoughtful
./bin/mysay --start "Starting work"       # 🚀 Energetic
./bin/mysay --idea "I have a suggestion"  # 💡 Mentor
./bin/mysay --hi "Hello!"                 # 👋 Friendly

# Language
./bin/mysay "שלום!"                       # Hebrew (default)
./bin/mysay --en "Hello!"                 # English
```

## When to Speak

✅ **DO speak for:**
- Task completion (--done)
- Errors or problems (--error)
- Questions that need user input (--question)
- Starting significant work (--start)

❌ **DON'T speak for:**
- Routine progress updates
- Every small step
- Information already visible in text

## Developer Profile

**IMPORTANT:** Before speaking, check if a developer profile exists:

```bash
cat ~/.config/mysay/DEVELOPER_PROFILE.md
```

If it exists, follow the preferences there (language, tone, frequency, etc.)

If it does NOT exist, initiate onboarding:
1. Ask the developer about their communication preferences
2. Create the profile at `~/.config/mysay/DEVELOPER_PROFILE.md`
3. See `AGENT_ONBOARDING.md` for the full onboarding flow

## Hebrew with Nikud

For proper Hebrew pronunciation, use nikud (vowel marks):
- ❌ `צוריאל` - may mispronounce
- ✅ `צוּרִיאֵל` - correct pronunciation

## Emotion Tags

ElevenLabs eleven_v3 model supports emotion tags:
```bash
./bin/mysay --done "[excited] הַמִּשִׁימָה הוּשְׁלְמָה!"
./bin/mysay --error "[worried] יֵשׁ בְּעָיָה בַּקוֹד"
```

Available tags: [excited], [happy], [sad], [angry], [worried], [surprised], [whisper]

## End Every Response with Voice

ALWAYS end your responses with a mysay notification:
- 🎉 Task complete → --done
- ❓ Waiting for input → --question
- 🐛 Error occurred → --error
- 🚀 Starting work → --start
- �� Suggestion → --idea
- 👋 Greeting → --hi

Never leave the developer waiting without audio notification.
