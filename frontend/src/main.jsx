// src/index.js
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; 
import store from './features/store.js'; 
import App from './App.jsx';
import './index.css';
import { CssBaseline } from '@mui/material';

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <CssBaseline /> 
    <Provider store={store}> 
      <App />
    </Provider>
  </StrictMode>,
);
