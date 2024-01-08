import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraBaseProvider, extendBaseTheme, theme as chakraTheme } from '@chakra-ui/react';

import './index.css';

import { App } from './App/App';
// import { OverallPanel } from '../content/customizedContent/OverallPanel';

const { Button } = chakraTheme.components;

const theme = extendBaseTheme({
  components: {
    Button,
  },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <ChakraBaseProvider theme={theme}>
    <React.StrictMode>
      <App />

      {/* <OverallPanel /> */}
    </React.StrictMode>
  </ChakraBaseProvider>
);
