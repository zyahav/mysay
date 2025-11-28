#!/usr/bin/env node
/**
 * emoji-overlay - Floating emoji screen overlay
 * Creates a transparent, click-through window with animated emojis floating up
 * Like Zoom reactions but triggered from CLI
 * 
 * Usage: npx electron . [emoji] [count] [duration]
 */

const { app, BrowserWindow, screen } = require('electron');

// Parse CLI arguments
const args = process.argv.slice(2);
const emoji = args[0] || "❤️";
const count = parseInt(args[1]) || 15;
const duration = parseFloat(args[2]) || 3;

// Fix transparency issues on Mac
app.disableHardwareAcceleration();
app.commandLine.appendSwitch('disable-gpu');

// Hide from dock (don't interrupt focus)
if (app.dock) app.dock.hide();

app.whenReady().then(() => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  const win = new BrowserWindow({
    width: width,
    height: height,
    x: 0,
    y: 0,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    hasShadow: false,
    skipTaskbar: true,
    focusable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // Click-through - doesn't block your work
  win.setIgnoreMouseEvents(true);
  win.setVisibleOnAllWorkspaces(true);


  // Generate the HTML animation
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; padding: 0; }
    body { 
      overflow: hidden; 
      background: transparent; 
      width: 100vw;
      height: 100vh;
    }
    .emoji {
      position: absolute;
      bottom: -100px;
      font-size: 60px;
      opacity: 0;
      animation: floatUp ${duration}s ease-out forwards;
      filter: drop-shadow(0 0 10px rgba(255,255,255,0.3));
      z-index: 9999;
    }
    @keyframes floatUp {
      0% { 
        transform: translateY(0) scale(0.5) rotate(0deg); 
        opacity: 0; 
      }
      15% { 
        opacity: 1; 
      }
      85% {
        opacity: 0.8;
      }
      100% { 
        transform: translateY(-${height + 150}px) scale(1.2) rotate(20deg); 
        opacity: 0; 
      }
    }
  </style>
</head>
<body>
  <script>
    const emojiChar = "${emoji}";
    const totalEmojis = ${count};
    
    for(let i = 0; i < totalEmojis; i++) {
      setTimeout(() => {
        const el = document.createElement('div');
        el.innerText = emojiChar;
        el.className = 'emoji';
        el.style.left = (5 + Math.random() * 90) + 'vw';
        el.style.animationDuration = (${duration} - 0.5 + Math.random()) + 's';
        el.style.fontSize = (50 + Math.random() * 40) + 'px';
        document.body.appendChild(el);
      }, i * 120);
    }
    
    // Auto-close after animation
    setTimeout(() => window.close(), ${(duration + 1) * 1000});
  </script>
</body>
</html>`;

  win.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(htmlContent));
  
  win.on('closed', () => app.quit());
});

app.on('window-all-closed', () => app.quit());
