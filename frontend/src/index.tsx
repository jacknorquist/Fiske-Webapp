import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const rootElement = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(rootElement);

root.render(
  <App />
);