#!/bin/bash
# mysay-chatbot.sh
# A continuous voice chatbot using mysay + Telegram

echo "🤖 Starting Voice Chatbot..."
echo "Press Ctrl+C to stop."

# Initial greeting
NEXT_MSG="Hello! I am your voice assistant. Ask me anything."

while true; do
  # 1. Speak and wait for reply
  echo "🗣️  Speaking: $NEXT_MSG"
  
  # Capture the output of mysay
  RAW_OUTPUT=$(mysay --done "$NEXT_MSG" --wait)
  
  # Extract just the reply text (remove "Waiting..." logs)
  USER_REPLY=$(echo "$RAW_OUTPUT" | grep "💬 Reply:" | sed 's/💬 Reply: //')
  
  echo "📩 You said: $USER_REPLY"
  
  # 2. Decide on response (Simple Logic)
  case "$(echo "$USER_REPLY" | tr '[:upper:]' '[:lower:]')" in
    *time*)
      NEXT_MSG="The current time is $(date +%H:%M)."
      ;;
    *date*)
      NEXT_MSG="Today is $(date +%A,\ %B\ %d)."
      ;;
    *name*)
      NEXT_MSG="My name is mysay."
      ;;
    *bye*|*exit*|*stop*)
      mysay --hi "Goodbye! Have a nice day."
      exit 0
      ;;
    *)
      NEXT_MSG="I heard you say: $USER_REPLY. Ask me about the time or date."
      ;;
  esac
  
  # Loop continues...
done
