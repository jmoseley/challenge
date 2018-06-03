import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, IndexRoute, Route, Router } from 'react-router';
import { routerReducer, syncHistoryWithStore } from 'react-router-redux';
import { combineReducers, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { combineInteractions } from 'redux-interactions';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

registerServiceWorker();

import Home from './scenes/home';
import Profile from './scenes/profile';

const store = createStore(
  combineReducers({
    ...combineInteractions({
      // Eventually we'll have some interactions.
    }),
    form: formReducer,
    routing: routerReducer,
  }),
);

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/">
        <IndexRoute component={Home} />
        <Route path="profile" component={Profile} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app'),
);
