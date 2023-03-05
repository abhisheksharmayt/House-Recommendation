import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { AppProvider } from './context/context';
import { PlotProvider } from './context/plotContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProvider>
      <PlotProvider>
        <App />
      </PlotProvider>
    </AppProvider>
  </React.StrictMode>
);
