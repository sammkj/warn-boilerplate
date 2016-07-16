import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import App from './components/App';

const initialState = (window && window.__INITIAL_STATE__) ? window.__INITIAL_STATE__ : {};
const store = configureStore(initialState);

if ((window && window.__INITIAL_STATE__)) {
  delete window.__INITIAL_STATE__;
}

const history = syncHistoryWithStore(browserHistory, store);

const MOUNT_NODE = document.getElementById('app');
ReactDOM.render(
  <AppContainer>
    <App
      store={store}
      history={history}
    />
  </AppContainer>,
  MOUNT_NODE
);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default;
    ReactDOM.render(
      <AppContainer>
        <NextApp
          store={store}
          history={history}
        />
      </AppContainer>,
      MOUNT_NODE
    );
  });
}
