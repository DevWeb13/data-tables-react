import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const employees = [];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App employees={employees} />
  </React.StrictMode>,
);
