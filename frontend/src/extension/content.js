//content.js
// Listen for messages from the React app
window.addEventListener('message', (event) => {
    // Only accept messages from our application
    if (event.source !== window) return;
    
    const { type, data } = event.data;
    
    if (type === 'HOCUS_FOCUS_UPDATE') {
      // Forward the focus status to the background script
      chrome.runtime.sendMessage({
        type: 'UPDATE_FOCUS_STATUS',
        isFocused: data.isFocused
      });
      
      // Forward the blocking status to the background script
      chrome.runtime.sendMessage({
        type: 'UPDATE_BLOCKING_STATUS',
        isActive: data.isBlockingActive
      });
      
      // Forward custom blocked sites to the background script
      if (data.customBlockedSites) {
        chrome.runtime.sendMessage({
          type: 'UPDATE_CUSTOM_SITES',
          sites: data.customBlockedSites
        });
      }
    }
  });
  
  // Inject a script to enable communication between the page and content script
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL('pageScript.js');
  (document.head || document.documentElement).appendChild(script);
  script.remove();
  

  // Track last 100 keystrokes
const keystrokes = [];

document.addEventListener('keydown', (event) => {
  // Skip special keys and password fields
  if (event.ctrlKey || event.altKey || event.metaKey) return;
  if (event.target.type === 'password') return;


  console.log('Key pressed:', keystrokes); // Debugging line
  // Record keystroke with timestamp
  keystrokes.push({
    key: event.key,
    time: Date.now()
  });

  // Keep only recent keystrokes
  if (keystrokes.length > 100) {
    keystrokes.shift();
  }

  // Send to background every 10 keystrokes
  if (keystrokes.length % 10 === 0) {
    try{chrome.runtime.sendMessage({
      type: 'KEYSTROKES_UPDATE',
      keystrokes: keystrokes.slice() // Send copy
    });
  }catch(e){console.log(e)}
  } // Debugging line
  
});