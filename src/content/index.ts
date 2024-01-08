// content components
import './customizedContent';

// functions
import { attackAll } from './attackAll';
import { FIGHT_OVERALLPANEL_DEFAULT_POSITION, FIGHT_OVERALLPANEL_STORAGE_KEY } from './customizedContent/OverallPanel';

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'attackAll') attackAll();

  if (request.action === 'resetLayout') {
    localStorage.setItem(FIGHT_OVERALLPANEL_STORAGE_KEY, JSON.stringify(FIGHT_OVERALLPANEL_DEFAULT_POSITION));

    window.location.reload();
  }
});

export {};
