# mysay — Agent Quick Start

**Voice + Telegram communication with the developer.**

---

## Basic Commands

```bash
# Send voice + Telegram message
mysay "your message"

# Send and WAIT for developer's reply
mysay -w "your question"
```

---

## Moods (Voice + Emoji)

| Flag | Emoji | Use When |
|------|-------|----------|
| `--done` | 🎉 | Task completed |
| `--error` | 🐛 | Problem/bug found |
| `--question` | ❓ | Need input (use with `-w`) |
| `--start` | 🚀 | Starting work |
| `--idea` | 💡 | Suggestion |
| `--hi` | 👋 | Greeting |

---

## Examples

```bash
mysay --done "Finished the refactor"
mysay --question -w "Should I deploy to staging?"
mysay --error "Tests are failing"
mysay --start "Beginning code review"
mysay --hi "Good morning!"
```

---

## Two-Way Communication

```bash
# Ask and wait for reply
mysay --question -w "Continue with task 5?"
# Developer replies via Telegram
# You receive: "Yes, go ahead"
```

---

## Language

```bash
mysay "שלום!"              # Hebrew (default)
mysay --en "Hello!"        # English
```

---

## Config & Preferences

- **Config:** `~/.config/mysay/config`
- **Developer profile:** `~/.config/mysay/DEVELOPER_PROFILE.md`

**Always check the developer profile for communication preferences.**

---

## When to Speak

✅ **DO:** Task complete, errors, questions needing input, starting significant work

❌ **DON'T:** Routine progress, every small step, info already in text

---

See `docs/AGENT_PROMPT.md` for full details.
