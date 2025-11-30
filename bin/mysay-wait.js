#!/usr/bin/env node
/**
 * mysay-wait.js
 * Polls Telegram for a reply from the user.
 * Usage: node mysay-wait.js <TOKEN> <CHAT_ID>
 */

const https = require('https');

const token = process.argv[2];
const chatId = process.argv[3];

if (!token || !chatId) {
  console.error("Error: Missing Telegram token or chat ID");
  process.exit(1);
}

const POLL_INTERVAL = 2000; // 2 seconds
let lastUpdateId = 0;
let startTime = Date.now() / 1000; // Ignore old messages

console.log("⏳ Waiting for reply on Telegram...");

function getUpdates() {
  const url = `https://api.telegram.org/bot${token}/getUpdates?offset=${lastUpdateId + 1}&timeout=10`;

  https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
      try {
        const response = JSON.parse(data);
        if (response.ok && response.result.length > 0) {
          processUpdates(response.result);
        }
        // Poll again immediately if successful (long polling) or wait if empty
        setTimeout(getUpdates, response.result?.length ? 0 : POLL_INTERVAL);
      } catch (e) {
        // Ignore errors and retry
        setTimeout(getUpdates, POLL_INTERVAL);
      }
    });
  }).on('error', (e) => {
    setTimeout(getUpdates, POLL_INTERVAL);
  });
}

function processUpdates(updates) {
  for (const update of updates) {
    lastUpdateId = update.update_id;
    
    // Check if message is from our user and recent
    if (update.message && 
        update.message.chat.id.toString() === chatId && 
        update.message.date >= startTime) {
      
      const text = update.message.text;
      const voice = update.message.voice;

      if (text) {
        console.log(`\n💬 Reply: ${text}`);
        process.exit(0); // Exit successfully with the reply
      } else if (voice) {
        console.log(`\n🎤 Received voice message (transcription not supported yet)`);
        process.exit(0);
      }
    }
  }
}

// Start polling
getUpdates();
