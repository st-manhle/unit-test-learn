import React from 'react';
import { createRoot } from 'react-dom/client';
import createSagaMiddleware from 'redux-saga';
import appMiddleware from './app.middleware';
import App from './App';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import appReducer from './app.reducers';
import logger from 'redux-logger';
import { BrowserRouter } from 'react-router-dom';

const middleware = createSagaMiddleware();
const store = createStore(
  appReducer,
  applyMiddleware(middleware, logger)
);

middleware.run(appMiddleware);

const root = createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
