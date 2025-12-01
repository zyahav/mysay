#!/bin/bash
# mysay Installation Script
# Installs mysay CLI and emoji-overlay to your system

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INSTALL_DIR="/usr/local/bin"
CONFIG_DIR="$HOME/.config/mysay"

echo "🎙️  mysay Installer"
echo "==================="
echo ""

# Check for Node.js (required for emoji-overlay)
if ! command -v node &>/dev/null; then
  echo "⚠️  Node.js not found. Emoji overlay requires Node.js."
  echo "   Install from: https://nodejs.org/"
  echo "   Continuing without emoji support..."
  SKIP_EMOJI=true
fi

# Install emoji-overlay dependencies
if [ "$SKIP_EMOJI" != "true" ]; then
  echo "📦 Installing emoji-overlay dependencies..."
  cd "$SCRIPT_DIR/emoji-overlay"
  npm install --silent
  echo "✅ emoji-overlay installed"
fi

# Create config directory
echo "📁 Creating config directory at $CONFIG_DIR..."
mkdir -p "$CONFIG_DIR"

# Copy config template if not exists
if [ ! -f "$HOME/.mysay" ] && [ ! -f "$CONFIG_DIR/config" ]; then
  echo "📝 Creating config template..."
  cp "$SCRIPT_DIR/.mysay.example" "$CONFIG_DIR/config"
  echo ""
  echo "⚠️  IMPORTANT: Edit your config file to add your API keys:"
  echo "   nano $CONFIG_DIR/config"
  echo ""
fi

# Create developer profile if not exists
if [ ! -f "$CONFIG_DIR/DEVELOPER_PROFILE.md" ]; then
  echo "👤 Creating developer profile template..."
  cp "$SCRIPT_DIR/templates/DEVELOPER_PROFILE.md" "$CONFIG_DIR/DEVELOPER_PROFILE.md"
  echo "   Edit your preferences at: $CONFIG_DIR/DEVELOPER_PROFILE.md"
  echo ""
fi

# Create symlink to mysay
echo "🔗 Installing mysay to $INSTALL_DIR..."
if [ -w "$INSTALL_DIR" ]; then
  ln -sf "$SCRIPT_DIR/bin/mysay" "$INSTALL_DIR/mysay"
  ln -sf "$SCRIPT_DIR/bin/emoji-pop" "$INSTALL_DIR/emoji-pop"
else
  echo "   Need sudo to write to $INSTALL_DIR"
  sudo ln -sf "$SCRIPT_DIR/bin/mysay" "$INSTALL_DIR/mysay"
  sudo ln -sf "$SCRIPT_DIR/bin/emoji-pop" "$INSTALL_DIR/emoji-pop"
fi

echo ""
echo "✅ Installation complete!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "NEXT STEPS:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. Add your API keys:"
echo "   nano $CONFIG_DIR/config"
echo ""
echo "   Required:"
echo "     ELEVENLABS_API_KEY=\"your-key\""
echo ""
echo "   Optional (for Telegram):"
echo "     TELEGRAM_BOT_TOKEN=\"your-bot-token\""
echo "     TELEGRAM_CHAT_ID=\"your-chat-id\""
echo ""
echo "2. Set your preferences (for AI agents):"
echo "   nano $CONFIG_DIR/DEVELOPER_PROFILE.md"
echo ""
echo "3. Test it:"
echo "   mysay --hi \"Hello!\""
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "FOR AI AGENTS: Read AGENT.md for quick start"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
