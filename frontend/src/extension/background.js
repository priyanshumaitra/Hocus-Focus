// Default blocked sites
let defaultBlockedSites = [
    "facebook.com",
    "x.com",
    "instagram.com",
    "youtube.com",
    "reddit.com",
    "netflix.com",
  ];
  
  // State variables
  let isBlockingActive = false;
  let isFocused = false;
  let customBlockedSites = [];
  
  // Load custom blocked sites from storage
  chrome.storage.local.get(['customBlockedSites'], function(result) {
    if (result.customBlockedSites) {
      customBlockedSites = result.customBlockedSites;
    }
  });
  
  // Listen for messages from content script or popup
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'UPDATE_FOCUS_STATUS') {
      isFocused = message.isFocused;
      updateBlockingStatus();
    } else if (message.type === 'UPDATE_BLOCKING_STATUS') {
      isBlockingActive = message.isActive;
      updateBlockingStatus();
    } else if (message.type === 'UPDATE_CUSTOM_SITES') {
      customBlockedSites = message.sites;
      chrome.storage.local.set({ customBlockedSites });
    } else if (message.type === 'GET_STATE') {
      sendResponse({
        isBlockingActive,
        isFocused,
        defaultBlockedSites,
        customBlockedSites
      });
      return true;
    }
  });
  
  // Update the icon based on the current state
  function updateIcon() {
    const iconPath = isBlockingActive && isFocused 
      ? 'icons/icon_active.png' 
      : 'icons/icon_inactive.png';
    
    chrome.action.setIcon({ path: iconPath });
  }
  
  // Check if a URL is in the blocked list
  function isBlockedUrl(url) {
    try {
      const hostname = new URL(url).hostname;
      const allBlockedSites = [...defaultBlockedSites, ...customBlockedSites];
      
      return allBlockedSites.some(site => 
        hostname === site || 
        hostname.endsWith('.' + site)
      );
    } catch (e) {
      return false;
    }
  }
  
  // Update the blocking status and check current tabs
  function updateBlockingStatus() {
    updateIcon();
    
    if (isBlockingActive && isFocused) {
      // Check all open tabs
      chrome.tabs.query({}, (tabs) => {
        tabs.forEach(tab => {
          if (isBlockedUrl(tab.url)) {
            chrome.tabs.update(tab.id, { url: chrome.runtime.getURL('blocked.html') });
          }
        });
      });
    }
  }
  
  // Listen for tab updates
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (isBlockingActive && isFocused && changeInfo.url && isBlockedUrl(changeInfo.url)) {
      chrome.tabs.update(tabId, { url: chrome.runtime.getURL('blocked.html') });
    }
  });
  
  // Listen for tab creation
  chrome.tabs.onCreated.addListener((tab) => {
    if (isBlockingActive && isFocused && tab.url && isBlockedUrl(tab.url)) {
      chrome.tabs.update(tab.id, { url: chrome.runtime.getURL('blocked.html') });
    }
  });
  

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