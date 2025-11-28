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
  echo "⚠️  IMPORTANT: Edit your config file to add your ElevenLabs API key:"
  echo "   nano $CONFIG_DIR/config"
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
echo "Next steps:"
echo "  1. Add your ElevenLabs API key to ~/.config/mysay/config"
echo "  2. Test: mysay --hi \"שלום!\""
echo ""
echo "For help: mysay --help"
