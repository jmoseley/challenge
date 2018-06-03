import { createBrowserHistory } from 'history';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import {
  ConnectedRouter,
  routerMiddleware,
  routerReducer,
} from 'react-router-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { combineInteractions } from 'redux-interactions';

import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Home from './scenes/home';
import Profile from './scenes/profile';

registerServiceWorker();

const history = createBrowserHistory();
const middleware = routerMiddleware(history);

const store = createStore(
  combineReducers({
    ...combineInteractions({
      // Eventually we'll have some interactions.
    }),
    form: formReducer,
    routing: routerReducer,
  }),
  applyMiddleware(middleware),
);

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
