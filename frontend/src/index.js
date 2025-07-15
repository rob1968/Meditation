
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Assuming you have an index.css for global styles
import App from './App'; // Import the App component from App.jsx
import './i18n'; // Import i18n configuration

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
