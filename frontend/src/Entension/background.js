// Store typing data
let typingData = {
  lastUpdate: Date.now(),
  keystrokes: [],
  focusScore: 100
};

// Analyze typing patterns
function analyzeTyping(keystrokes) {
  if (keystrokes.length < 15) return 100; // Not enough data

  const first = keystrokes[0].time;
  const last = keystrokes[keystrokes.length - 1].time;
  const minutes = (last - first) / 60000;
  const kpm = keystrokes.length / minutes;

  // --- 1. Typing Speed Score ---
  let speedScore = 0;
  if (kpm > 180) speedScore = 90;
  else if (kpm > 100) speedScore = 70;
  else if (kpm > 50) speedScore = 40;
  else speedScore = 20;

  // --- 2. Typing Consistency (standard deviation of intervals) ---
  const intervals = [];
  for (let i = 1; i < keystrokes.length; i++) {
    intervals.push(keystrokes[i].time - keystrokes[i - 1].time);
  }
  const avg = intervals.reduce((a, b) => a + b, 0) / intervals.length;
  const variance = intervals.reduce((sum, x) => sum + Math.pow(x - avg, 2), 0) / intervals.length;
  const stddev = Math.sqrt(variance);
  let consistencyScore = stddev < 500 ? 10 : stddev < 1000 ? 5 : 0;

  // --- 3. Backspace Penalty ---
  const backspaceCount = keystrokes.filter(k => k.key === 'Backspace').length;
  const backspacePenalty = Math.min(10, backspaceCount * 0.5); // up to -10

  // --- 4. Idle Penalty ---
  const longPauses = intervals.filter(interval => interval > 10000).length; // >10s
  const idlePenalty = longPauses * 5; // up to -15 or so

  // Final focus score calculation
  let finalScore = speedScore + consistencyScore - backspacePenalty - idlePenalty;
  finalScore = Math.max(0, Math.min(100, finalScore)); // clamp to [0, 100]

  return finalScore;
}


// Handle messages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'KEYSTROKES_UPDATE') {
    typingData.keystrokes = message.keystrokes;
    typingData.focusScore = analyzeTyping(message.keystrokes);
    typingData.lastUpdate = Date.now();
  }
  
  if (message.type === 'GET_FOCUS_DATA') {
    sendResponse(typingData);
  }
});