// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { GlobalStyle } from './styles/GlobalStyle.ts';
import { CensoProvider } from './context/CensoContext.tsx'; // Importe o CensoProvider

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStyle />
    <CensoProvider> 
      <App />
    </CensoProvider>
  </React.StrictMode>,
);