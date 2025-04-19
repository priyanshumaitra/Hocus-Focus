
const blockingStatus = document.getElementById('blockingStatus');
const blockingStatusText = document.getElementById('blockingStatusText');
const focusStatus = document.getElementById('focusStatus');
const focusStatusText = document.getElementById('focusStatusText');
const toggleBlockingBtn = document.getElementById('toggleBlocking');
const openAppBtn = document.getElementById('openApp');
const blockedSitesContainer = document.getElementById('blockedSites');

// Get current state from background script
chrome.runtime.sendMessage({ type: 'GET_STATE' }, (response) => {
  updateUI(response);
});


toggleBlockingBtn.addEventListener('click', () => {
  chrome.runtime.sendMessage({ type: 'GET_STATE' }, (response) => {
    const newState = !response.isBlockingActive;
    chrome.runtime.sendMessage({
      type: 'UPDATE_BLOCKING_STATUS',
      isActive: newState
    });
    
    updateBlockingUI(newState);
  });
});

// Open the main app
openAppBtn.addEventListener('click', () => {
  chrome.tabs.create({ url: 'http://localhost:5173/eye-tracking' });
});

// Update UI based on state
function updateUI(state) {
  updateBlockingUI(state.isBlockingActive);
  updateFocusUI(state.isFocused);
  updateBlockedSitesList(state.defaultBlockedSites, state.customBlockedSites);
}

// Update blocking status UI
function updateBlockingUI(isActive) {
  if (isActive) {
    blockingStatus.classList.remove('inactive');
    blockingStatus.classList.add('active');
    blockingStatusText.textContent = 'Blocking Active';
    toggleBlockingBtn.textContent = 'Disable Blocking';
    toggleBlockingBtn.classList.add('danger');
  } else {
    blockingStatus.classList.remove('active');
    blockingStatus.classList.add('inactive');
    blockingStatusText.textContent = 'Blocking Inactive';
    toggleBlockingBtn.textContent = 'Enable Blocking';
    toggleBlockingBtn.classList.remove('danger');
  }
}

// Update focus status UI
function updateFocusUI(isFocused) {
  if (isFocused) {
    focusStatus.classList.remove('inactive');
    focusStatus.classList.add('active');
    focusStatusText.textContent = 'Focused';
  } else {
    focusStatus.classList.remove('active');
    focusStatus.classList.add('inactive');
    focusStatusText.textContent = 'Not Focused';
  }
}

// Update blocked sites list
function updateBlockedSitesList(defaultSites, customSites) {
  blockedSitesContainer.innerHTML = '';
  
  // Add default sites
  defaultSites.forEach(site => {
    const siteElement = document.createElement('div');
    siteElement.className = 'site-item';
    siteElement.textContent = site + ' (default)';
    blockedSitesContainer.appendChild(siteElement);
  });
  
  // Add custom sites
  customSites.forEach(site => {
    const siteElement = document.createElement('div');
    siteElement.className = 'site-item';
    siteElement.textContent = site + ' (custom)';
    blockedSitesContainer.appendChild(siteElement);
  });
}

//keystroke component
function updateUI() {
  chrome.runtime.sendMessage(
    { type: 'GET_FOCUS_DATA' },
    (data) => {
      const score = data.focusScore || 100;

      document.getElementById('focus-bar').style.width = `${score}%`;
      document.getElementById('score-text').textContent = `${Math.round(score)}%`;

      // Change color based on score
      const bar = document.getElementById('focus-bar');
      if (score > 70) bar.style.background = '#4CAF50';
      else if (score > 40) bar.style.background = '#FFC107';
      else bar.style.background = '#F44336';

      // 🔔 Alert if focus drops too low
      if (score < 20) {
        const alertBox = document.getElementById('focus-alert');
        if (alertBox) {
          alertBox.style.display = 'block';
          alertBox.textContent = '⚠️ Focus level critically low!';
        }
      } else {
        const alertBox = document.getElementById('focus-alert');
        if (alertBox) alertBox.style.display = 'none';
      }
    }
  );
}

// Update every second
setInterval(updateUI, 1000);
updateUI(); // Initial update