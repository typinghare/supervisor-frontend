import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './components/app/App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import './index.css';

const container = document.getElementById('root')!;
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);


let domain;
domain = 'jameschan.us';
// domain = "localhost:3000";

axios.defaults.baseURL = `//${domain}/api`;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(space-console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
