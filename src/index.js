import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const employees = [
  {
    id: 1,
    name: 'John Doe',
    age: 32,
  },
  {
    id: 2,
    name: 'Jane Doe',
    age: 30,
  },
  {
    id: 3,
    name: 'Jack Doe',
    age: 25,
  },
  {
    id: 4,
    name: 'Jill Doe',
    age: 27,
  },
  {
    id: 5,
    name: 'Joe Doe',
    age: 28,
  },
  {
    id: 6,
    name: 'Jill Doe',
    age: 27,
  },
  {
    id: 7,
    name: 'Joe Doe',
    age: 28,
  },
  {
    id: 8,
    name: 'Jill Doe',
    age: 27,
  },
  {
    id: 9,
    name: 'Joe Doe',
    age: 28,
  },
  {
    id: 10,
    name: 'Jill Doe',
    age: 27,
  },
  {
    id: 11,
    name: 'Joe Doe',
    age: 28,
  },
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App employees={employees} />
  </React.StrictMode>,
);
