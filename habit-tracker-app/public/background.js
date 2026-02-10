// This is the background script for the Habitlio Chrome Extension.
// It can be used to listen for events, manage state, or perform tasks that need to run in the background.

console.log("Habitlio background script loaded.");
// Open up side panel when extension icon is clicked
chrome.action.onClicked.addListener((tab) => {
  if (!tab?.id) return;
  chrome.sidePanel.open({ tabId: tab.id });
});