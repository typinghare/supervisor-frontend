import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './layouts/app/App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import axios from 'axios';

const container = document.getElementById('root')!;
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);

export const domain = 'jameschan.us';

axios.defaults.baseURL = `http://${domain}:3000`;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
