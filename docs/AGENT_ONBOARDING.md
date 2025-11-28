# Agent Onboarding System

## Overview

When an AI agent first starts working with a developer, it should discover the developer's communication preferences through a brief conversation. These preferences are saved to a profile that persists across ALL projects.

---

## The Flow

### First Time (Profile doesn't exist)

1. Agent checks for `~/.config/mysay/DEVELOPER_PROFILE.md`
2. File not found → Agent initiates onboarding conversation
3. Agent asks discovery questions (see below)
4. Agent creates the profile based on answers
5. Agent confirms by speaking with the preferred voice

### Subsequent Times (Profile exists)

1. Agent reads `~/.config/mysay/DEVELOPER_PROFILE.md`
2. Agent uses preferences for all communications
3. No onboarding needed

---

## Discovery Questions

The agent should ask these questions naturally in conversation:

### Voice Preferences
- "Do you prefer a playful or professional tone when I speak to you?"
- "Should I speak in Hebrew, English, or mix both?"
- "Do you want frequent voice updates or only for important things?"

### Communication Style
- "How should I address you? (Name, nickname, formal)"
- "Do you prefer brief notifications or detailed explanations?"
- "Should I use emoji overlays on screen?"

### Timing
- "Are there hours I should NOT speak? (Late night, meetings)"
- "Should I batch notifications or send immediately?"

---

## Profile Format

After onboarding, create `~/.config/mysay/DEVELOPER_PROFILE.md`:

```markdown
# Developer Profile for mysay

**Created:** 2025-11-28
**Last Updated:** 2025-11-28

## Basic Info
- **Name:** Zuriel
- **Preferred Address:** צוּרִיאֵל (with nikud)
- **Primary Language:** Hebrew
- **Secondary Language:** English

## Voice Preferences
- **Tone:** Playful, warm, encouraging
- **Frequency:** Speak for task completion, errors, and questions. Silent for routine progress.
- **Volume:** Normal

## Communication Style
- **Brevity:** Keep it short, 1-2 sentences max
- **Emoji Overlays:** Yes, enabled
- **Technical Level:** High (can use dev jargon)

## Personality Notes
- Likes celebration when tasks complete
- Prefers Hebrew with proper nikud pronunciation
- Appreciates humor but not during errors
- Works late - no time restrictions

## Custom Voice Mappings (if different from defaults)
- Done: Cheerleader voice
- Error: Dramatic voice
- Question: Philosophical voice
```

---

## Integration with AGENT_PROMPT.md

The `AGENT_PROMPT.md` file tells agents HOW to use mysay and check for the profile. Developers add this content to their global agent instructions (CLAUDE.md, etc.).

---

## Implementation Notes

1. **Profile location:** `~/.config/mysay/DEVELOPER_PROFILE.md`
2. **Profile is global:** Not per-project
3. **Agent can update profile:** If preferences change, agent updates the file
4. **Profile is human-readable:** Developer can edit it manually too
