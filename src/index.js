import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'antd/es/modal/style';
import 'antd/es/slider/style';
import '@availity/block-ui/dist/index.css';
import 'react-toastify/dist/ReactToastify.min.css';
import './css/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
