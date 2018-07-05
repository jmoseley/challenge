import { createBrowserHistory } from 'history';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import './index.css';
import createStore from './lib/create_store';
// Configure firebase.
import './lib/firebase';
import registerServiceWorker from './registerServiceWorker';
import Home from './scenes/home';
import Profile from './scenes/profile';

registerServiceWorker();

const history = createBrowserHistory();

const store = createStore(history);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact={true} path="/" component={Home} />
        <Route path="/profile" component={Profile} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
