window.updateHocusFocusState = function(isFocused, isBlockingActive, customBlockedSites) {
  window.postMessage({
    type: 'HOCUS_FOCUS_UPDATE',
    data: { isFocused, isBlockingActive, customBlockedSites }
  }, '*');
};
