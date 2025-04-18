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