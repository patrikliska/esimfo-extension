import { Button } from '@chakra-ui/react';

import { getCurrentTab } from '../../helpers/tabs';

import './App.css';

const handleActionClick = (action: string) => {
  chrome.tabs.query({ active: true, currentWindow: true }, async () => {
    var activeTab = await getCurrentTab();

    if (activeTab.id == null) return;

    chrome.tabs.sendMessage(activeTab.id, { action });
  });
};

export const App = () => {
  return (
    <div className='App'>
      <h1>Nečum</h1>
      <Button id='attackButton' onClick={() => handleActionClick('attackAll')}>
        ATTACK
      </Button>
      <Button id='resetLayoutButton' onClick={() => handleActionClick('resetLayout')}>
        Reset layout
      </Button>
    </div>
  );
};
