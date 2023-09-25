import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// eslint-disable-next-line no-extend-native
String.prototype.capitalize = function() {
  return this[0].toUpperCase() + this.substr(1, this.length);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
