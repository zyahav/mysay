#!/bin/bash
# agent-demo.sh
# Demonstrates a conversational loop using mysay + Telegram

echo "🤖 Starting Agent Demo..."

# 1. Ask question
echo "🗣️  Asking question..."
REPLY=$(mysay --question "I am ready. What should I do?" --wait | grep "💬 Reply:" | sed 's/💬 Reply: //')

echo "📩 Received: $REPLY"

# 2. Process reply
if [[ "$REPLY" == *"time"* ]]; then
  RESPONSE="The current time is $(date +%H:%M)"
elif [[ "$REPLY" == *"joke"* ]]; then
  RESPONSE="Why did the developer go broke? Because he used up all his cache."
else
  RESPONSE="I heard you say: $REPLY"
fi

# 3. Speak answer
echo "🗣️  Answering..."
mysay --done "$RESPONSE"

echo "✅ Demo complete"
