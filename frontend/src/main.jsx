import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

window.onerror = function(message, source, lineno, colno, error) {
  document.body.innerHTML = `<div style="padding: 20px; background: red; color: white; position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 9999; white-space: pre-wrap;"><h1>Global Error Caught</h1><p>${message}</p><p>${error?.stack}</p></div>`;
};

window.addEventListener('unhandledrejection', function(event) {
  document.body.innerHTML = `<div style="padding: 20px; background: red; color: white; position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 9999; white-space: pre-wrap;"><h1>Unhandled Promise Rejection</h1><p>${event.reason}</p><p>${event.reason?.stack}</p></div>`;
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
